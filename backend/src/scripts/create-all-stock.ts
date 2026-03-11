// @ts-nocheck
import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'
import { 
  createInventoryItemsWorkflow,
  createInventoryLevelsWorkflow, 
  updateInventoryLevelsWorkflow 
} from '@medusajs/medusa/core-flows'

export default async function updateAllStock({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const productService = container.resolve(Modules.PRODUCT)
  const inventoryService = container.resolve(Modules.INVENTORY)
  const stockLocationService = container.resolve(Modules.STOCK_LOCATION)

  logger.info('Fetching all variants...')
  const variants = await productService.listProductVariants({}, { select: ['id', 'product_id'] })
  logger.info(`Found ${variants.length} variants.`)

  // Get first stock location to use for inventory levels
  const stockLocations = await stockLocationService.listStockLocations({}, { select: ['id'] })
  if (stockLocations.length === 0) {
    logger.warn('No stock locations found, cannot add inventory levels.')
    return
  }
  const stockLocationId = stockLocations[0].id
  logger.info(`Using stock location: ${stockLocationId}`)

  // For each variant, ensure an inventory item exists. Wait, in v2, variants are linked via link module.
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  
  // Actually, we can just use the provided remote query to see the links.
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  
  const { data } = await query.graph({
    entity: 'variant',
    fields: ['id', 'inventory_items.*', 'inventory_items.inventory_item_id'],
  })

  // Track inventory items to set level to 100
  const inventoryItemsToSet = []

  for (const variant of data) {
    let inventoryItemId = variant.inventory_items?.[0]?.inventory_item_id
    
    if (!inventoryItemId) {
      // Create inventory item
      logger.info(`Creating inventory item for variant ${variant.id}`)
      const { result } = await createInventoryItemsWorkflow(container).run({
        input: {
          items: [
            {
              sku: variant.sku || `sku-${variant.id}`, // sku is required sometimes, or fallback
              requires_shipping: true,
            }
          ]
        }
      })
      
      inventoryItemId = result[0].id
      
      // Link variant and inventory item
      await link.create({
        [Modules.PRODUCT]: { variant_id: variant.id },
        [Modules.INVENTORY]: { inventory_item_id: inventoryItemId }
      })
      logger.info(`Linked variant ${variant.id} to inventory item ${inventoryItemId}`)
    }
    
    inventoryItemsToSet.push(inventoryItemId)
  }

  // Now ensure each inventory item has a level
  logger.info('Updating inventory levels...')
  
  const existingLevels = await inventoryService.listInventoryLevels(
    { inventory_item_id: inventoryItemsToSet },
    { select: ['id', 'inventory_item_id', 'location_id', 'stocked_quantity'] }
  )

  const itemsWithLevels = new Set(existingLevels.map((l: any) => l.inventory_item_id))

  const levelsToCreate = []
  const levelsToUpdate = []

  for (const itemId of inventoryItemsToSet) {
    if (itemsWithLevels.has(itemId)) {
      const level = existingLevels.find((l: any) => l.inventory_item_id === itemId)
      levelsToUpdate.push({
        inventory_item_id: level.inventory_item_id,
        location_id: level.location_id,
        stocked_quantity: 100
      })
    } else {
      levelsToCreate.push({
        inventory_item_id: itemId,
        location_id: stockLocationId,
        stocked_quantity: 100
      })
    }
  }

  if (levelsToCreate.length > 0) {
    logger.info(`Creating ${levelsToCreate.length} new inventory levels...`)
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: levelsToCreate
      }
    })
  }

  if (levelsToUpdate.length > 0) {
    logger.info(`Updating ${levelsToUpdate.length} existing inventory levels to 100...`)
    await updateInventoryLevelsWorkflow(container).run({
      input: {
        updates: levelsToUpdate
      }
    })
  }

  logger.info('Done setting all stocks to 100.')
}

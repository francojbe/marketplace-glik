// @ts-nocheck
import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'
import { 
  createInventoryItemsWorkflow,
  createInventoryLevelsWorkflow, 
  updateInventoryLevelsWorkflow,
  updateProductsWorkflow
} from '@medusajs/medusa/core-flows'

export default async function forceStockEverything({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const productService = container.resolve(Modules.PRODUCT)
  const inventoryService = container.resolve(Modules.INVENTORY)
  const stockLocationService = container.resolve(Modules.STOCK_LOCATION)
  const salesChannelService = container.resolve(Modules.SALES_CHANNEL)

  logger.info('--- 1. Making sure ALL Stock Locations are linked to ALL Sales Channels ---')
  const channels = await salesChannelService.listSalesChannels()
  const stockLocations = await stockLocationService.listStockLocations({}, { select: ['id'] })
  
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  
  for (const sc of channels) {
    for (const loc of stockLocations) {
      try {
        await link.create({
          [Modules.SALES_CHANNEL]: { sales_channel_id: sc.id },
          [Modules.STOCK_LOCATION]: { stock_location_id: loc.id }
        })
        logger.info(`Linked SC ${sc.id} to Location ${loc.id}`)
      } catch (e) {
        // likely already linked
      }
    }
  }

  logger.info('--- 2. Fetching all variants and forcing manage_inventory = true ---')
  const variants = await productService.listProductVariants({}, { select: ['id', 'manage_inventory', 'product_id'] })
  
  const updates = variants.filter(v => !v.manage_inventory).map(v => ({
    id: v.product_id,
    variants: [{
      id: v.id,
      manage_inventory: true,
      allow_backorder: true
    }]
  }))

  if (updates.length > 0) {
    logger.info(`Updating ${updates.length} products to set variants manage_inventory=true`)
    // Because updateProductsWorkflow expects Product updates, we can do it via the service if workflow fails
    try {
      await updateProductsWorkflow(container).run({ input: { products: updates } })
    } catch(e) {
      logger.error('Failed workflow, falling back to service update')
      const prodSvc = container.resolve(Modules.PRODUCT)
      for (const v of variants) {
        await prodSvc.updateProductVariants(v.id, { manage_inventory: true, allow_backorder: true })
      }
    }
  } else {
    // Force allow_backorder: true just in case
    for(const v of variants) {
      await productService.updateProductVariants(v.id, { allow_backorder: true, manage_inventory: true })
    }
  }

  logger.info('--- 3. Ensuring every variant has an inventory item ---')
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const { data } = await query.graph({
    entity: 'variant',
    fields: ['id', 'inventory_items.*', 'inventory_items.inventory_item_id'],
  })

  const inventoryItemsToSet = []

  for (const variant of data) {
    let inventoryItemId = variant.inventory_items?.[0]?.inventory_item_id
    if (!inventoryItemId) {
      const { result } = await createInventoryItemsWorkflow(container).run({
        input: { items: [{ requires_shipping: true }] }
      })
      inventoryItemId = result[0].id
      await link.create({
        [Modules.PRODUCT]: { variant_id: variant.id },
        [Modules.INVENTORY]: { inventory_item_id: inventoryItemId }
      })
    }
    inventoryItemsToSet.push(inventoryItemId)
  }

  logger.info('--- 4. Setting stock level to 999 for ALL items in ALL locations ---')
  const existingLevels = await inventoryService.listInventoryLevels(
    { inventory_item_id: inventoryItemsToSet },
    { select: ['id', 'inventory_item_id', 'location_id', 'stocked_quantity'] }
  )

  const levelsToCreate = []
  const levelsToUpdate = []

  for (const itemId of inventoryItemsToSet) {
    for (const loc of stockLocations) {
      const level = existingLevels.find((l: any) => l.inventory_item_id === itemId && l.location_id === loc.id)
      if (level) {
        levelsToUpdate.push({
          inventory_item_id: level.inventory_item_id,
          location_id: level.location_id,
          stocked_quantity: 999
        })
      } else {
        levelsToCreate.push({
          inventory_item_id: itemId,
          location_id: loc.id,
          stocked_quantity: 999
        })
      }
    }
  }

  if (levelsToCreate.length > 0) {
    logger.info(`Creating ${levelsToCreate.length} levels...`)
    await createInventoryLevelsWorkflow(container).run({ input: { inventory_levels: levelsToCreate } })
  }
  if (levelsToUpdate.length > 0) {
    logger.info(`Updating ${levelsToUpdate.length} levels to 999...`)
    await updateInventoryLevelsWorkflow(container).run({ input: { updates: levelsToUpdate } })
  }

  logger.info('--- DONE: Everything has 999 stock! ---')
}

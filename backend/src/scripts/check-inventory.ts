// @ts-nocheck
import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

export default async function checkInventory({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const inventoryService = container.resolve(Modules.INVENTORY)
  const stockLocationService = container.resolve(Modules.STOCK_LOCATION)

  const items = await inventoryService.listInventoryItems({}, { relations: ['location_levels'] })
  const locations = await stockLocationService.listStockLocations()
  
  logger.info(`Found ${items.length} inventory items and ${locations.length} stock locations.`)

  for (const loc of locations) {
    logger.info(`Location: ${loc.id} - ${loc.name}`)
  }

  for (const item of items) {
    logger.info(`Item: ${item.id} (SKU: ${item.sku})`)
    for (const level of item.location_levels || ([] as any[])) {
      logger.info(`  Location: ${level.location_id} | Stock: ${level.stocked_quantity} | Available: ${level.available_quantity}`)
    }
  }

  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  
  const { data } = await query.graph({
    entity: 'variant',
    fields: ['id', 'title', 'inventory_items.*', 'inventory_items.inventory_item_id', 'manage_inventory'],
  })

  logger.info(`Checking variant links:`)
  for (const v of data) {
    logger.info(`Variant ${v.title} (${v.id}) -> Manage: ${v.manage_inventory} -> Items: ${JSON.stringify(v.inventory_items)}`)
  }
}

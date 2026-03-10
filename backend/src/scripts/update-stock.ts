import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'
import { updateInventoryLevelsWorkflow } from '@medusajs/medusa/core-flows'

export default async function updateStock({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const inventoryService = container.resolve(Modules.INVENTORY)

  logger.info('Updating stock levels for all inventory items...')

  // Fetch all inventory items
  const items = await inventoryService.listInventoryItems(
    {},
    { select: ['id'] }
  )

  logger.info(`Found ${items.length} inventory items.`)

  // For each item, find its inventory level to get the location_id
  const levels = await inventoryService.listInventoryLevels(
    {},
    { select: ['id', 'inventory_item_id', 'location_id', 'stocked_quantity'] }
  )

  logger.info(`Found ${levels.length} inventory levels.`)

  const toUpdate = levels.map((l: any) => ({
    inventory_item_id: l.inventory_item_id,
    location_id: l.location_id,
    stocked_quantity: 100 // Set stock to 100
  }))

  if (toUpdate.length > 0) {
    const { result } = await updateInventoryLevelsWorkflow(container).run({
      input: {
        updates: toUpdate
      }
    })
    logger.info(`Successfully updated ${toUpdate.length} inventory levels.`)
  } else {
    logger.info('No inventory levels to update.')
  }
}

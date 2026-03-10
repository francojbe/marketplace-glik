import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

export default async function getRegionsWithQ({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  
  const { data: regions } = await query.graph({
    entity: 'region',
    fields: ['id', 'name', 'countries.*'],
  })

  logger.info(`Found ${regions.length} regions.`)
  for (const r of regions) {
    logger.info(`Region: ${r.name} (${r.id}) - Countries: ${(r.countries || []).map((c: any) => c.iso_2).join(', ')}`)
  }
}

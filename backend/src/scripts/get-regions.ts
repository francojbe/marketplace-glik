import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

export default async function getRegions({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const regionService = container.resolve(Modules.REGION)
  const regions = await regionService.listRegions()
  
  if (regions.length > 0) {
    for (const r of regions) {
      logger.info(`Region: ${r.name} (${r.id}) - Countries: ${r.countries?.map((c: any) => c.iso_2).join(', ')}`)
    }
  } else {
    logger.info('No regions found.')
  }
}

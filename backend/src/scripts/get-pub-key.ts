import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

export default async function getPublishableKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const apiKeyService = container.resolve(Modules.API_KEY)
  const keys = await apiKeyService.listApiKeys({ type: 'publishable' })
  
  if (keys.length > 0) {
    logger.info(`Publishable Key found: ${keys[0].token}`)
  } else {
    logger.info('No publishable keys found.')
  }
}

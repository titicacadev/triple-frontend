import { IncomingMessage } from 'http'

import { generateUserAgentValues } from '..'

import { getSessionIdFromRequest } from './app'
import { getWebSessionAvailabilityFromRequest } from './browser'

export default function getSessionAvailabilityFromRequest(
  req: IncomingMessage | undefined,
) {
  const { isPublic } = generateUserAgentValues(req?.headers['user-agent'] || '')

  if (isPublic === true) {
    return getWebSessionAvailabilityFromRequest(req)
  }

  return !!getSessionIdFromRequest(req)
}

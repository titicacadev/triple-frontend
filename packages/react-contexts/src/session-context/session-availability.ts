import { IncomingMessage } from 'http'

import { parseNativeClientUserAgent } from '@titicaca/react-client-interfaces'

import { getSessionIdFromRequest } from './app'
import { getWebSessionAvailabilityFromRequest } from './browser'

export default function getSessionAvailabilityFromRequest(
  req: IncomingMessage | undefined,
) {
  const app = parseNativeClientUserAgent(req?.headers['user-agent'] || '')

  if (!app) {
    return getWebSessionAvailabilityFromRequest(req)
  }

  return !!getSessionIdFromRequest(req)
}

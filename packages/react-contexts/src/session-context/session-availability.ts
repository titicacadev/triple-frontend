import { IncomingMessage } from 'http'

import { parseApp } from '..'

import { getSessionIdFromRequest } from './app'
import { getWebSessionAvailabilityFromRequest } from './browser'

export default function getSessionAvailabilityFromRequest(
  req: IncomingMessage | undefined,
) {
  const app = parseApp(req?.headers['user-agent'] || '')

  if (!app) {
    return getWebSessionAvailabilityFromRequest(req)
  }

  return !!getSessionIdFromRequest(req)
}

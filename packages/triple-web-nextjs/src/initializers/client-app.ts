import 'server-only'

import { headers } from 'next/headers'
import {
  getClientApp as extractClientApp,
  type ClientAppValue,
} from '@titicaca/triple-web'

export function getClientApp(): ClientAppValue {
  const headersList = headers()

  const userAgent = headersList.get('user-agent') ?? ''

  const autoplay =
    (headersList.get('x-triple-autoplay') as
      | NonNullable<ClientAppValue>['device']['autoplay']
      | null) || undefined
  const networkType =
    (headersList.get('x-triple-network-type') as
      | NonNullable<ClientAppValue>['device']['networkType']
      | null) || undefined

  return extractClientApp({ userAgent, autoplay, networkType })
}

import 'server-only'

import { headers } from 'next/headers'
import { ClientAppValue } from '@titicaca/triple-web'
import { parseClientAppMetadata } from '@titicaca/triple-web-utils'

export function getClientApp(): ClientAppValue {
  const headersList = headers()

  const userAgent = headersList.get('user-agent') ?? ''
  const metadata = parseClientAppMetadata(userAgent)

  if (!metadata) {
    return null
  }

  const autoplay =
    (headersList.get('x-triple-autoplay') as
      | NonNullable<ClientAppValue>['device']['autoplay']
      | null) ?? 'always'
  const networkType =
    (headersList.get('x-triple-network-type') as
      | NonNullable<ClientAppValue>['device']['networkType']
      | null) ?? 'unknown'

  return {
    metadata,
    device: {
      autoplay,
      networkType,
    },
  }
}

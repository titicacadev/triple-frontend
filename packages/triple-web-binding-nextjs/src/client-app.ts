import 'server-only'

import { headers } from 'next/headers'
import { ClientApp, parseClientAppMetadata } from '@titicaca/triple-web'

export function getClientApp(): ClientApp {
  const headersList = headers()

  const userAgent = headersList.get('user-agent') ?? ''
  const metadata = parseClientAppMetadata(userAgent)

  if (!metadata) {
    return null
  }

  const autoplay =
    (headersList.get('x-triple-autoplay') as
      | NonNullable<ClientApp>['device']['autoplay']
      | null) ?? 'always'
  const networkType =
    (headersList.get('x-triple-network-type') as
      | NonNullable<ClientApp>['device']['networkType']
      | null) ?? 'unknown'

  return {
    metadata,
    device: {
      autoplay,
      networkType,
    },
  }
}

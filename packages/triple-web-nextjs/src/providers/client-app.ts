import 'server-only'

import { headers } from 'next/headers'
import { ClientAppName, ClientAppValue } from '@titicaca/triple-web'
import { clientAppRegex } from '@titicaca/triple-web-utils'

export function getClientApp(): ClientAppValue {
  const headersList = headers()

  const userAgent = headersList.get('user-agent') ?? ''
  const metadata = clientAppRegex.exec(userAgent)

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
    metadata: {
      name: (metadata[1] as keyof typeof ClientAppName)
        ? ClientAppName.Android
        : ClientAppName.iOS,
      version: metadata[2],
    },
    device: {
      autoplay,
      networkType,
    },
  }
}

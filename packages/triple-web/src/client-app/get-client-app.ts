import { clientAppRegex, macAppRegex } from '@titicaca/triple-web-utils'

import { ClientAppName, ClientAppValue } from '../client-app'

export function getClientApp({
  userAgent,
  autoplay,
  networkType,
}: {
  userAgent: string | undefined
  autoplay: NonNullable<ClientAppValue>['device']['autoplay'] | undefined
  networkType: NonNullable<ClientAppValue>['device']['networkType'] | undefined
}): ClientAppValue {
  const metadata = userAgent ? clientAppRegex.exec(userAgent) : null

  if (!metadata) {
    return null
  }

  return {
    metadata: {
      name:
        metadata[1] === 'Triple-Android'
          ? ClientAppName.Android
          : ClientAppName.iOS,
      version: metadata[2],
      isMacApp: userAgent ? macAppRegex.test(userAgent) : false,
    },
    device: {
      autoplay: autoplay || 'always',
      networkType: networkType || 'unknown',
    },
  }
}

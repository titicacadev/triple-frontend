import { ClientAppName, type ClientAppValue } from '@titicaca/triple-web'

import { clientAppRegex } from './regex'

export function parseClientAppMetadata(
  userAgent: string,
): NonNullable<ClientAppValue>['metadata'] | null {
  const matchData = clientAppRegex.exec(userAgent)

  if (!matchData) {
    return null
  }

  return {
    name:
      (matchData[1] as keyof typeof ClientAppName) === 'Android'
        ? ClientAppName.Android
        : ClientAppName.iOS,
    version: matchData[2],
  }
}

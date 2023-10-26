import { ClientApp, ClientAppName } from '../contexts'

export function parseClientAppMetadata(
  userAgent: string,
): NonNullable<ClientApp>['metadata'] | null {
  const matchData = userAgent.match(/Triple-(iOS|Android)\/([^ ]+)/i)

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

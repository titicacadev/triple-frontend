import * as WebToNativeInterfaces from '@titicaca/triple-web-to-native-interfaces'
import * as semver from 'semver'

import { useClientApp } from './use-client-app'

const KNOWN_INITIAL_VERSIONS: Partial<
  Record<keyof typeof WebToNativeInterfaces, string>
> = {
  subscribeTripUpdateEvent: '5.11.0',
  unsubscribeTripUpdateEvent: '5.11.0',
}

export function useClientAppActions() {
  const clientApp = useClientApp()

  if (!clientApp) {
    return {}
  }

  const { version } = clientApp.metadata
  const versionSemver = semver.coerce(version)

  const filteredAccessibleWebToNativeInterfaces = Object.keys(
    WebToNativeInterfaces,
  ).reduce<Partial<typeof WebToNativeInterfaces>>(
    (accessibleWebToNativeInterfaces, interfaceName) => {
      const interfaceNameKey =
        interfaceName as keyof typeof WebToNativeInterfaces
      const interfaceValue = WebToNativeInterfaces[interfaceNameKey]

      if (typeof interfaceValue !== 'function') {
        /* We ignore non-function exports to expose invocable actions only */
        return accessibleWebToNativeInterfaces
      }

      if (
        KNOWN_INITIAL_VERSIONS[interfaceNameKey] &&
        !semver.gte(
          versionSemver as semver.SemVer,
          KNOWN_INITIAL_VERSIONS[interfaceNameKey] as string,
        )
      ) {
        /* Ignore the interface as current client does not support it */
        return accessibleWebToNativeInterfaces
      }

      return {
        ...accessibleWebToNativeInterfaces,
        [interfaceName]: interfaceValue as (...args: unknown[]) => unknown,
      }
    },
    {},
  )

  return filteredAccessibleWebToNativeInterfaces
}

import * as WebToNativeInterfaces from '@titicaca/triple-web-to-native-interfaces'
import * as semver from 'semver'

import { useTripleClientMetadata } from './triple-client-metadata-context'

const KNOWN_INITIAL_VERSIONS: Partial<
  Record<keyof typeof WebToNativeInterfaces, string>
> = {
  subscribeTripUpdateEvent: '5.11.0',
  unsubscribeTripUpdateEvent: '5.11.0',
}

export function useTripleClientActions() {
  const clientContextValue = useTripleClientMetadata()

  if (!clientContextValue) {
    return {}
  }

  const { appVersion } = clientContextValue
  const appVersionSemver = semver.coerce(appVersion)

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
          appVersionSemver as semver.SemVer,
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

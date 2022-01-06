import * as WebToNativeInterfaces from '@titicaca/triple-web-to-native-interfaces'
import * as semver from 'semver'

import { useClientContext } from './client-context'

const KNOWN_INITIAL_VERSIONS: Partial<
  Record<keyof typeof WebToNativeInterfaces, string>
> = {
  subscribeTripUpdateEvent: '5.11.0',
  unsubscribeTripUpdateEvent: '5.11.0',
}

export function useClientActions() {
  const clientContextValue = useClientContext()

  if (!clientContextValue) {
    return {}
  }

  const { appVersion } = clientContextValue
  const appVersionSemver = semver.coerce(appVersion)

  if (!appVersionSemver) {
    /* The page is not being rendered on Triple iOS/Android */
    return {}
  }

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
          appVersionSemver,
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

import { useEnv } from '@titicaca/react-contexts'
import { makeDeepLinkGenerator } from '@titicaca/view-utilities'
import { useMemo } from 'react'

export function useDeeplinkGenerator() {
  const {
    appUrlScheme,
    webUrlBase,
    afOnelinkSubdomain,
    afOnelinkPid,
    afOnelinkId,
  } = useEnv()

  const deeplinkGenerator = useMemo(
    () =>
      makeDeepLinkGenerator({
        oneLinkParams: {
          id: afOnelinkId,
          pid: afOnelinkPid,
          subdomain: afOnelinkSubdomain,
        },
        appScheme: appUrlScheme,
        webURLBase: webUrlBase,
      }),
    [afOnelinkId, afOnelinkPid, afOnelinkSubdomain, appUrlScheme, webUrlBase],
  )

  return deeplinkGenerator
}

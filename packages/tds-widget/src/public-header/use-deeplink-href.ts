import { useMemo } from 'react'
import { useEnv, useUtm } from '@titicaca/triple-web'
import {
  injectIsSearchAd,
  injectUTMContext,
  makeDeepLinkGenerator,
} from '@titicaca/view-utilities'

export function useDeeplinkHref(path: string) {
  const {
    appUrlScheme,
    webUrlBase,
    afOnelinkSubdomain,
    afOnelinkPid,
    afOnelinkId,
  } = useEnv()
  const utmContext = useUtm()

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

  return deeplinkGenerator({
    ...injectIsSearchAd(utmContext),
    ...injectUTMContext(utmContext),
    path,
  })
}

import { useMemo } from 'react'
import { useEnv, useUtmContext } from '@titicaca/react-contexts'
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
  const utmContext = useUtmContext()

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

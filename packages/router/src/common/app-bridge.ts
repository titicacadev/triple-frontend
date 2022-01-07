import { useEnv } from '@titicaca/react-contexts'
import { generateUrl, parseUrl } from '@titicaca/view-utilities'
import qs from 'qs'
import { useMemo } from 'react'

import {
  AppSpecificLinkProps,
  useTripleAppRoutingOptionsAdder,
} from './app-specific-link-options'

export interface OutlinkOptions {
  target?: 'browser'
  title?: string
}

export function useAppBridge({
  changeLocation = defaultChangeLocation,
}: {
  changeLocation?: (href: string) => void
} = {}) {
  const { appUrlScheme } = useEnv()
  const addAppSpecificLinkOptions = useTripleAppRoutingOptionsAdder()

  return useMemo(
    () => ({
      openInlink(path: string, options?: AppSpecificLinkProps) {
        changeLocation(
          generateUrl({
            scheme: appUrlScheme,
            path: '/inlink',
            query: qs.stringify({
              path: addAppSpecificLinkOptions({
                href: path,
                ...options,
              }),
            }),
          }),
        )
      },

      openOutlink(url: string, params?: OutlinkOptions) {
        changeLocation(
          generateUrl({
            scheme: appUrlScheme,
            path: '/outlink',
            query: qs.stringify({
              url,
              ...params,
            }),
          }),
        )
      },

      openNativeLink: (rawHref: string) => {
        const { scheme, host, ...rest } = parseUrl(rawHref)

        if (!!scheme || !!host) {
          throw new Error('네이티브 라우팅은 상대 경로만 가능합니다.')
        }

        changeLocation(generateUrl({ scheme: appUrlScheme, ...rest }))
      },
    }),
    [addAppSpecificLinkOptions, appUrlScheme, changeLocation],
  )
}

function defaultChangeLocation(href: string) {
  window.location.href = href
}

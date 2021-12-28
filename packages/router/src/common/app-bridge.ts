import { useEnv } from '@titicaca/react-contexts'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'
import { useMemo } from 'react'

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

  return useMemo(
    () => ({
      openInlink(path: string) {
        changeLocation(
          generateUrl({
            scheme: appUrlScheme,
            path: '/inlink',
            query: qs.stringify({
              path,
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
    }),
    [appUrlScheme, changeLocation],
  )
}

function defaultChangeLocation(href: string) {
  window.location.href = href
}

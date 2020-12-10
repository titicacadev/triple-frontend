import { useEnv } from '@titicaca/react-contexts'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'
import { useMemo } from 'react'

export function useAppBridge() {
  const { appUrlScheme } = useEnv()

  return useMemo(
    () => ({
      openInlink(path: string) {
        window.location.href = generateUrl({
          scheme: appUrlScheme,
          path: '/inlink',
          query: qs.stringify({
            path,
          }),
        })
      },

      openOutlink(
        url: string,
        params?: { target?: 'browser'; title?: string },
      ) {
        window.location.href = generateUrl({
          scheme: appUrlScheme,
          path: '/outlink',
          query: qs.stringify({
            url,
            ...params,
          }),
        })
      },
    }),
    [appUrlScheme],
  )
}

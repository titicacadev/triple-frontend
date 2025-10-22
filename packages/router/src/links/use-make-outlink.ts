import { useCallback } from 'react'
import { useClientApp, useEnv } from '@titicaca/triple-web'
import { generateUrl } from '@titicaca/view-utilities'
import qs from 'qs'

export interface MakeOutlinkOptions {
  /**
   * - browser: 해당 url을 외부 브라우저로 엽니다.
   */
  target?: 'browser'
  /**
   * 브라우저 타이틀.
   */
  title?: string
}

export function useMakeOutlink() {
  const clientApp = useClientApp()
  const { appUrlScheme } = useEnv()

  const makeOutlink = useCallback(
    (
      /**
       * Outlink로 만들 absolute URL.
       */
      url: string,
      options?: MakeOutlinkOptions,
    ) => {
      if (!clientApp) {
        return url
      }

      return generateUrl({
        scheme: appUrlScheme,
        path: '/outlink',
        query: qs.stringify({
          url,
          target: options?.target,
          title: options?.title,
        }),
      })
    },
    [clientApp, appUrlScheme],
  )

  return makeOutlink
}

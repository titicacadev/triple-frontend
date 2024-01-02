import { useClientApp } from '@titicaca/triple-web/client-app'
import { useEnv } from '@titicaca/triple-web/env'

import { OutlinkParams, makeOutlink } from './make-outlink'

export type OpenOutlinkOptions = Omit<OutlinkParams, 'url'>

export function useOpenOutlink() {
  const clientApp = useClientApp()
  const { appUrlScheme } = useEnv()

  const openOutlink = (
    /**
     * Outlink로 만들 absolute URL.
     */
    url: string,
    options?: OpenOutlinkOptions,
  ) => {
    const href = clientApp
      ? makeOutlink(appUrlScheme, { url, ...options })
      : url
    window.location.href = href
  }

  return openOutlink
}

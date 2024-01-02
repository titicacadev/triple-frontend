import { useClientApp, useEnv } from '@titicaca/triple-web'

import { InlinkParams, makeInlink } from './make-inlink'

export type OpenInlinkOptions = Omit<InlinkParams, 'path'>

export function useOpenInlink() {
  const clientApp = useClientApp()
  const { appUrlScheme } = useEnv()

  const openInlink = (
    /**
     * Inlink로 만들 relative URL.
     */
    path: string,
    options?: OpenInlinkOptions,
  ) => {
    const href = clientApp
      ? makeInlink(appUrlScheme, { path, ...options })
      : path
    window.location.href = href
  }

  return openInlink
}

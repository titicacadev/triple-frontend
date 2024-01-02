import { useClientApp } from '@titicaca/triple-web/client-app'
import { useEnv } from '@titicaca/triple-web/env'
import { TransitionType, useTransitionModal } from '@titicaca/triple-web/modal'

export interface OpenNativeLinkOptions {
  /**
   * Transition modal 종류.
   */
  transitionType: TransitionType
}

export function useOpenNativeLink() {
  const app = useClientApp()
  const { appUrlScheme } = useEnv()
  const { show: showTransitionModal } = useTransitionModal()

  const openNativeLink = (
    /**
     * 딥링크 path.
     */
    path: string,
    options: OpenNativeLinkOptions = {
      transitionType: TransitionType.General,
    },
  ) => {
    if (!app) {
      return showTransitionModal(options.transitionType)
    }

    const href = (window.location.href = `${appUrlScheme}://${path}`)
    window.location.href = href
  }

  return openNativeLink
}

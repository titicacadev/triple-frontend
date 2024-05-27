import {
  useClientApp,
  useEnv,
  useAppInstallCtaModal,
} from '@titicaca/triple-web'

export function useOpenNativeLink() {
  const app = useClientApp()
  const { appUrlScheme } = useEnv()
  const { show: showAppInstallCtaModal } = useAppInstallCtaModal()

  const openNativeLink = (
    /**
     * 딥링크 path.
     */
    path: string,
  ) => {
    if (!app) {
      return showAppInstallCtaModal()
    }

    const href = (window.location.href = `${appUrlScheme}://${path}`)
    window.location.href = href
  }

  return openNativeLink
}

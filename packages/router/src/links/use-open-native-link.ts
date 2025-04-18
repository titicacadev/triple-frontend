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

    window.location.href = `${appUrlScheme}://${path}`
  }

  return openNativeLink
}

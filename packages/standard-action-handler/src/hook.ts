import { useNavigate, useExternalRouter } from '@titicaca/router'
import { useClientApp, useAppInstallCtaModal } from '@titicaca/triple-web'

import { initialize } from './initialize'

export function useStandardActionHandler() {
  const { navigate } = useNavigate()
  const routeExternally = useExternalRouter()
  const { show } = useAppInstallCtaModal()
  const app = useClientApp()

  return initialize({
    navigate,
    routeExternally,
    showAppInstallCtaModal: show,
    app,
  })
}

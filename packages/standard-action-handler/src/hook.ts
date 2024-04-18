import { useNavigate, useExternalRouter } from '@titicaca/router'
import { useClientApp, useTransitionModal } from '@titicaca/triple-web'

import { initialize } from './initialize'

export function useStandardActionHandler() {
  const { navigate } = useNavigate()
  const routeExternally = useExternalRouter()
  const { show } = useTransitionModal()
  const app = useClientApp()

  return initialize({
    navigate,
    routeExternally,
    showTransitionModal: show,
    app,
  })
}

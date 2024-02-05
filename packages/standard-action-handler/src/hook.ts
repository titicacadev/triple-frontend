import { useNavigate, useExternalRouter } from '@titicaca/router'
import { useTransitionModal } from '@titicaca/modals'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

import { initialize } from './index'

export function useStandardActionHandler() {
  const navigate = useNavigate()
  const routeExternally = useExternalRouter()
  const { show } = useTransitionModal()
  const app = useTripleClientMetadata()

  return initialize({
    navigate,
    routeExternally,
    showTransitionModal: show,
    app,
  })
}

import { useNavigate, useExternalRouter } from '@titicaca/router'
import { useTransitionModal } from '@titicaca/modals'

import { initialize } from './index'

export function useStandardActionHandler() {
  const navigate = useNavigate()
  const routeExternally = useExternalRouter()
  const { show } = useTransitionModal()

  return initialize({ navigate, routeExternally, showTransitionModal: show })
}

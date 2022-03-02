import { useNavigate, useExternalRouter } from '@titicaca/router'

import { initialize } from './index'

export function useWebAction() {
  const navigate = useNavigate()
  const routeExternally = useExternalRouter()

  return initialize({ navigate, routeExternally })
}

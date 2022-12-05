import { useNavigate, useExternalRouter } from '@titicaca/router'

import { initialize } from './index'

export function useStandardActionHandler() {
  const navigate = useNavigate()
  const routeExternally = useExternalRouter()

  return initialize({ navigate, routeExternally })
}

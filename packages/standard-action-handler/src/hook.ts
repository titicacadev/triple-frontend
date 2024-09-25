import { useNavigate, useExternalRouter } from '@titicaca/router'
import {
  useClientApp,
  useAppInstallCtaModal,
  useTranslation,
} from '@titicaca/triple-web'

import { initialize } from './initialize'
import { ContextOptions } from './types'

export function useStandardActionHandler(options?: ContextOptions) {
  const { navigate } = useNavigate()
  const routeExternally = useExternalRouter()
  const { show } = useAppInstallCtaModal()
  const app = useClientApp()
  const t = useTranslation()

  return initialize(t, {
    navigate,
    routeExternally,
    showAppInstallCtaModal: show,
    app,
    ...options,
  })
}

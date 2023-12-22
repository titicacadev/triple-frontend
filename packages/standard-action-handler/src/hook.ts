import { useNavigate, useOpenInlink, useOpenOutlink } from '@titicaca/router'
import { useClientApp } from '@titicaca/triple-web'

import { initialize } from './initialize'

interface Params {
  cta?: string
}

export function useStandardActionHandler(params?: Params) {
  const { navigate } = useNavigate()
  const openInlink = useOpenInlink()
  const openOutlink = useOpenOutlink()
  const app = useClientApp()

  return initialize({
    cta: params?.cta,
    navigate,
    openInlink,
    openOutlink,
    app,
  })
}

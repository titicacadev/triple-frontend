import { useNavigate, useTripleClientNavigate } from '@titicaca/router'
import { useClientApp } from '@titicaca/triple-web'

import { initialize } from './initialize'

interface Params {
  cta?: string
}

export function useStandardActionHandler(params?: Params) {
  const { navigate } = useNavigate()
  const { openInlink, openOutlink } = useTripleClientNavigate()
  const app = useClientApp()

  return initialize({
    cta: params?.cta,
    navigate,
    openInlink,
    openOutlink,
    app,
  })
}

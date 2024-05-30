import { useEffect, useLayoutEffect } from 'react'

import { FALLBACK_HANDLER_KEY } from './triple-fallback-action'

const useLayoutEffectSafeInSsr =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

function removeDisasterFallback() {
  if (typeof window === 'undefined') {
    return
  }

  const fallbackHandler = window[FALLBACK_HANDLER_KEY]

  if (!fallbackHandler) {
    return
  }

  document.body.removeEventListener('click', fallbackHandler)

  window[FALLBACK_HANDLER_KEY] = null
}

export function useTripleFallbackActionRemover() {
  useLayoutEffectSafeInSsr(() => {
    removeDisasterFallback()
  }, [])
}

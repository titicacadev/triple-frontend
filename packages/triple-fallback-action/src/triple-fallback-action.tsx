import { useEffect, useLayoutEffect } from 'react'

const FALLBACK_HANDLER_KEY = '__DISASTER_FALLBACK_HANDLER__'

declare global {
  interface Window {
    [FALLBACK_HANDLER_KEY]: ((e: MouseEvent) => void) | null
  }
}

export const TRIPLE_FALLBACK_ACTION_CLASS_NAME = '-triple-fallback-action'

export function TripleFallbackActionScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if (!window.${FALLBACK_HANDLER_KEY}) {
            window.${FALLBACK_HANDLER_KEY} = function (e) {
              if (e.target.className.indexOf('${TRIPLE_FALLBACK_ACTION_CLASS_NAME}') > -1) {
                try {
                  if (typeof Soto !== 'undefined' && Soto !== null) {
                    Soto.postMessage(JSON.stringify({ command: 'backOrClose' }))
                  } else if (typeof window !== 'undefined' &&
                    typeof window.webkit !== 'undefined' &&
                    window.webkit !== null &&
                    window.webkit.messageHandlers &&
                    window.webkit.messageHandlers.Soto) {

                    window.webkit.messageHandlers.Soto.postMessage({ command: 'backOrClose' })
                  } else {
                    history.back()
                  }
                } catch (e) {
                  /* do nothing */
                }
              }
            }

            document.body.addEventListener('click', window.${FALLBACK_HANDLER_KEY})
          }
        `,
      }}
    />
  )
}

const useLayoutEffectSafeInSsr =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

export function useTripleFallbackActionRemover() {
  useLayoutEffectSafeInSsr(() => {
    removeDisasterFallback()
  }, [])
}

export function TripleFallbackActionRemover() {
  useTripleFallbackActionRemover()

  return null
}

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

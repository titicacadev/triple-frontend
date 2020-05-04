import { useEffect } from 'react'
import scrollToElement from 'scroll-to-element'

export function useScrollToAnchor({
  anchor = window.location.hash,
  delay = 1500,
  offset = -52,
  align = 'top',
  ease = 'out-circ',
  duration = 1000,
}: {
  anchor?: string
  delay?: number
  offset?: number
  align?: 'top' | 'middle' | 'bottom'
  ease?: string
  duration?: number
}) {
  useEffect(() => {
    if (anchor) {
      setTimeout(() => {
        scrollToElement(anchor, {
          offset,
          align,
          ease,
          duration,
        })
      }, delay)
    }
  }, [anchor]) // eslint-disable-line react-hooks/exhaustive-deps
}

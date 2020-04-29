import { useEffect } from 'react'
import scrollToElement from 'scroll-to-element'

export function useScrollToAnchor(
  hash?: string,
  option?: {
    offset: number
    delayTime: number
  },
) {
  useEffect(() => {
    const anchor = hash || window.location.hash

    if (anchor) {
      const { offset = -52, delayTime = 1500 } = option || {} // HACK: 헤더 높이

      setTimeout(() => {
        scrollToElement(anchor, { offset })
      }, delayTime)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

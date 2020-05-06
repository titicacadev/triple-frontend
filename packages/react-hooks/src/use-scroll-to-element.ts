import { useEffect } from 'react'
import scrollToElement from 'scroll-to-element'

export function useScrollToElement(
  selector: string | HTMLElement | Element,
  option?: {
    delayTime: number
    offset: number
    duration?: number
    align?: 'top' | 'bottom' | 'middle'
  },
) {
  useEffect(() => {
    if (selector) {
      const {
        offset = -52, // HACK: 헤더 높이
        delayTime = 1500,
        duration,
        align,
      } = option || {}

      setTimeout(() => {
        scrollToElement(selector, { offset, duration, align })
      }, delayTime)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

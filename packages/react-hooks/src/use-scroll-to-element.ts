import { useEffect } from 'react'
import scrollToElement from 'scroll-to-element'

export function useScrollToElement(
  selector: string | HTMLElement | Element,
  option?: {
    delayTime: number
    offset: number
  },
) {
  useEffect(() => {
    if (selector) {
      const { offset = -52, delayTime = 1500 } = option || {}

      setTimeout(() => {
        scrollToElement(selector, { offset }) // HACK: 헤더 높이
      }, delayTime)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

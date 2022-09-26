import { useEffect } from 'react'
import scrollToElement from 'scroll-to-element'

export function useScrollToAnchor(option?: {
  offset?: number
  delayTime?: number
  duration?: number
  align?: 'top' | 'bottom' | 'middle'
  alias?: {
    [key: string]: string
  }
}) {
  useEffect(() => {
    const {
      offset = -52, // HACK: 헤더 높이
      delayTime = 1500,
      alias,
      duration,
      align,
    } = option || {}

    const replacedHash = window.location.hash
      ? window.location.hash.replace(/^#/, '')
      : ''

    const canonicalHash = (alias || {})[replacedHash] || replacedHash

    setTimeout(() => {
      const el = document.getElementById(canonicalHash)

      if (el) {
        scrollToElement(el, { offset, duration, align })
      }
    }, delayTime)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

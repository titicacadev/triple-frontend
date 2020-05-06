import { useEffect } from 'react'
import scrollToElement from 'scroll-to-element'

export function useScrollToAnchor(option?: {
  offset?: number
  delayTime?: number
  alias?: {
    [key: string]: string
  }
}) {
  useEffect(() => {
    const { offset = -52, delayTime = 1500, alias } = option || {} // HACK: 헤더 높이

    const replacedHash = window.location.hash
      ? window.location.hash.replace(/^#/, '')
      : ''

    const canonicalHash = (alias || {})[replacedHash] || replacedHash

    setTimeout(() => {
      const _el = document.getElementById(canonicalHash)

      if (_el) {
        scrollToElement(_el, { offset })
      }
    }, delayTime)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}

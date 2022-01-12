import { useMemo, useRef } from 'react'
import scrollToElement from 'scroll-to-element'

/**
 * 주어진 DOM 엘리먼트로 스크롤하는 함수를 제공하는 훅
 *
 * 현재 스크롤 되고 있는지를 반환하는 `isScrolling` 함수와 스크롤 함수를 반환합니다.
 */
export function useScrollToElement() {
  const scrollingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return useMemo(
    () => ({
      isScrolling: () => {
        return scrollingTimerRef.current !== null
      },
      scrollToElement: (
        el: Parameters<typeof scrollToElement>[0] | null,
        options?: Parameters<typeof scrollToElement>[1],
      ) => {
        if (!el) {
          return
        }
        const duration = options?.duration || 1000
        const prevScrollTimer = scrollingTimerRef.current

        if (prevScrollTimer) {
          clearTimeout(prevScrollTimer)
        }

        scrollingTimerRef.current = setTimeout(() => {
          scrollingTimerRef.current = null
        }, duration)
        scrollToElement(el, options)
      },
    }),
    [],
  )
}

import { useEffect, useRef, useState } from 'react'

import { useScroll as useBaseScroll, ScrollOptions } from '../scroll-context'

export function useScroll() {
  const { setScrollY, getScrollContainerHeight, scrollToBottom } =
    useBaseScroll()

  const [shouldScrollToBottom, setShouldScrollToBottom] =
    useState<boolean>(false)
  const scrollOptionsRef = useRef<ScrollOptions>({})

  /** pusher의 이벤트 핸들러에서 scrollToBottom을 호출할 경우 이벤트가 늦게 발생하여 state로 우회합니다. */
  useEffect(() => {
    const resetScrollOptions = () => {
      setShouldScrollToBottom(false)
      scrollOptionsRef.current = {}
    }

    if (shouldScrollToBottom) {
      scrollToBottom(scrollOptionsRef.current)
      resetScrollOptions()
    }
  }, [shouldScrollToBottom, scrollToBottom])

  return {
    setScrollY,
    getScrollContainerHeight,
    triggerScrollToBottom: (options?: ScrollOptions) => {
      setShouldScrollToBottom(true)
      scrollOptionsRef.current = options || {}
    },
  }
}

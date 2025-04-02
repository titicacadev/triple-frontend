import { useEffect, useState } from 'react'

import { useScroll as useBaseScroll } from '../scroll-context'

export function useScroll() {
  const { scrollY, setScrollY, getScrollContainerHeight, scrollToBottom } =
    useBaseScroll()

  const [shouldScrollToBottom, setShouldScrollToBottom] =
    useState<boolean>(false)

  /** pusher의 이벤트 핸들러에서 scrollToBottom을 호출할 경우 이벤트가 늦게 발생하여 state로 우회합니다. */
  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom()
      setShouldScrollToBottom(false)
    }
  }, [shouldScrollToBottom, scrollToBottom])

  return {
    scrollY,
    setScrollY,
    getScrollContainerHeight,
    triggerScrollToBottom: () => setShouldScrollToBottom(true),
  }
}

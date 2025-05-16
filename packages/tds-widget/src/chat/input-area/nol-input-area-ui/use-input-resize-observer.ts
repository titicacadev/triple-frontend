import { useState, useEffect, useRef } from 'react'

import { useScroll } from '../../chat'

export function useInputResizeObserver(defaultHeight: number) {
  const { setScrollBy, chatContainerRef } = useScroll()
  const inputContainerRef = useRef<HTMLDivElement | null>(null)

  const inputContainerHeightRef = useRef<number>(defaultHeight)
  const [inputContainerHeight, setInputContainerHeight] =
    useState<number>(defaultHeight)

  useEffect(() => {
    inputContainerHeightRef.current = inputContainerHeight
  }, [inputContainerHeight])

  useEffect(() => {
    const inputContainer = inputContainerRef?.current

    if (!inputContainer) {
      return
    }

    const observer = new ResizeObserver(() => {
      const diff = inputContainer.clientHeight - inputContainerHeightRef.current

      const chatContainer = chatContainerRef?.current

      if (
        diff > 0 ||
        !(
          chatContainer &&
          chatContainer.scrollTop + chatContainer.clientHeight ===
            chatContainer.scrollHeight
        )
      ) {
        setScrollBy(diff)
      }
      setInputContainerHeight(inputContainer.clientHeight)
    })

    observer.observe(inputContainer)

    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    inputContainerRef,
    inputContainerHeight,
  }
}

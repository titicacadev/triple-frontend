import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
  useContext,
} from 'react'

import { CHAT_CONTAINER_ID } from './chat'

export interface ScrollContextValue {
  scrollToBottom: () => void
  setScrollY: Dispatch<SetStateAction<number | null>>
  bottomRef: MutableRefObject<HTMLDivElement | null>
  chatRoomRef: MutableRefObject<HTMLDivElement | null>
}

export const ScrollContext = createContext<ScrollContextValue | null>(null)

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const chatRoomRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const [scrollY, setScrollY] = useState<number | null>(null)

  const scrollToBottom = () => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView()
    }
  }

  useLayoutEffect(() => {
    if (scrollY !== null && chatRoomRef.current?.parentElement) {
      const chatParentElement = chatRoomRef.current.parentElement
      const scrollTopPosition = getChatListHeight() - scrollY

      // scrollRestoration이 manual일 시, 46, 48라인의 방어코드가 처음 자리로 스크롤을 복귀시켜 적용 제외
      if (history.scrollRestoration && history.scrollRestoration === 'manual') {
        chatParentElement.scrollTo({ top: scrollTopPosition })
      } else {
        // iOS 스크롤 시 화면이 보이지 않는 현상을 위해 추가 ref: https://github.com/titicacadev/triple-geochat-web/pull/99
        chatParentElement.style.overflowY = 'hidden'
        chatParentElement.scrollTo({ top: scrollTopPosition })
        chatParentElement.style.overflowY = 'scroll'
      }
      window.scrollTo(0, scrollTopPosition)
    }
  }, [chatRoomRef, scrollY])

  const value = {
    scrollToBottom,
    setScrollY,
    bottomRef,
    chatRoomRef,
  }

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  )
}

export function useScrollContext() {
  const context = useContext(ScrollContext)

  if (!context) {
    throw new Error('Scroll context가 존재하지 않습니다.')
  }
  return context
}

export function getChatListHeight() {
  return (
    document.getElementById(CHAT_CONTAINER_ID)?.getBoundingClientRect()
      .height || 0
  )
}

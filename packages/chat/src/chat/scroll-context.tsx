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

export function ScrollProvider({ children }: { children: ReactNode }) {
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
      chatRoomRef.current.parentElement.style.overflowY = 'hidden'
      chatRoomRef.current.parentElement.scrollTo({
        top: getChatListHeight() - scrollY,
      })
      chatRoomRef.current.parentElement.style.overflowY = 'scroll'
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

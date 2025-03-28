import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useContext,
  ReactNode,
} from 'react'

import { DEFAULT_MESSAGE_ID_PREFIX } from './constants'

const useLayoutEffectSafeInSsr =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

export interface ScrollOptions {
  /** 최하단으로 이동하기 위해 페이지네이션 fetching이 필요할 경우 true로 설정해주세요. */
  shouldFetchRecentPage?: boolean
  /**
    메세지 스크롤 시 해당 메세지가 화면에 존재하지 않을 경우 실행하는 함수입니다.
    페이지네이션 등에 활용할 수 있습니다.
  */
  handleNonExistentMessage?: (messageId?: string | number) => void
  scrollBehavior?: ScrollBehavior
}

export interface ScrollContextValue {
  /** ChatScrollContainer의 최하단(bottomRef)으로 이동합니다. */
  scrollToBottom: (options?: ScrollOptions) => void
  /** 해당 message로 이동합니다. 사용하기 전, 메세지 노드에 messageIdPrefix를 넣은 id를 추가해야 합니다. */
  scrollToMessage: (messageId: string, options?: ScrollOptions) => void
  /** 절대적인 좌표로 스크롤합니다. 페이지네이션, 메세지 이동 등에 사용할 수 있습니다. */
  setScrollY: Dispatch<SetStateAction<number | null>>
  /** 상대적인 좌표로 스크롤합니다. input resize 이벤트, 키보드 이벤트 등에 사용할 수 있습니다. */
  setScrollBy: Dispatch<SetStateAction<number | null>>
  /** setScrollY, setScrollBy가 실행되지 않도록 설정했는지의 여부입니다. */
  scrollPrevented: boolean
  /** setScrollY, setScrollBy가 실행되지 않도록 설정할 수 있습니다. */
  preventScroll: () => void
  /** 스크롤을 하기위한 element ref입니다. ChatScrollContainer 컴포넌트에서 사용합니다.  */
  chatContainerRef: MutableRefObject<HTMLDivElement | null>
  /** 스크롤값을 계산하기 위한 ref입니다. ChatScrollContainer 컴포넌트에서 사용합니다.  */
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>
  /** 최하단으로 이동하기 위한 ref입니다. ChatScrollContainer 컴포넌트에서 사용합니다. */
  bottomRef: MutableRefObject<HTMLDivElement | null>
  /** scrollContainerRef가 걸린 element의 height를 반환합니다 */
  getScrollContainerHeight: () => number
}

export const ScrollContext = createContext<ScrollContextValue | null>(null)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const [scrollY, setScrollY] = useState<number | null>(null)
  const [scrollBy, setScrollBy] = useState<number | null>(null)
  const [scrollPrevented, setScrollPrevented] = useState<boolean>(false)

  const scrollToBottom = ({
    shouldFetchRecentPage,
    handleNonExistentMessage,
    scrollBehavior = 'smooth',
  }: ScrollOptions = {}) => {
    if (shouldFetchRecentPage) {
      return handleNonExistentMessage?.()
    }

    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: scrollBehavior })
    }
  }

  const scrollToMessage = (
    messageId: string,
    options: Pick<ScrollOptions, 'handleNonExistentMessage'> = {},
  ) => {
    const messageElement = document.getElementById(
      `${DEFAULT_MESSAGE_ID_PREFIX}-${messageId}`,
    )

    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth' })
    } else {
      options.handleNonExistentMessage?.(messageId)
    }
  }

  const getScrollContainerHeight = () => {
    return scrollContainerRef.current?.getBoundingClientRect().height || 0
  }

  const preventScroll = () => {
    setScrollPrevented(true)
  }

  useLayoutEffectSafeInSsr(() => {
    if (scrollY !== null && chatContainerRef.current && !scrollPrevented) {
      /* 
        iOS 스크롤 시 화면이 보이지 않는 현상을 위해 추가합니다.
        ref: https://github.com/titicacadev/triple-geochat-web/pull/99  
      */
      chatContainerRef.current.style.overflowY = 'hidden'
      chatContainerRef.current.scrollTo(0, getScrollContainerHeight() - scrollY)
      chatContainerRef.current.style.overflowY = 'scroll'
    }

    if (scrollPrevented) {
      setScrollPrevented(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatContainerRef, scrollY])

  useLayoutEffectSafeInSsr(() => {
    if (scrollBy !== null && chatContainerRef.current && !scrollPrevented) {
      chatContainerRef.current.scrollBy({ top: scrollBy })
      setScrollBy(null)
    }

    if (scrollPrevented) {
      setScrollPrevented(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatContainerRef, scrollBy])

  const value = {
    scrollToBottom,
    scrollToMessage,
    setScrollY,
    setScrollBy,
    scrollPrevented,
    preventScroll,
    chatContainerRef,
    scrollContainerRef,
    bottomRef,
    getScrollContainerHeight,
  }

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  )
}

export function useScroll() {
  const context = useContext(ScrollContext)

  if (!context) {
    throw new Error(
      'ChatScrollContainer 사용 시 컴포넌트 상위에 ScrollProvider를 등록해야 합니다',
    )
  }
  return context
}

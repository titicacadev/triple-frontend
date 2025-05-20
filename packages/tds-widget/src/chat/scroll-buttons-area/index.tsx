import {
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  ForwardedRef,
} from 'react'
import { Container } from '@titicaca/tds-ui'

import { ChatMessageInterface, UserType } from '../types'
import { useScroll } from '../chat/chat-room-messages/use-scroll'

import { ScrollButtons, type ScrollButtonsProps } from './scroll-buttons'

interface InspectionConfig {
  id?: number
  isIntersecting: boolean
}

interface ScrollButtonsAreaProps<T = UserType>
  extends Pick<ScrollButtonsProps<T>, 'scrollButtonsStyle'> {
  lastSeenMessageId?: number
  lastMessage?: ChatMessageInterface<T>
  clickActionDelay?: number
  resetKey?: string
}

export interface ScrollButtonsAreaHandler {
  onNewOthersMessage: () => void
  setBottomIntersecting: (data: InspectionConfig) => void
}

/**
 * nol-theme-provider를 사용하는 컴포넌트 입니다.
 */
function ScrollButtonsAreaImpl<T = UserType>(
  {
    resetKey,
    lastSeenMessageId,
    lastMessage,
    scrollButtonsStyle,
    clickActionDelay,
    children,
  }: PropsWithChildren<ScrollButtonsAreaProps<T>>,
  ref: ForwardedRef<ScrollButtonsAreaHandler>,
) {
  const [currentBottomIntersecting, setCurrentBottomIntersecting] =
    useState<InspectionConfig>({ id: lastSeenMessageId, isIntersecting: false })

  const prevBottomIntersecting = useRef<InspectionConfig>(
    currentBottomIntersecting,
  )

  const mounted = useRef(false)

  const { triggerScrollToBottom } = useScroll()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onButtonClick = (behavior: ScrollBehavior = 'smooth') => {
    triggerScrollToBottom({ scrollBehavior: behavior })
  }

  const handleClickScrollToBottom = (behavior?: ScrollBehavior) => {
    if (typeof clickActionDelay !== 'undefined') {
      setTimeout(() => {
        onButtonClick(behavior)
      }, clickActionDelay)
    } else {
      onButtonClick(behavior)
    }
  }

  useImperativeHandle(ref, () => {
    return {
      onNewOthersMessage() {
        if (prevBottomIntersecting.current.isIntersecting) {
          onButtonClick()
        }
      },
      setBottomIntersecting(data: InspectionConfig) {
        setCurrentBottomIntersecting(data)
        if (data.id === prevBottomIntersecting.current.id) {
          prevBottomIntersecting.current = data
        }
      },
    }
  }, [onButtonClick])

  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  useEffect(() => {
    if (lastSeenMessageId !== prevBottomIntersecting.current.id) {
      prevBottomIntersecting.current = currentBottomIntersecting
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSeenMessageId])

  const isNewMessageActive = !currentBottomIntersecting.id
    ? false
    : !(
        currentBottomIntersecting.isIntersecting ||
        !lastMessage ||
        !lastSeenMessageId ||
        Number(lastMessage.id) === Number(lastSeenMessageId)
      )

  return (
    <Container>
      {mounted.current && lastMessage !== undefined && (
        <ScrollButtons
          key={resetKey}
          scrollButtonsStyle={scrollButtonsStyle}
          onClick={handleClickScrollToBottom}
          message={lastMessage}
          isBottomIntersecting={currentBottomIntersecting.isIntersecting}
          newMessageActive={isNewMessageActive}
        />
      )}
      {children}
    </Container>
  )
}

export const ScrollButtonsArea = forwardRef(ScrollButtonsAreaImpl) as <
  T = UserType,
>(
  props: PropsWithChildren<ScrollButtonsAreaProps<T>> & {
    ref?: React.ForwardedRef<ScrollButtonsAreaHandler>
  },
) => ReturnType<typeof ScrollButtonsAreaImpl>

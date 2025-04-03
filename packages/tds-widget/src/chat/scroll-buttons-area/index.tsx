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
import { useScroll } from '../chat'

import { ScrollButtons, type ScrollButtonsProps } from './scroll-buttons'

interface InspectionConfig {
  id?: number
  isIntersecting: boolean
}

interface ScrollButtonsAreaProps<T = UserType>
  extends Pick<ScrollButtonsProps<T>, 'scrollButtonsStyle'> {
  lastSeenMessageId?: number
  lastMessage?: ChatMessageInterface<T>
}

export interface ScrollButtonsAreaHandler {
  onNewOthersMessage: () => void
  setBottomIntersecting: (data: InspectionConfig) => void
}

/**
 * 색상 변경이 필요한 경우, ScrollButtonsProvider와 함께 사용해 주세요.
 */
function ScrollButtonsAreaImpl<T = UserType>(
  {
    lastSeenMessageId,
    lastMessage,
    scrollButtonsStyle,
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

  const { scrollToBottom } = useScroll()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onButtonClick = (behavior: ScrollBehavior = 'smooth') => {
    scrollToBottom({ scrollBehavior: behavior })
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
  }, [])

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
          scrollButtonsStyle={scrollButtonsStyle}
          onClick={onButtonClick}
          message={lastMessage}
          isBottomIntersecting={currentBottomIntersecting.isIntersecting}
          newMessageActive={isNewMessageActive}
        />
      )}
      {children}
    </Container>
  )
}

export const ScrollButtonsArea = forwardRef(ScrollButtonsAreaImpl)

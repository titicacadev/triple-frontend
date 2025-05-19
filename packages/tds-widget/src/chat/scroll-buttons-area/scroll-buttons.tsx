import { useEffect, useRef, useState } from 'react'
import { CSSProp } from 'styled-components'

import { ChatMessageInterface, UserType } from '../types'

import { NewMessage, ScrollToBottomButton } from './elements'

export interface ScrollButtonsProps<T = UserType> {
  onClick: (behavior: ScrollBehavior, message?: ChatMessageInterface<T>) => void
  message?: ChatMessageInterface<T>
  newMessageActive: boolean
  isBottomIntersecting: boolean
  scrollButtonsStyle?: {
    scrollToButton?: {
      css?: CSSProp
    }
    newMessage?: {
      css?: CSSProp
    }
  }
}

export function ScrollButtons<T = UserType>({
  message: latestMessage,
  onClick,
  isBottomIntersecting,
  newMessageActive,
  scrollButtonsStyle = {},
}: ScrollButtonsProps<T>) {
  const [message, setMessage] = useState<ChatMessageInterface<T> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (latestMessage && latestMessage.id !== message?.id && newMessageActive) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setMessage(latestMessage)

      timeoutRef.current = setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestMessage])

  const handleClick = () => {
    onClick('instant', message ?? undefined)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setMessage(null)
  }

  return (
    <>
      {!(isBottomIntersecting || message) && (
        <ScrollToBottomButton
          onClick={onClick}
          css={scrollButtonsStyle?.scrollToButton?.css}
        />
      )}
      <NewMessage
        message={message}
        onClick={handleClick}
        css={scrollButtonsStyle?.newMessage?.css}
      />
    </>
  )
}

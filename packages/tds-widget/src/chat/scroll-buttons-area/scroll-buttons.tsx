import { useEffect, useRef, useState } from 'react'

import { ChatMessageInterface, UserType } from '../types'

import { NewMessage, ScrollToBottomButton } from './elements'

interface ScrollButtonsProps<T = UserType> {
  onClick: (behavior: ScrollBehavior) => void
  message?: ChatMessageInterface<T>
  newMessageActive: boolean
  isBottomIntersecting: boolean
}

export function ScrollButtons<T = UserType>({
  message: latestMessage,
  onClick,
  isBottomIntersecting,
  newMessageActive,
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
    onClick('instant')
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setMessage(null)
  }

  return (
    <>
      {!(isBottomIntersecting || message) && (
        <ScrollToBottomButton onClick={onClick} />
      )}
      <NewMessage message={message} onClick={handleClick} />
    </>
  )
}

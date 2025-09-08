import { RefObject, SyntheticEvent } from 'react'

export function textAreaAutoResize(e: SyntheticEvent, maxHeight: number) {
  const textareaElement = e.target as HTMLTextAreaElement
  textareaElement.style.height = ''
  textareaElement.style.height =
    Math.min(textareaElement.scrollHeight, maxHeight) + 'px'
}

export function handleSendClick(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  options: {
    dismissKeyboardOnSend: boolean
    textareaRef: RefObject<HTMLTextAreaElement>
    inputValue: string
    onSendMessage: () => void
    minHeight: number
  },
) {
  e.preventDefault()
  const {
    dismissKeyboardOnSend,
    textareaRef,
    inputValue,
    onSendMessage,
    minHeight,
  } = options
  if (!dismissKeyboardOnSend) {
    textareaRef.current?.focus()
  }
  if (inputValue.trim().length > 0) {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${minHeight}px`
    }
    onSendMessage()
  }
}

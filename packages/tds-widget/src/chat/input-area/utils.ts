import { SyntheticEvent } from 'react'

export function textAreaAutoResize(e: SyntheticEvent, maxHeight: number) {
  const textareaElement = e.target as HTMLTextAreaElement
  textareaElement.style.height = ''
  textareaElement.style.height =
    Math.min(textareaElement.scrollHeight, maxHeight) + 'px'
}

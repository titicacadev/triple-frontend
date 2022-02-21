import {
  ChangeEvent,
  useState,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
  useRef,
} from 'react'
import styled from 'styled-components'

const Textarea = styled.textarea<{ lineHeight: number }>`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  resize: none;
  font-size: 15px;
  outline: none;
  border: none;
  padding: 0;
  color: var(--color-gray);
  line-height: ${({ lineHeight }) => lineHeight}px;
  width: calc(100% - 46px);

  ::placeholder {
    color: var(--color-gray300);
  }
`

const TEXTAREA_LINE_HEIGHT = 19

interface TextareaProps {
  value: string
  minRows: number
  maxRows: number
  readOnly: boolean
  placeholder: string
  onChange: (message: string) => void
}

export interface TextAreaHandle {
  focusInput: () => void
}

function AutoResizingTextarea(
  { value, minRows, maxRows, readOnly, placeholder, onChange }: TextareaProps,
  ref: ForwardedRef<TextAreaHandle>,
) {
  const [rows, setRows] = useState(minRows)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const currentRows = Math.floor(
      event.target.scrollHeight / TEXTAREA_LINE_HEIGHT,
    )

    if (currentRows === rows) {
      setRows(currentRows)
    }

    if (currentRows >= maxRows) {
      setRows(maxRows)
      event.target.scrollTop = event.target.scrollHeight
    }

    onChange(event.target.value)
    setRows(currentRows < maxRows ? currentRows : maxRows)
  }

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      textareaRef.current?.focus()
    },
  }))

  return (
    <Textarea
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      lineHeight={TEXTAREA_LINE_HEIGHT}
      ref={textareaRef}
      readOnly={readOnly}
    />
  )
}

export default forwardRef(AutoResizingTextarea)

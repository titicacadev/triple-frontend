import React, { ChangeEvent, useState } from 'react'
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
  flex-grow: 2;

  ::placeholder {
    color: var(--color-gray300);
  }
`

const TEXTAREA_LINE_HEIGHT = 19

export default function AutoResizingTextarea({
  value,
  minRows,
  maxRows,
  placeholder,
  onChange,
  readOnly,
}: {
  value: string
  minRows: number
  maxRows: number
  placeholder?: string
  onChange: (message: string) => void
  readOnly: boolean
}) {
  const [rows, setRows] = useState(minRows)

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

  return (
    <Textarea
      rows={rows}
      value={value}
      placeholder={placeholder || '이 일정에 궁금한 점은 댓글로 써주세요.'}
      onChange={handleChange}
      lineHeight={TEXTAREA_LINE_HEIGHT}
      readOnly={readOnly}
    />
  )
}

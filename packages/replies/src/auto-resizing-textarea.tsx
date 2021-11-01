import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

const Textarea = styled.textarea`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  resize: none;
  width: calc(100% - 46px);
  font-size: 15px;
  line-height: 19px;
  outline: none;
  border: none;
  padding: 0;
  color: var(--color-gray);

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
}: {
  value: string
  minRows: number
  maxRows: number
  placeholder?: string
  onChange: (message: string) => void
}) {
  const [rows, setRows] = useState(1)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const previousRows = event.target.rows
    event.target.rows = minRows

    const currentRows = ~~(event.target.scrollHeight / TEXTAREA_LINE_HEIGHT)

    if (currentRows === previousRows) {
      event.target.rows = currentRows
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows
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
    />
  )
}

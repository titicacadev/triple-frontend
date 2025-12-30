import { SyntheticEvent, TextareaHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

import withField from '../with-field'

interface BaseTextareaProps {
  focused?: string
  error?: string
}

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>,
    BaseTextareaProps {
  onChange?: (e: SyntheticEvent, value: string) => void
}

const BaseTextarea = styled.textarea<BaseTextareaProps>`
  overflow: hidden;
  outline: none;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #efefef;
  border-radius: 2px;
  width: 100%;
  resize: none;
  min-height: 100px;

  ::placeholder {
    color: var(--color-gray300);
  }

  ${({ focused }) =>
    focused &&
    css`
      border-color: var(--color-blue);
    `};

  ${({ error }) =>
    error &&
    css`
      border-color: var(--color-red);
    `};
`

function Textarea({ onChange, ...props }: TextareaProps) {
  return (
    <BaseTextarea
      {...props}
      onChange={(e) => onChange && onChange(e, e.target.value)}
    />
  )
}

export default withField(Textarea)

import { InputHTMLAttributes, SyntheticEvent, FocusEvent } from 'react'
import InputMask, { MaskOptions } from 'react-input-mask'
import styled, { css } from 'styled-components'

import withField from '../with-field'

const BaseInput = styled(InputMask)<{ focused?: string; error?: string }>`
  outline: none;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid var(--color-gray100);
  border-radius: 2px;
  width: 100%;

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

type HtmlInputElementProps = InputHTMLAttributes<HTMLInputElement> & MaskOptions

interface InputProps extends Omit<HtmlInputElementProps, 'onChange'> {
  id?: string
  error?: string
  focused?: string
  onChange?: (e: SyntheticEvent, value: string) => void
  onBlur?: (e: FocusEvent<unknown>) => void
}

function Input({ onChange, ...props }: InputProps) {
  return (
    <BaseInput
      {...props}
      onChange={(e) => onChange && onChange(e, e.target.value)}
    />
  )
}

export default withField(Input)

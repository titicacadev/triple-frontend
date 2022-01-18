import * as React from 'react'
import InputMask, { MaskOptions } from 'react-input-mask'
import styled, { css } from 'styled-components'
import { getColor } from '@titicaca/color-palette'

import { withField } from '../utils/form-field'

const BaseInput = styled(InputMask)<{
  focused?: string
  error?: string | boolean
}>`
  appearance: none;
  margin: 0;
  padding: 0 16px;
  outline: none;
  font-size: 16px;
  height: 48px;
  font-weight: 500;
  border: 1px solid rgba(${getColor('gray100')});
  border-radius: 2px;
  box-sizing: border-box;
  width: 100%;

  ::placeholder {
    color: rgba(${getColor('gray300')});
  }

  ::-webkit-input-placeholder {
    color: rgba(${getColor('gray300')});
  }

  :-ms-input-placeholder {
    color: rgba(${getColor('gray300')});
  }

  ${({ focused }) =>
    focused &&
    css`
      border-color: rgb(${getColor('blue')});
    `};

  ${({ error }) =>
    error &&
    css`
      border-color: rgb(${getColor('red')});
    `};
`

type HtmlInputElementProps = React.InputHTMLAttributes<HTMLInputElement> &
  MaskOptions

interface InputProps extends Omit<HtmlInputElementProps, 'onChange'> {
  id?: string
  error?: string | boolean
  focused?: string
  onChange?: (e: React.SyntheticEvent, value: string) => unknown
  onBlur?: (e: React.FocusEvent<unknown>) => unknown
  inputRef?: React.Ref<HTMLInputElement>
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

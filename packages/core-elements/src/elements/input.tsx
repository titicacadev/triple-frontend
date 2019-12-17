import * as React from 'react'
import InputMask, { InputState, MaskOptions } from 'react-input-mask'
import styled, { css } from 'styled-components'
import { withField } from '../utils/form-field'
import { GetGlobalColor } from '../commons'

const BaseInput = styled(InputMask)<{ focused?: string; error?: string }>`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;
  outline: none;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid rgba(${GetGlobalColor('gray')}, 0.1);
  border-radius: 2px;
  box-sizing: border-box;
  width: 100%;

  ::placeholder {
    color: rgba(${GetGlobalColor('gray')}, 0.3);
  }

  :-ms-input-placeholder {
    color: rgba(${GetGlobalColor('gray')}, 0.3);
  }

  ::-ms-input-placeholder {
    color: rgba(${GetGlobalColor('gray')}, 0.3);
  }

  ${({ focused }) =>
    focused &&
    css`
      border-color: rgb(${GetGlobalColor('blue')});
    `};

  ${({ error }) =>
    error &&
    css`
      border-color: rgb(${GetGlobalColor('red')});
    `};
`

interface InputProps {
  id?: string
  type?: string
  value?: string
  error?: string
  placeholder?: string
  mask?: string
  maskChar?: string | null
  onChange?: (e: React.SyntheticEvent, value: string) => any
  onBlur?: (e: React.FocusEvent<any>) => any
}

function Input({
  onChange,
  id,
  type,
  value,
  error,
  placeholder,
  mask,
  maskChar,
  focused,
  onBlur,
}: InputProps & InputState & MaskOptions) {
  return (
    <BaseInput
      id={id}
      type={type}
      value={value}
      error={error}
      placeholder={placeholder}
      mask={mask}
      maskChar={maskChar}
      focused={focused}
      onBlur={onBlur}
      onChange={(e) => onChange(e, e.target.value)}
    />
  )
}

export default withField(Input)

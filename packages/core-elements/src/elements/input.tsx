import * as React from 'react'
import InputMask, { MaskOptions } from 'react-input-mask'
import styled, { css } from 'styled-components'
import { withField } from '../utils/form-field'
import { GetGlobalColor } from '../commons'

const BaseInput = styled(InputMask)<{ focused?: string; error?: string }>`
  appearance: none;
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

  ::-webkit-input-placeholder {
    color: rgba(${GetGlobalColor('gray')}, 0.3);
  }

  :-ms-input-placeholder {
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

type HTMLInputElementProps = React.InputHTMLAttributes<HTMLInputElement> &
  MaskOptions

interface InputProps extends Omit<HTMLInputElementProps, 'onChange'> {
  id?: string
  error?: string
  focused?: string
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
}: InputProps) {
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
      onChange={(e) => onChange && onChange(e, e.target.value)}
    />
  )
}

export default withField(Input)

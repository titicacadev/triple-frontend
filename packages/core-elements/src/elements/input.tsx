import * as React from 'react'
import InputMask, { InputState, MaskOptions } from 'react-input-mask'
import styled, { css } from 'styled-components'
import { withField } from '../utils/form-field'
import { GetGlobalColor } from '../commons'

const BaseInput = styled(InputMask)<{ focus?: boolean; error?: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0;
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

  ${({ focus }) =>
    focus &&
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
  onChange?: (e: React.SyntheticEvent, value: string) => any
}

function Input({ onChange, ...props }: InputProps & InputState & MaskOptions) {
  return <BaseInput onChange={(e) => onChange(e, e.target.value)} {...props} />
}

export default withField(Input)

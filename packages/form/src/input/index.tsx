import InputMask, { MaskOptions } from 'react-input-mask'
import styled, { css } from 'styled-components'
import { getColor } from '@titicaca/color-palette'

import withField from '../with-field'

const BaseInput = styled(InputMask)<{ focused?: string; error?: string }>`
  appearance: none;
  margin: 0;
  outline: none;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid rgba(${getColor('gray100')});
  border-radius: 2px;
  width: 100%;

  ::placeholder {
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

type HTMLInputElementProps = React.InputHTMLAttributes<HTMLInputElement> &
  MaskOptions

interface InputProps extends Omit<HTMLInputElementProps, 'onChange'> {
  id?: string
  error?: string
  focused?: string
  onChange?: (e: React.SyntheticEvent, value: string) => any
  onBlur?: (e: React.FocusEvent<any>) => any
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

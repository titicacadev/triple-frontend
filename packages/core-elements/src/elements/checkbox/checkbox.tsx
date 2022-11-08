import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import Text from '../text'

import { CheckboxBase, CheckboxBaseProps } from './checkbox-base'

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const CheckboxText = styled(Text)`
  flex: 1;
`

export interface CheckboxProps extends CheckboxBaseProps, PropsWithChildren {}

export const Checkbox = ({
  children,
  variant = 'square',
  name,
  checked,
  value,
  onChange,
}: CheckboxProps) => {
  return (
    <CheckboxLabel>
      <CheckboxText>{children}</CheckboxText>
      <CheckboxBase
        variant={variant}
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
      />
    </CheckboxLabel>
  )
}

import { ChangeEventHandler, PropsWithChildren } from 'react'
import styled from 'styled-components'

import { Text } from '../text'

import { CheckboxBase, CheckboxBaseProps } from './checkbox-base'
import { useCheckboxGroup } from './checkbox-group-context'

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
  const group = useCheckboxGroup()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (group) {
      const nextValue = event.target.checked
        ? group.value.concat(event.target.value)
        : group.value.filter((value) => event.target.value !== value)
      group?.onChange?.(nextValue)
    } else {
      onChange?.(event)
    }
  }

  return (
    <CheckboxLabel>
      <CheckboxText>{children}</CheckboxText>
      <CheckboxBase
        variant={variant}
        name={name ?? group?.name}
        checked={checked ?? (value ? group?.value?.includes(value) : undefined)}
        value={value}
        onChange={handleChange}
      />
    </CheckboxLabel>
  )
}

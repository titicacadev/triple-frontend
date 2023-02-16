import { ChangeEventHandler, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { useVisuallyHidden } from '@react-aria/visually-hidden'

import { useRadioGroup } from '../radio'

const Label = styled.label<{ checked: boolean }>`
  display: inline-block;
  position: relative;
  width: 50%;
  padding: 15px 0;
  border: ${({ checked }) =>
    checked
      ? `1px solid var(--color-blue) `
      : `1px solid var(--color-gray100) `};
  border-radius: 2px;
  text-align: center;
  font-size: 16px;
  color: ${({ checked }) =>
    checked ? `var(--color-blue) ` : `var(--color-gray300) `};

  &:last-child {
    border-left: none;
    border: ${({ checked }) => checked && `1px solid var(--color-blue) `};
  }
`

export interface GenderSelectorItemProps extends PropsWithChildren {
  value?: string
  disabled?: boolean
}

export const GenderSelectorItem = ({
  children,
  value,
  disabled,
}: GenderSelectorItemProps) => {
  const { visuallyHiddenProps } = useVisuallyHidden()
  const group = useRadioGroup()
  if (!group) {
    throw new Error()
  }

  const checked = group.value === value

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    group.onChange?.(event.target.value)
  }

  return (
    <Label checked={checked}>
      <input
        {...visuallyHiddenProps}
        type="radio"
        name={group.name}
        checked={checked}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />
      {children}
    </Label>
  )
}

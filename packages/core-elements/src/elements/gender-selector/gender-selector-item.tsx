import { ChangeEventHandler, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { getColor } from '@titicaca/color-palette'
import { useVisuallyHidden } from '@react-aria/visually-hidden'

import { useRadioGroup } from '../radio'

const Label = styled.label<{ checked: boolean }>`
  display: inline-block;
  position: relative;
  width: 50%;
  padding: 15px 0;
  border: ${({ checked }) =>
    checked
      ? `1px solid rgb(${getColor('blue')}) `
      : `1px solid rgba(${getColor('gray100')}) `};
  border-radius: 2px;
  text-align: center;
  font-size: 16px;
  color: ${({ checked }) =>
    checked ? `rgb(${getColor('blue')}) ` : `rgba(${getColor('gray300')}) `};

  &:last-child {
    border-left: none;
    border: ${({ checked }) =>
      checked && `1px solid rgb(${getColor('blue')}) `};
  }
`

export interface GenderSelectorItemProps extends PropsWithChildren {
  value?: string
}

export const GenderSelectorItem = ({
  children,
  value,
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
        value={value}
        onChange={handleChange}
      />
      {children}
    </Label>
  )
}

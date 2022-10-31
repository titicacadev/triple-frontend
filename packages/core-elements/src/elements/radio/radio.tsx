import { blue, gray200 } from '@titicaca/color-palette'
import { ChangeEventHandler, PropsWithChildren } from 'react'
import styled from 'styled-components'

import Text from '../text'

import { useRadioGroup } from './radio-group-context'

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const RadioText = styled(Text)`
  flex: 1;
`

const RadioInput = styled.input`
  appearance: none;
  position: relative;
  width: 26px;
  height: 26px;
  border: 1px solid ${gray200};
  border-radius: 50%;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 7px;
    left: 7px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${blue};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:checked::after {
    opacity: 1;
  }
`

export interface RadioProps extends PropsWithChildren {
  name?: string
  checked?: boolean
  tabIndex?: number
  value?: string
  onChange?: (value: string) => void
}

export const Radio = ({
  children,
  name,
  checked,
  value,
  onChange,
}: RadioProps) => {
  const group = useRadioGroup()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const handler = onChange ?? group?.onChange
    handler?.(event.target.value)
  }

  return (
    <RadioLabel>
      <RadioText size="large">{children}</RadioText>
      <RadioInput
        type="radio"
        name={name ?? group?.name}
        checked={checked ?? group?.value === value}
        value={value}
        onChange={handleChange}
      />
    </RadioLabel>
  )
}

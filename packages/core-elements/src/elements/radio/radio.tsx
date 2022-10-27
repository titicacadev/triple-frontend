import { blue, gray200 } from '@titicaca/color-palette'
import { ChangeEventHandler, PropsWithChildren, useId, useRef } from 'react'
import styled from 'styled-components'

import Text from '../text'

import { useRadioGroup } from './radio-group-context'

const RadioFrame = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const RadioLabel = styled(Text).attrs({ as: 'label' })`
  flex: 1;
`

interface RadioInputProps {
  checked?: boolean
}

const RadioInput = styled.input.attrs({ type: 'radio' })<RadioInputProps>`
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
  tabIndex,
  value,
  onChange,
}: RadioProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const id = useId()
  const group = useRadioGroup()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const handler = onChange ?? group?.onChange
    handler?.(event.target.value)
  }

  return (
    <RadioFrame>
      <RadioLabel htmlFor={id} size="large">
        {children}
      </RadioLabel>
      <RadioInput
        ref={ref}
        id={id}
        name={name ?? group?.name}
        checked={checked ?? group?.value === value}
        tabIndex={tabIndex}
        value={value}
        onChange={handleChange}
      />
    </RadioFrame>
  )
}

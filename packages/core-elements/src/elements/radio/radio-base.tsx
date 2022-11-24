import { ChangeEventHandler } from 'react'
import styled from 'styled-components'

const RadioInput = styled.input`
  appearance: none;
  position: relative;
  width: 26px;
  height: 26px;
  border: 1px solid var(--color-gray200);
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
    background-color: var(--color-blue);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:checked::after {
    opacity: 1;
  }
`

export interface RadioBaseProps {
  name?: string
  checked?: boolean
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const RadioBase = ({
  name,
  checked,
  value,
  onChange,
}: RadioBaseProps) => {
  return (
    <RadioInput
      type="radio"
      name={name}
      checked={checked}
      value={value}
      onChange={onChange}
    />
  )
}

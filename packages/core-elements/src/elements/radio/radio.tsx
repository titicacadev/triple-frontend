import { ChangeEventHandler, PropsWithChildren } from 'react'
import styled from 'styled-components'

import { Text } from '../text'

import { RadioBase, RadioBaseProps } from './radio-base'
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

export type RadioProps = RadioBaseProps & PropsWithChildren

export const Radio = ({
  children,
  name,
  checked,
  value,
  onChange,
}: RadioProps) => {
  const group = useRadioGroup()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (group) {
      group.onChange?.(event.target.value)
    } else {
      onChange?.(event)
    }
  }

  return (
    <RadioLabel>
      <RadioText size="large">{children}</RadioText>
      <RadioBase
        name={name ?? group?.name}
        checked={checked ?? group?.value === value}
        value={value}
        onChange={handleChange}
      />
    </RadioLabel>
  )
}

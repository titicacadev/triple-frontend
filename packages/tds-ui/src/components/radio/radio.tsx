import {
  ChangeEventHandler,
  forwardRef,
  PropsWithChildren,
  useContext,
} from 'react'
import styled from 'styled-components'

import { Text } from '../text'
import { RadioGroupContext } from '../radio-group'

import { RadioBase, RadioBaseProps } from './radio-base'

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

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { children, name, checked, value, onChange, ...props },
  ref,
) {
  const group = useContext(RadioGroupContext)

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
        {...props}
        ref={ref}
        name={name ?? group?.name}
        checked={checked ?? (value ? group?.value === value : undefined)}
        value={value}
        onChange={handleChange}
      />
    </RadioLabel>
  )
})

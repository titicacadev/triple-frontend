import { PropsWithChildren } from 'react'
import { FocusScope } from '@react-aria/focus'

import { RadioGroupContext } from './radio-group-context'
import { RadioGroupBase } from './radio-group-base'

export interface RadioGroupProps extends PropsWithChildren {
  name?: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

export const RadioGroup = ({
  children,
  name,
  defaultValue,
  value,
  onChange,
}: RadioGroupProps) => {
  return (
    <RadioGroupContext.Provider
      value={{
        name,
        defaultValue,
        value,
        onChange,
      }}
    >
      <FocusScope>
        <RadioGroupBase>{children}</RadioGroupBase>
      </FocusScope>
    </RadioGroupContext.Provider>
  )
}

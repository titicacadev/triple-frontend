import { PropsWithChildren } from 'react'

import { RadioGroupContext } from './radio-group-context'

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
      <div role="radiogroup">{children}</div>
    </RadioGroupContext.Provider>
  )
}

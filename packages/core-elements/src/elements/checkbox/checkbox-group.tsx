import { PropsWithChildren } from 'react'

import { CheckboxGroupBase } from './checkbox-group-base'
import { CheckboxGroupContext } from './checkbox-group-context'

export interface CheckboxGroupProps extends PropsWithChildren {
  name?: string
  defaultValue?: string[]
  value?: string[]
  onChange?: (value: string[]) => void
}

export const CheckboxGroup = ({
  children,
  name,
  defaultValue = [],
  value = [],
  onChange,
}: CheckboxGroupProps) => {
  return (
    <CheckboxGroupContext.Provider
      value={{ name, defaultValue, value, onChange }}
    >
      <CheckboxGroupBase>{children}</CheckboxGroupBase>
    </CheckboxGroupContext.Provider>
  )
}

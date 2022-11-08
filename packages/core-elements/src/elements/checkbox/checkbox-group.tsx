import { PropsWithChildren } from 'react'

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
      <div role="group">{children}</div>
    </CheckboxGroupContext.Provider>
  )
}

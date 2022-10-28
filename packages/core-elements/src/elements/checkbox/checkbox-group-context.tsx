import { createContext, useContext } from 'react'

export interface CheckboxGroupContextValue {
  name?: string
  defaultValue: string[]
  value: string[]
  onChange?: (value: string[]) => void
}

export const CheckboxGroupContext = createContext<
  CheckboxGroupContextValue | undefined
>(undefined)

export function useCheckboxGroup() {
  const context = useContext(CheckboxGroupContext)
  return context
}

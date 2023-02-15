import { createContext, useContext, ChangeEventHandler } from 'react'

export interface RadioGroupContextValue {
  name?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export const RadioGroupContext =
  createContext<RadioGroupContextValue | undefined>(undefined)

export function useRadioGroup() {
  const context = useContext(RadioGroupContext)
  return context
}

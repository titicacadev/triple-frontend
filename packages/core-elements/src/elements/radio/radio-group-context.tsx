import { createContext, useContext } from 'react'

export interface RadioGroupContextValue {
  name?: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

export const RadioGroupContext = createContext<
  RadioGroupContextValue | undefined
>(undefined)

export function useRadioGroup() {
  const context = useContext(RadioGroupContext)
  return context
}

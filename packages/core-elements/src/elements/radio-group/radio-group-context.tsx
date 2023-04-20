import { createContext } from 'react'

export interface RadioGroupContextValue {
  descriptionId: string
  errorId: string
  isDisabled: boolean
  isError: boolean
  isFocused: boolean
  isRequired: boolean
  name?: string
  value?: string
  onChange?: (value: string) => void
}

export const RadioGroupContext = createContext<
  RadioGroupContextValue | undefined
>(undefined)

import { createContext } from 'react'

export interface CheckboxGroupContextValue {
  descriptionId: string
  errorId: string
  isDisabled: boolean
  isError: boolean
  isFocused: boolean
  isRequired: boolean
  name?: string
  value: string[]
  onChange?: (value: string[]) => void
}

export const CheckboxGroupContext = createContext<
  CheckboxGroupContextValue | undefined
>(undefined)

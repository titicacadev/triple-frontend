import { createContext, FocusEventHandler, useContext } from 'react'

export interface FormGroupContextValue {
  descriptionId: string
  errorId: string
  isError: boolean
  isDisabled: boolean
  isRequired: boolean
  isFocused: boolean
  handleBlur: FocusEventHandler
  handleFocus: FocusEventHandler
}

export const FormGroupContext = createContext<
  FormGroupContextValue | undefined
>(undefined)

export function useFormGroup() {
  const context = useContext(FormGroupContext)
  if (!context) {
    throw new Error('FormGroupContext가 없습니다.')
  }
  return context
}

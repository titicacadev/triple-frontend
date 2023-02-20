import { createContext, FocusEventHandler, useContext } from 'react'

export interface FormFieldContextValue {
  inputId: string
  labelId: string
  descriptionId: string
  errorId: string
  isError: boolean
  isDisabled: boolean
  isRequired: boolean
  isFocused: boolean
  handleBlur: FocusEventHandler
  handleFocus: FocusEventHandler
}

export const FormFieldContext = createContext<
  FormFieldContextValue | undefined
>(undefined)

export function useFormField() {
  const context = useContext(FormFieldContext)
  if (!context) {
    throw new Error('FormFieldContext가 없습니다.')
  }
  return context
}

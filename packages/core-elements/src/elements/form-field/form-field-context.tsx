import { createContext, useContext } from 'react'

export interface FormFieldContextValue {
  inputId: string
  labelId: string
  descriptionId: string
  errorId: string
}

export const FormFieldContext = createContext<
  FormFieldContextValue | undefined
>(undefined)

export function useFormField() {
  const context = useContext(FormFieldContext)
  return context
}

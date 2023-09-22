import { PropsWithChildren } from 'react'

import { FormFieldContext } from './form-field-context'
import {
  useFormFieldState,
  UseFormFieldStateParams,
} from './use-form-field-state'

export interface FormFieldProps
  extends UseFormFieldStateParams,
    PropsWithChildren {
  isError?: boolean
  isDisabled?: boolean
  isRequired?: boolean
}

export const FormField = ({
  children,
  isError = false,
  isDisabled = false,
  isRequired = false,
  onBlur,
  onFocus,
}: FormFieldProps) => {
  const state = useFormFieldState({ onBlur, onFocus })

  return (
    <FormFieldContext.Provider
      value={{
        ...state,
        isError,
        isDisabled,
        isRequired,
      }}
    >
      {children}
    </FormFieldContext.Provider>
  )
}

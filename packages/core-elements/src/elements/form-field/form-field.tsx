import { PropsWithChildren } from 'react'

import { FormFieldContext } from './form-field-context'
import { useFormFieldState } from './use-form-field-state'

export interface FormFieldProps extends PropsWithChildren {
  isError?: boolean
  isDisabled?: boolean
  isRequired?: boolean
}

export const FormField = ({
  children,
  isError = false,
  isDisabled = false,
  isRequired = false,
}: FormFieldProps) => {
  const state = useFormFieldState()

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

import { PropsWithChildren, useId } from 'react'

import { FormFieldContext } from './form-field-context'

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
  const inputId = useId()
  const labelId = useId()
  const descriptionId = useId()
  const errorId = useId()

  return (
    <FormFieldContext.Provider
      value={{
        inputId,
        labelId,
        descriptionId,
        errorId,
        isError,
        isDisabled,
        isRequired,
      }}
    >
      {children}
    </FormFieldContext.Provider>
  )
}

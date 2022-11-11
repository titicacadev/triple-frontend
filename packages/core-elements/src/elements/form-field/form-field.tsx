import { PropsWithChildren, useId } from 'react'

import { FormFieldContext } from './form-field-context'

export type FormFieldProps = PropsWithChildren

export const FormField = ({ children }: FormFieldProps) => {
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
      }}
    >
      {children}
    </FormFieldContext.Provider>
  )
}

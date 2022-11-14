import { PropsWithChildren } from 'react'

import {
  FormFieldContext,
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormFieldState,
} from '../form-field'

import {
  CheckboxGroupContext,
  CheckboxGroupContextValue,
} from './checkbox-group-context'

export interface CheckboxGroupProps
  extends PropsWithChildren,
    CheckboxGroupContextValue {
  label?: string
  error?: string
  help?: string
}

export const CheckboxGroup = ({
  children,
  name,
  value = [],
  label,
  error,
  help,
  onChange,
}: CheckboxGroupProps) => {
  const formFieldState = useFormFieldState()

  const hasLabel = !!label
  const hasHelp = !!help
  const isError = !!error

  return (
    <CheckboxGroupContext.Provider value={{ name, value, onChange }}>
      <FormFieldContext.Provider
        value={{
          ...formFieldState,
          isError,
          isDisabled: false,
          isRequired: false,
        }}
      >
        {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}
        <div
          role="group"
          aria-labelledby={hasLabel ? formFieldState.labelId : undefined}
          aria-describedby={
            hasHelp
              ? formFieldState.descriptionId
              : isError
              ? formFieldState.errorId
              : undefined
          }
        >
          {children}
        </div>
        {error ? (
          <FormFieldError>{error}</FormFieldError>
        ) : help ? (
          <FormFieldHelp>{help}</FormFieldHelp>
        ) : null}
      </FormFieldContext.Provider>
    </CheckboxGroupContext.Provider>
  )
}

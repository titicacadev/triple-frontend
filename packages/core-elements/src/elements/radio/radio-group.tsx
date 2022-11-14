import { PropsWithChildren } from 'react'

import {
  FormFieldContext,
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormFieldState,
} from '../form-field'

import {
  RadioGroupContext,
  RadioGroupContextValue,
} from './radio-group-context'

export interface RadioGroupProps
  extends PropsWithChildren,
    RadioGroupContextValue {
  required?: boolean
  label?: string
  error?: string
  help?: string
}

export const RadioGroup = ({
  children,
  name,
  value,
  required = false,
  label,
  error,
  help,
  onChange,
}: RadioGroupProps) => {
  const formFieldState = useFormFieldState()

  const hasLabel = !!label
  const hasHelp = !!help
  const isError = !!error

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value,
        onChange,
      }}
    >
      <FormFieldContext.Provider
        value={{
          ...formFieldState,
          isError,
          isDisabled: false,
          isRequired: required,
        }}
      >
        {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}
        <div
          role="radiogroup"
          aria-labelledby={hasLabel ? formFieldState?.labelId : undefined}
          aria-describedby={
            hasHelp && !isError ? formFieldState?.descriptionId : undefined
          }
          aria-errormessage={isError ? formFieldState?.errorId : undefined}
          aria-invalid={isError}
          aria-required={required}
        >
          {children}
        </div>
        {error ? (
          <FormFieldError>{error}</FormFieldError>
        ) : help ? (
          <FormFieldHelp>{help}</FormFieldHelp>
        ) : null}
      </FormFieldContext.Provider>
    </RadioGroupContext.Provider>
  )
}

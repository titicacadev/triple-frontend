import { HTMLAttributes, PropsWithChildren } from 'react'

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
    RadioGroupContextValue,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  required?: boolean
  disabled?: boolean
  label?: string
  error?: string
  help?: string
}

export const RadioGroup = ({
  children,
  name,
  value,
  required = false,
  disabled = false,
  label,
  error,
  help,
  onBlur,
  onChange,
  onFocus,
  ...props
}: RadioGroupProps) => {
  const formFieldState = useFormFieldState({ onBlur, onFocus })

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
          isDisabled: disabled,
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
          onBlur={formFieldState.handleBlur}
          onFocus={formFieldState.handleFocus}
          {...props}
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

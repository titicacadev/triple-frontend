import { HTMLAttributes, PropsWithChildren } from 'react'

import {
  FormGroupContext,
  FormGroupError,
  FormGroupHelp,
  FormGroupLabel,
  useFormGroupState,
} from '../form-group'

import {
  RadioGroupContext,
  RadioGroupContextValue,
} from './radio-group-context'

export interface RadioGroupProps
  extends PropsWithChildren,
    RadioGroupContextValue,
    Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
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
  const formGroupState = useFormGroupState({ onBlur, onFocus })

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
      <FormGroupContext.Provider
        value={{
          ...formGroupState,
          isError,
          isDisabled: disabled,
          isRequired: required,
        }}
      >
        <fieldset
          role="radiogroup"
          aria-describedby={
            hasHelp && !isError ? formGroupState?.descriptionId : undefined
          }
          aria-errormessage={isError ? formGroupState?.errorId : undefined}
          aria-invalid={isError}
          aria-required={required}
          onBlur={formGroupState.handleBlur}
          onFocus={formGroupState.handleFocus}
          {...props}
        >
          {label ? <FormGroupLabel>{label}</FormGroupLabel> : null}
          {children}
          {error ? (
            <FormGroupError>{error}</FormGroupError>
          ) : help ? (
            <FormGroupHelp>{help}</FormGroupHelp>
          ) : null}
        </fieldset>
      </FormGroupContext.Provider>
    </RadioGroupContext.Provider>
  )
}

import { PropsWithChildren } from 'react'

import {
  FormField,
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormField,
} from '../form-field'

import {
  RadioGroupContext,
  RadioGroupContextValue,
} from './radio-group-context'

interface RadioGroupBaseProps extends PropsWithChildren {
  hasLabel: boolean
  hasHelp: boolean
  isError: boolean
  isRequired: boolean
}

const RadioGroupBase = ({
  children,
  hasLabel,
  hasHelp,
  isError,
  isRequired,
}: RadioGroupBaseProps) => {
  const formField = useFormField()

  return (
    <div
      role="radiogroup"
      aria-labelledby={hasLabel ? formField?.labelId : undefined}
      aria-describedby={
        hasHelp && !isError ? formField?.descriptionId : undefined
      }
      aria-errormessage={isError ? formField?.errorId : undefined}
      aria-invalid={isError}
      aria-required={isRequired}
    >
      {children}
    </div>
  )
}

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
  defaultValue,
  value,
  required = false,
  label,
  error,
  help,
  onChange,
}: RadioGroupProps) => {
  return (
    <RadioGroupContext.Provider
      value={{
        name,
        defaultValue,
        value,
        onChange,
      }}
    >
      <FormField>
        {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}
        <RadioGroupBase
          hasLabel={!!label}
          hasHelp={!!help}
          isError={!!error}
          isRequired={required}
        >
          {children}
        </RadioGroupBase>
        {error ? (
          <FormFieldError>{error}</FormFieldError>
        ) : help ? (
          <FormFieldHelp>{help}</FormFieldHelp>
        ) : null}
      </FormField>
    </RadioGroupContext.Provider>
  )
}

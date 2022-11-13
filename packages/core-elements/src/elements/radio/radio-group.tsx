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
}

const RadioGroupBase = ({
  children,
  hasLabel,
  hasHelp,
}: RadioGroupBaseProps) => {
  const formField = useFormField()

  return (
    <div
      role="radiogroup"
      aria-labelledby={hasLabel ? formField?.labelId : undefined}
      aria-describedby={
        hasHelp && !formField.isError ? formField?.descriptionId : undefined
      }
      aria-errormessage={formField.isError ? formField?.errorId : undefined}
      aria-invalid={formField.isError}
      aria-required={formField.isRequired}
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
        value,
        onChange,
      }}
    >
      <FormField isError={!!error} isRequired={required}>
        {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}
        <RadioGroupBase hasLabel={!!label} hasHelp={!!help}>
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

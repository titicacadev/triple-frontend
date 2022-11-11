import { PropsWithChildren } from 'react'

import {
  FormField,
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormField,
} from '../form-field'

import {
  CheckboxGroupContext,
  CheckboxGroupContextValue,
} from './checkbox-group-context'

interface CheckboxGroupBaseProps extends PropsWithChildren {
  hasLabel: boolean
  hasHelp: boolean
  isError: boolean
}

const CheckboxGroupBase = ({
  children,
  hasLabel,
  hasHelp,
  isError,
}: CheckboxGroupBaseProps) => {
  const formField = useFormField()

  return (
    <div
      role="group"
      aria-labelledby={hasLabel ? formField?.labelId : undefined}
      aria-describedby={
        hasHelp
          ? formField?.descriptionId
          : isError
          ? formField?.errorId
          : undefined
      }
    >
      {children}
    </div>
  )
}
export interface CheckboxGroupProps
  extends PropsWithChildren,
    CheckboxGroupContextValue {
  required?: boolean
  label?: string
  error?: string
  help?: string
}

export const CheckboxGroup = ({
  children,
  name,
  defaultValue = [],
  value = [],
  required,
  label,
  error,
  help,
  onChange,
}: CheckboxGroupProps) => {
  return (
    <CheckboxGroupContext.Provider
      value={{ name, defaultValue, value, onChange }}
    >
      <FormField>
        {label ? (
          <FormFieldLabel isError={!!error} isRequired={required}>
            {label}
          </FormFieldLabel>
        ) : null}
        <CheckboxGroupBase
          hasLabel={!!label}
          hasHelp={!!label}
          isError={!!error}
        >
          {children}
        </CheckboxGroupBase>
        {error ? (
          <FormFieldError>{error}</FormFieldError>
        ) : help ? (
          <FormFieldHelp>{help}</FormFieldHelp>
        ) : null}
      </FormField>
    </CheckboxGroupContext.Provider>
  )
}

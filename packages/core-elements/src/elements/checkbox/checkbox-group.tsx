import { HTMLAttributes, PropsWithChildren } from 'react'

import {
  FormGroupContext,
  FormGroupError,
  FormGroupHelp,
  FormGroupLabel,
  useFormGroupState,
} from '../form-group'

import {
  CheckboxGroupContext,
  CheckboxGroupContextValue,
} from './checkbox-group-context'

export interface CheckboxGroupProps
  extends PropsWithChildren,
    CheckboxGroupContextValue,
    Omit<HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
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
  onBlur,
  onChange,
  onFocus,
  ...props
}: CheckboxGroupProps) => {
  const formGroupState = useFormGroupState({ onBlur, onFocus })

  const hasHelp = !!help
  const isError = !!error

  return (
    <CheckboxGroupContext.Provider value={{ name, value, onChange }}>
      <FormGroupContext.Provider
        value={{
          ...formGroupState,
          isError,
          isDisabled: false,
          isRequired: false,
        }}
      >
        <fieldset
          aria-describedby={
            hasHelp
              ? formGroupState.descriptionId
              : isError
              ? formGroupState.errorId
              : undefined
          }
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
    </CheckboxGroupContext.Provider>
  )
}

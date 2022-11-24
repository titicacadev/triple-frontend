import { InputHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'
import InputMask, { MaskOptions } from 'react-input-mask'

import {
  FormFieldContext,
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormFieldState,
} from '../form-field'

const BaseInput = styled(InputMask)`
  padding: 0 16px;
  font-size: 16px;
  height: 48px;
  font-weight: 500;
  border: 1px solid var(--color-gray100);
  border-radius: 2px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--color-blue);
  }

  &[aria-invalid='true'] {
    border-color: var(--color-red);
  }

  &::placeholder {
    color: var(--color-gray300);
  }
`

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    MaskOptions {
  label?: string
  error?: string | boolean
  help?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, help, onBlur, onFocus, ...props },
  ref,
) {
  const formFieldState = useFormFieldState({ onBlur, onFocus })

  const hasHelp = !!help
  const isError = !!error

  return (
    <FormFieldContext.Provider
      value={{
        ...formFieldState,
        isError,
        isDisabled: !!props.disabled,
        isRequired: !!props.required,
      }}
    >
      {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}
      <BaseInput
        inputRef={ref}
        id={formFieldState.inputId}
        aria-describedby={
          hasHelp && !isError ? formFieldState.descriptionId : undefined
        }
        aria-errormessage={isError ? formFieldState.errorId : undefined}
        aria-invalid={isError}
        onBlur={formFieldState.handleBlur}
        onFocus={formFieldState.handleFocus}
        {...props}
      />
      {error ? (
        <FormFieldError>{error}</FormFieldError>
      ) : help ? (
        <FormFieldHelp>{help}</FormFieldHelp>
      ) : null}
    </FormFieldContext.Provider>
  )
})

import { InputHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'
import InputMask, { MaskOptions } from 'react-input-mask'
import { getColor } from '@titicaca/color-palette'

import {
  FormFieldContext,
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormFieldState,
} from '../form-field'

const BaseInput = styled(InputMask)`
  padding: 0 16px;
  outline: none;
  font-size: 16px;
  height: 48px;
  font-weight: 500;
  border: 1px solid rgba(${getColor('gray100')});
  border-radius: 2px;
  width: 100%;

  &[aria-invalid='true'] {
    border-color: rgb(${getColor('red')});
  }

  &:focus {
    border-color: rgb(${getColor('blue')});
  }

  &::placeholder {
    color: rgba(${getColor('gray300')});
  }
`

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    MaskOptions {
  required?: boolean
  label?: string
  error?: string | boolean
  help?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { required = false, label, error, help, ...props },
  ref,
) {
  const formFieldState = useFormFieldState()

  const hasHelp = !!help
  const isError = !!error

  return (
    <FormFieldContext.Provider
      value={{
        ...formFieldState,
        isError,
        isDisabled: !!props.disabled,
        isRequired: required,
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

import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'
import styled from 'styled-components'
import { type MaskOptions, format, useMask } from '@react-input/mask'

import {
  FormFieldContext,
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormFieldState,
} from '../form-field'

const BaseInput = styled.input`
  padding: 0 16px;
  font-size: 16px;
  height: 48px;
  font-weight: 500;
  border: 1px solid var(--color-gray100);
  border-radius: 4px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--color-blue);
  }

  &[aria-invalid='true'] {
    border-color: var(--color-mediumRed);
  }

  &::placeholder {
    color: var(--color-gray300);
  }
`

type HtmlInputElementProps = InputHTMLAttributes<HTMLInputElement> & MaskOptions

export interface InputProps extends HtmlInputElementProps {
  label?: string
  error?: string | boolean
  help?: ReactNode
  inputRef?: (element: HTMLInputElement) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    help,
    onBlur,
    onFocus,
    value,
    mask,
    replacement,
    inputRef,
    ...props
  },
  ref,
) {
  const formFieldState = useFormFieldState({ onBlur, onFocus })

  const hasHelp = !!help
  const isError = !!error

  const inputMaskRef = useMask({
    mask,
    replacement: replacement ?? { 9: /\d/, d: /\d/, m: /\d/, y: /\d/ },
  })

  const formattedValue =
    value && mask
      ? format(String(value), {
          mask,
          replacement: replacement ?? { 9: /\d/, d: /\d/, m: /\d/, y: /\d/ },
        })
      : value ?? ''

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
        ref={(element: HTMLInputElement) => {
          if (!element) {
            return
          }
          inputMaskRef.current = element
          if (typeof ref === 'function') {
            ref(element)
          } else if (ref) {
            ref.current = element
          }
          if (inputRef && inputRef !== ref) {
            inputRef(element)
          }
        }}
        id={formFieldState.inputId}
        aria-describedby={
          hasHelp && !isError ? formFieldState.descriptionId : undefined
        }
        aria-errormessage={isError ? formFieldState.errorId : undefined}
        aria-invalid={isError}
        onBlur={formFieldState.handleBlur}
        onFocus={formFieldState.handleFocus}
        defaultValue={formattedValue}
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

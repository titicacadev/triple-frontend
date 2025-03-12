import {
  InputHTMLAttributes,
  forwardRef,
  ReactNode,
  useImperativeHandle,
} from 'react'
import styled from 'styled-components'
import { type MaskOptions, useMask } from '@react-input/mask'

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

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    MaskOptions {
  label?: string
  error?: string | boolean
  help?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, help, onBlur, onFocus, mask, onChange, ...props },
  ref,
) {
  const formFieldState = useFormFieldState({ onBlur, onFocus })

  const hasHelp = !!help
  const isError = !!error

  const inputMaskRef = useMask({
    mask,
    replacement: { 9: /\d/, d: /\d/, m: /\d/, y: /\d/ },
  })

  useImperativeHandle(ref, () => inputMaskRef.current, [inputMaskRef])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }

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
        ref={inputMaskRef}
        id={formFieldState.inputId}
        aria-describedby={
          hasHelp && !isError ? formFieldState.descriptionId : undefined
        }
        aria-errormessage={isError ? formFieldState.errorId : undefined}
        aria-invalid={isError}
        onBlur={formFieldState.handleBlur}
        onFocus={formFieldState.handleFocus}
        onChange={handleChange}
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

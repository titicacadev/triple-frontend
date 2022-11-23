import { forwardRef, TextareaHTMLAttributes } from 'react'
import styled from 'styled-components'

import { GlobalColors } from '../../commons'
import {
  FormFieldContext,
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormFieldState,
} from '../form-field'

const COLORS: Partial<Record<GlobalColors, string>> = {
  blue: '54, 143, 255',
  red: '255, 33, 60',
  gray: '58, 58, 58',
}

const BaseTextarea = styled.textarea`
  overflow: hidden;
  outline: none;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #efefef;
  border-radius: 2px;
  width: 100%;
  resize: none;
  min-height: 100px;

  &::placeholder {
    color: rgba(${COLORS.gray}, 0.3);
  }

  &:focus {
    border-color: rgb(${COLORS.blue});
  }

  &[aria-invalid='true'] {
    border-color: rgb(${COLORS.red});
  }
`

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  required?: boolean
  label?: string
  error?: string | boolean
  help?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { required = false, label, error, help, onBlur, onFocus, ...props },
    ref,
  ) {
    const formFieldState = useFormFieldState({ onBlur, onFocus })

    const hasLabel = !!label
    const hasHelp = !!help
    const isError = !!error

    return (
      <FormFieldContext.Provider
        value={{
          ...formFieldState,
          isError,
          isDisabled: false,
          isRequired: required,
        }}
      >
        {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}
        <BaseTextarea
          ref={ref}
          id={hasLabel ? formFieldState.inputId : undefined}
          aria-describedby={
            hasHelp && !isError ? formFieldState.descriptionId : undefined
          }
          aria-errormessage={isError ? formFieldState.errorId : undefined}
          aria-invalid={isError}
          aria-multiline
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
  },
)

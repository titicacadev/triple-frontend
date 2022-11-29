import { forwardRef, SelectHTMLAttributes } from 'react'
import styled from 'styled-components'

import {
  FormFieldContext,
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormFieldState,
} from '../form-field'
import { Container } from '../container'

const BaseSelect = styled.select`
  appearance: none;
  position: relative;
  width: 100%;
  height: 48px;
  text-indent: 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid var(--color-gray100);
  border-radius: 2px;
  color: var(--color-gray);

  &:disabled {
    background-color: rgba(235, 235, 235, 1);
    color: var(--color-gray300);
  }

  &[aria-invalid='true'] {
    border-color: var(--color-red);
    color: var(--color-red);
  }
`

const Svg = styled.svg`
  position: absolute;
  top: 16px;
  right: 16px;
`

export type OptionValueType = string | number | readonly string[]

export interface SelectOption {
  label: string
  value: OptionValueType
}

export interface SelectOwnProps {
  value?: OptionValueType
  options?: SelectOption[]
  placeholder?: string
  label?: string
  error?: string | boolean
  help?: string
}

export type SelectProps = SelectOwnProps &
  SelectHTMLAttributes<HTMLSelectElement>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      value,
      placeholder,
      options,
      label,
      error,
      help,
      onBlur,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const formFieldState = useFormFieldState({ onBlur, onFocus })

    const hasHelp = !!help
    const isError = !!error

    return (
      <FormFieldContext.Provider
        value={{
          ...formFieldState,
          isDisabled: !!props.disabled,
          isError,
          isRequired: !!props.required,
        }}
      >
        {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}
        <Container position="relative">
          <BaseSelect
            ref={ref}
            id={formFieldState.inputId}
            value={value}
            aria-describedby={
              hasHelp ? formFieldState.descriptionId : undefined
            }
            aria-errormessage={isError ? formFieldState.errorId : undefined}
            aria-invalid={isError}
            {...props}
          >
            {placeholder ? <option value="">{placeholder}</option> : null}
            {options?.map(({ label, value }, idx) => (
              <option key={idx} value={value}>
                {label}
              </option>
            ))}
          </BaseSelect>
          <Svg
            width="10"
            height="20"
            viewBox="0 0 10 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 8.5L5 12.5L1 8.5"
              stroke="#3A3A3A"
              strokeOpacity="0.3"
              strokeLinejoin="round"
            />
          </Svg>
        </Container>
        {error ? (
          <FormFieldError>{error}</FormFieldError>
        ) : help ? (
          <FormFieldHelp>{help}</FormFieldHelp>
        ) : null}
      </FormFieldContext.Provider>
    )
  },
)

import { ChangeEventHandler, SelectHTMLAttributes } from 'react'
import styled from 'styled-components'
import { getColor } from '@titicaca/color-palette'

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
  border: 1px solid rgba(${getColor('gray100')});
  border-radius: 2px;
  color: rgba(${getColor('gray')});

  &:disabled {
    background-color: rgba(235, 235, 235, 1);
    color: rgba(${getColor('gray300')});
  }

  &[aria-invalid='true'] {
    border-color: rgba(${getColor('red')});
    color: rgba(${getColor('red')});
  }
`

const Svg = styled.svg`
  position: absolute;
  top: 16px;
  right: 16px;
`

export type OptionValueType = string | number | readonly string[]

export interface SelectOption<Value extends OptionValueType> {
  label: string
  value: Value
}

export interface SelectOwnProps<Value extends OptionValueType> {
  name?: string
  value?: Value
  options?: SelectOption<Value>[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  label?: string
  error?: string
  help?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

type SelectProps<Value extends OptionValueType> = SelectOwnProps<Value> &
  SelectHTMLAttributes<HTMLSelectElement>

export const Select = <Value extends OptionValueType>({
  name,
  value,
  placeholder,
  options,
  disabled = false,
  required = false,
  label,
  error,
  help,
  onChange,
  ...props
}: SelectProps<Value>) => {
  const formFieldState = useFormFieldState()

  const hasHelp = !!help
  const isError = !!error

  return (
    <FormFieldContext.Provider
      value={{
        ...formFieldState,
        isDisabled: disabled,
        isError,
        isRequired: required,
      }}
    >
      {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}
      <Container position="relative">
        <BaseSelect
          id={formFieldState.inputId}
          name={name}
          value={value}
          disabled={disabled}
          required={required}
          aria-describedby={hasHelp ? formFieldState.descriptionId : undefined}
          aria-errormessage={isError ? formFieldState.errorId : undefined}
          aria-invalid={isError}
          onChange={onChange}
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
}

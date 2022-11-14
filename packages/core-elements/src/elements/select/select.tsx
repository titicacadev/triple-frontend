import { ChangeEventHandler } from 'react'
import styled from 'styled-components'
import { getColor } from '@titicaca/color-palette'

import {
  FormField,
  FormFieldError,
  FormFieldHelp,
  FormFieldLabel,
  useFormField,
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

export interface SelectOption<
  Value extends string | number | readonly string[],
> {
  label: string
  value: Value
}

interface SelectBaseProps<Value extends string | number | readonly string[]> {
  hasHelp: boolean
  name?: string
  value?: Value
  placeholder?: string
  options?: SelectOption<Value>[]
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

const SelectBase = <Value extends string | number | readonly string[]>({
  hasHelp,
  name,
  value,
  placeholder,
  options,
  onChange,
}: SelectBaseProps<Value>) => {
  const formField = useFormField()

  return (
    <Container position="relative">
      <BaseSelect
        id={formField.inputId}
        name={name}
        value={value}
        disabled={formField.isDisabled}
        required={formField.isRequired}
        aria-describedby={hasHelp ? formField.descriptionId : undefined}
        aria-errormessage={formField.isError ? formField.errorId : undefined}
        aria-invalid={formField.isError}
        onChange={onChange}
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
  )
}

export interface SelectProps<Value extends string | number | readonly string[]>
  extends Omit<SelectBaseProps<Value>, 'hasHelp'> {
  disabled?: boolean
  required?: boolean
  label?: string
  error?: string
  help?: string
}

export const Select = <Value extends string | number | readonly string[]>({
  name,
  value,
  placeholder,
  options,
  disabled,
  required,
  label,
  error,
  help,
  onChange,
}: SelectProps<Value>) => {
  return (
    <FormField isDisabled={disabled} isError={!!error} isRequired={required}>
      {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}
      <SelectBase
        hasHelp={!!help}
        name={name}
        value={value}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
      />
      {error ? (
        <FormFieldError>{error}</FormFieldError>
      ) : help ? (
        <FormFieldHelp>{help}</FormFieldHelp>
      ) : null}
    </FormField>
  )
}

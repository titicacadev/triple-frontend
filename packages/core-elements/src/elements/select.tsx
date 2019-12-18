import * as React from 'react'
import styled, { css } from 'styled-components'
import { withField } from '../utils/form-field'
import { GetGlobalColor } from '../commons'

interface SelectOption {
  label: string
  value: any
}

interface SelectProps {
  id?: string
  name?: string
  value?: any
  placeholder?: string
  options?: SelectOption[]
  focused?: string
  error?: string
  onBlur?: (e: React.FocusEvent<any>) => any
  onChange?: (e?: React.SyntheticEvent, value?: any) => any
}

const SelectFrame = styled.div<{ focused?: string; error?: string }>`
  padding: 14px 16px;
  border: 1px solid rgba(${GetGlobalColor('gray')}, 0.1);
  border-radius: 2px;
  position: relative;

  ${({ focused }) =>
    focused &&
    css`
      border-color: rgb(${GetGlobalColor('blue')});
    `};

  ${({ error }) =>
    error &&
    css`
      border-color: rgb(${GetGlobalColor('red')});
    `};
`

const BaseSelect = styled.select<{ selected?: boolean; error?: string }>`
  width: 100%;
  font-size: 16px;
  color: rgba(
    ${GetGlobalColor('gray')},
    ${({ selected }) => (selected ? 1 : 0.3)}
  );

  ${({ error }) =>
    error &&
    css`
      color: rgb(${GetGlobalColor('red')});
    `};
`

const Icon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  display: inline-block;
  width: 10px;
  height: 24px;
  background-size: 10px 24px;
  background-repeat: no-repeat;
  background-image: url('https://assets.triple.guide/images/ico-category-select@3x.png');
`

function Select({
  id,
  name,
  value,
  onChange,
  placeholder,
  options,
  focused,
  error,
  onBlur,
}: SelectProps) {
  return (
    <SelectFrame focused={focused} error={error}>
      <BaseSelect
        id={id}
        onChange={(e) => onChange(e, e.target.value)}
        onBlur={onBlur}
        value={value}
        error={error}
        name={name}
        selected={value !== null && value !== undefined && value !== ''}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map(({ label, value }, idx) => (
          <option key={idx} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
      <Icon />
    </SelectFrame>
  )
}

export default withField<SelectProps>(Select)

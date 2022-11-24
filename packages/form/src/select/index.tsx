import { SyntheticEvent, FocusEvent, SelectHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

import withField from '../with-field'
import ArrowDown from '../arrow-down'

interface SelectOption {
  label: string
  value: string | number
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id?: string
  value?: string
  placeholder?: string
  options?: SelectOption[]
  focused?: string
  error?: string
  onBlur?: (e: FocusEvent<unknown>) => void
  onChange?: (e?: SyntheticEvent, value?: string) => void
}

const SelectFrame = styled.div<{ focused?: string; error?: boolean }>`
  padding: 14px 16px;
  border: 1px solid var(--color-gray100);
  border-radius: 2px;
  position: relative;

  ${({ focused }) =>
    focused &&
    css`
      border-color: var(--color-blue);
    `};

  ${({ error }) =>
    error &&
    css`
      border-color: var(--color-red);
    `};
`

const BaseSelect = styled.select<{ selected?: boolean; error?: boolean }>`
  width: 100%;
  font-size: 16px;
  color: css(--color-gray);
  opacity: ${({ selected }) => (selected ? 1 : 0.3)};

  ${({ error }) =>
    error &&
    css`
      color: var(--color-red);
    `};
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
    <SelectFrame focused={focused} error={!!error}>
      <BaseSelect
        id={id}
        onChange={(e) => onChange && onChange(e, e.target.value)}
        onBlur={onBlur}
        value={value}
        error={!!error}
        name={name}
        selected={value !== null && value !== undefined && value !== ''}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {(options || []).map(({ label, value }, idx) => (
          <option key={idx} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
      <ArrowDown />
    </SelectFrame>
  )
}

export default withField(Select)

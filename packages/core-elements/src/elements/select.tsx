import * as React from 'react'
import styled, { css } from 'styled-components'
import { getColor } from '@titicaca/color-palette'

import { withField } from '../utils/form-field'

interface SelectOption {
  label: string
  value: any
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string
  value?: any
  placeholder?: string
  options?: SelectOption[]
  focused?: string
  error?: string | boolean
  onBlur?: (e: React.FocusEvent<any>) => any
  onChange?: (e?: React.SyntheticEvent, value?: any) => any
}

const SelectFrame = styled.div<{
  focused?: string
  error?: string | boolean
  disabled?: boolean
}>`
  border: 1px solid rgba(${getColor('gray100')});
  border-radius: 2px;
  position: relative;
  height: 48px;
  box-sizing: border-box;

  ${({ focused }) =>
    focused &&
    css`
      border-color: rgba(${getColor('blue')});
    `};

  ${({ error }) =>
    error &&
    css`
      border-color: rgba(${getColor('red')});
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: rgba(235, 235, 235, 1);
    `};
`

const BaseSelect = styled.select<{
  selected?: boolean
  error?: string | boolean
}>`
  width: 100%;
  height: 100%;
  text-indent: 16px;
  font-size: 16px;
  color: rgba(${getColor('gray')});

  ${({ error }) =>
    error &&
    css`
      color: rgba(${getColor('red')});
    `};
  &:disabled {
    color: rgba(${getColor('gray300')});
  }
`
const Icon = styled.span<{ disabled?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  display: inline-block;
  width: 10px;
  height: 100%;
  background-size: 10px 19px;
  background-repeat: no-repeat;
  background-image: url('https://assets.triple.guide/images/ico-category-select-on@3x.png');
  background-position: center center;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
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
  ...props
}: SelectProps) {
  return (
    <SelectFrame focused={focused} error={error} disabled={props.disabled}>
      <BaseSelect
        id={id}
        onChange={(e) => onChange && onChange(e, e.target.value)}
        onBlur={onBlur}
        value={value}
        error={error}
        name={name}
        selected={value !== null && value !== undefined && value !== ''}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {(options || []).map(({ label, value }, idx) => (
          <option key={idx} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
      <Icon disabled={props.disabled} />
    </SelectFrame>
  )
}

export default withField(Select)

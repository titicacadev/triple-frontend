import React from 'react'
import styled, { css } from 'styled-components'
import withField from '../utils/form-field'

const COLORS = {
  gray: '58, 58, 58',
  blue: '54, 143, 255',
  red: '255, 33, 60',
}

const SelectFrame = styled.div`
  padding: 15px;
  border: 1px solid rgba(${COLORS.gray}, 0.1);
  position: relative;

  ${({ focus }) =>
    focus &&
    css`
      border-color: rgb(${COLORS.blue});
    `};

  ${({ error }) =>
    error &&
    css`
      border-color: rgb(${COLORS.red});
    `};
`

const BaseSelect = styled.select`
  width: 100%;
  font-size: 16px;
  color: rgba(${COLORS.gray}, ${({ selected }) => (selected ? 1 : 0.3)});

  ${({ error }) =>
    error &&
    css`
      color: rgb(${COLORS.red});
    `};
`

const Icon = styled.span`
  position: absolute;
  right: 16px;
  display: inline-block;
  width: 10px;
  height: 24px;
  background-size: 10px 24px;
  background-repeat: no-repeat;
  background-image: url('https://assets.triple.guide/images/ico-category-select@3x.png');
`

function Select({
  name,
  value,
  onChange,
  placeholder,
  options = [],
  focus,
  error,
  onBlur,
}) {
  return (
    <SelectFrame focus={focus} error={error}>
      <BaseSelect
        onChange={(e) => onChange(e, e.target.value)}
        onBlur={onBlur}
        value={value}
        error={error}
        name={name}
      >
        <option value="">{placeholder}</option>
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

export default withField(Select)

import React from 'react'
import InputMask from 'react-input-mask'
import styled, { css } from 'styled-components'

const COLORS = {
  blue: '54, 143, 255',
  red: '255, 33, 60',
  gray: '58, 58, 58',
}

const Input = styled(InputMask)`
  padding: 0;
  margin: 0;
  outline: none;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid rgba(${COLORS.gray}, 0.1);
  border-radius: 2px;
  box-sizing: border-box;
  width: 100%;
  color: rgba(${COLORS.gray}, 0.3);

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

export default ({ name, value, placeholder, mask, onChange, ...props }) => {
  return (
    <Input
      name={name}
      mask={mask}
      maskChar={null}
      onChange={({ target: { name, value } }) => onChange(name, value)}
      placeholder={placeholder}
      {...props}
    />
  )
}

import React from 'react'
import InputMask from 'react-input-mask'
import styled, { css } from 'styled-components'

const Input = styled(InputMask)`
  padding: 0;
  margin: 0;
  outline: none;
  padding: 14px 16px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #efefef;
  border-radius: 2px;
  box-sizing: border-box;
  width: 100%;

  ${({ focus }) =>
    focus &&
    css`
      border-color: rgb(54, 143, 255);
    `};
`

export default ({ name, value, placeholder, mask, ...props }) => {
  return (
    <Input
      name={name}
      mask={mask}
      maskChar={null}
      placeholder={placeholder}
      {...props}
    />
  )
}

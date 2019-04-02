import React from 'react'
import styled, { css } from 'styled-components'
import Container from './container'

const ConfirmFrame = styled.div`
  width: ${({ width }) => width || 100}%;
  border: 1px solid #efefef;
  box-sizing: border-box;
  padding: 16px 59px 16px 16px;
  position: relative;
  font-size: 14px;
  font-weight: bold;

  ${({ checked }) =>
    checked &&
    css`
      border-color: rgb(54, 143, 255);
      color: rgb(54, 143, 255);

      & span {
        background-image: url('https://assets.triple.guide/images/btn-web-check-on@2x.png');
      }
    `};

  ${({ centered }) =>
    centered &&
    css`
      text-align: center;

      & > div {
        position: relative;
        display: inline-block;
        padding-left: 32px;
      }

      & span {
        left: 0;
        right: auto;
      }
    `};
`

const Icon = styled.span`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  display: inline-block;
  width: 29px;
  height: 29px;
  background-size: 29px 29px;
  background-repeat: no-repeat;
  background-image: url('https://assets.triple.guide/images/btn-web-check-off@2x.png');
`

function ConfirmBox({ name, value, placeholder, setFieldValue, ...props }) {
  return (
    <ConfirmFrame
      onClick={() => {
        setFieldValue(name, !value)
      }}
      checked={value}
      {...props}
    >
      <Container>
        {placeholder}
        <Icon />
      </Container>
    </ConfirmFrame>
  )
}

export default function CheckBox({ confirm, ...props }) {
  return confirm ? <ConfirmBox {...props} /> : null
}

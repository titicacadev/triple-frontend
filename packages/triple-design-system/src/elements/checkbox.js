import React from 'react'
import styled, { css } from 'styled-components'
import withField from '../utils/form-field'

const COLORS = {
  blue: '54, 143, 255',
  red: '255, 33, 60',
  gray: '58, 58, 58',
}

const ConfirmFrame = styled.div`
  width: ${({ width }) => width || 100}%;
  border: 1px solid #efefef;
  box-sizing: border-box;
  padding: 16px 59px 16px 16px;
  position: relative;
  font-size: 14px;
  font-weight: bold;
  color: rgba(${COLORS.gray}, 0.5);

  ${({ checked }) =>
    checked &&
    css`
      border-color: rgb(${COLORS.blue});
      color: rgb(${COLORS.blue});
    `};

  ${({ centered }) =>
    centered &&
    css`
      text-align: center;
    `};
`

const ConfirmContainer = styled.div`
  ${({ centered }) =>
    centered &&
    css`
      position: relative;
      display: inline-block;
      padding-left: 32px;

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

  ${({ checked }) =>
    checked &&
    css`
      background-image: url('https://assets.triple.guide/images/btn-web-check-on@2x.png');
    `};
`

export const ConfirmSelector = withField(
  ({ name, value, placeholder, onClick, centered }) => {
    return (
      <ConfirmFrame
        onClick={() => {
          onClick(name, !value)
        }}
        checked={value}
        centered={centered}
      >
        <ConfirmContainer centered={centered}>
          {placeholder}
          <Icon checked={value} />
        </ConfirmContainer>
      </ConfirmFrame>
    )
  },
)

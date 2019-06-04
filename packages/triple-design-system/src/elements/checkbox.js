import React from 'react'
import styled, { css } from 'styled-components'
import { withField } from '../utils/form-field'

const COLORS = {
  blue: '54, 143, 255',
  red: '255, 33, 60',
  gray: '58, 58, 58',
}

const FILLTYPES = {
  full: css`
    border-color: rgb(${COLORS.blue});
    color: rgb(${COLORS.blue});
  `,
  border: css`
    border-color: rgb(${COLORS.blue});
  `,
  text: css`
    color: rgb(${COLORS.blue});
  `,
}

const ConfirmFrame = styled.div`
  width: 100%;
  border: 1px solid #efefef;
  box-sizing: border-box;
  padding: 16px 59px 16px 16px;
  position: relative;
  font-size: 14px;
  font-weight: bold;
  color: rgba(${COLORS.gray}, 0.5);

  ${({ centered }) =>
    centered &&
    css`
      padding: 16px 0;
      text-align: center;
    `};

  ${({ borderless }) =>
    borderless &&
    css`
      padding: 16px 59px 16px 0;
      border: none;
    `};

  ${({ checked, fillType }) => checked && fillType && FILLTYPES[fillType]};
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
  right: ${({ borderless }) => (borderless ? 0 : 16)}px;
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
  ({ name, value, placeholder, onChange, centered, borderless, fillType }) => {
    return (
      <ConfirmFrame
        name={name}
        onClick={(e) => onChange(e, !value)}
        checked={value}
        centered={centered}
        borderless={borderless}
        fillType={fillType}
      >
        <ConfirmContainer centered={centered}>
          {placeholder}
          <Icon checked={value} borderless={borderless} />
        </ConfirmContainer>
      </ConfirmFrame>
    )
  },
)

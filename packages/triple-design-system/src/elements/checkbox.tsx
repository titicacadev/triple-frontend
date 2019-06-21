import * as React from 'react'
import styled, { css, InterpolationValue } from 'styled-components'
import { withField } from '../utils/form-field'
import { SetGlobalColor } from '../commons'

type FillType = 'full' | 'border' | 'text'

const FillTypes: { [key in FillType]: InterpolationValue[] } = {
  full: css`
    border-color: rgb(${SetGlobalColor('blue')});
    color: rgb(${SetGlobalColor('blue')});
  `,
  border: css`
    border-color: rgb(${SetGlobalColor('blue')});
  `,
  text: css`
    color: rgb(${SetGlobalColor('blue')});
  `,
}

const ConfirmFrame = styled.div.attrs<{ name?: string }>({})<{
  centered?: boolean
  borderless?: boolean
  checked?: boolean
  fillType?: FillType
}>`
  width: 100%;
  border: 1px solid #efefef;
  box-sizing: border-box;
  padding: 16px 59px 16px 16px;
  position: relative;
  font-size: 14px;
  font-weight: bold;
  color: rgba(${SetGlobalColor('gray')}, 0.5);

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

  ${({ checked, fillType }) => checked && fillType && FillTypes[fillType]};
`

const ConfirmContainer = styled.div<{ centered?: boolean }>`
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

const Icon = styled.span<{ borderless?: boolean; checked?: boolean }>`
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

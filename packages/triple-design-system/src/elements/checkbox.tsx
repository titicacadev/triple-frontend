import * as React from 'react'
import styled, { css, InterpolationValue } from 'styled-components'
import { withField } from '../utils/form-field'
import { GetGlobalColor } from '../commons'
import Text from './text'

type FillType = 'full' | 'border' | 'text'
type AlignType = 'left' | 'center' | 'right'

const FillTypes: { [key in FillType]: InterpolationValue[] } = {
  full: css`
    border-color: rgb(${GetGlobalColor('blue')});
    color: rgb(${GetGlobalColor('blue')});
  `,
  border: css`
    border-color: rgb(${GetGlobalColor('blue')});
  `,
  text: css`
    color: rgb(${GetGlobalColor('blue')});
  `,
}

const TextAligns: { [key in AlignType]: InterpolationValue[] } = {
  left: css`
    text-align: left;
  `,
  right: css`
    text-align: right;
  `,
  center: css`
    text-align: center;
    padding: 16px;

    & > div {
      position: relative;
      display: inline-block;
      padding-left: 35px;

      & > span {
        left: 0;
      }
    }
  `,
}

const ConfirmFrame = styled.div.attrs<{ name?: string }>({})<{
  textAlign?: string
  borderless?: boolean
  checked?: boolean
  fillType?: FillType
}>`
  width: 100%;
  border: 1px solid #efefef;
  box-sizing: border-box;
  padding: 16px 54px 16px 16px;
  position: relative;
  font-weight: bold;
  color: rgba(${GetGlobalColor('gray')}, 0.5);

  ${({ borderless }) =>
    borderless &&
    css`
      padding: 16px 59px 16px 0;
      border: none;
    `};

  ${({ checked, fillType }) => checked && fillType && FillTypes[fillType]};
  ${({ textAlign }) => textAlign && TextAligns[textAlign]};
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
  ({
    name,
    value,
    placeholder,
    onChange,
    textAlign = 'left',
    borderless,
    fillType,
    fontSize = 'small',
    color,
  }: {
    name?: string
    value: any
    placeholder: string
    onChange?: (e?: React.SyntheticEvent, value?: any) => any
    textAlign?: string
    borderless?: boolean
    fillType?: FillType
    fontSize?: string
    color?: string
  }) => {
    return (
      <ConfirmFrame
        name={name}
        onClick={(e) => onChange(e, !value)}
        checked={value}
        textAlign={textAlign}
        borderless={borderless}
        fillType={fillType}
      >
        <Text size={fontSize} color={color}>
          <Icon checked={value} borderless={borderless} />
          {placeholder}
        </Text>
      </ConfirmFrame>
    )
  },
)

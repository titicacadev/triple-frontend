import * as React from 'react'
import styled, { css, InterpolationValue } from 'styled-components'
import { withField } from '../utils/form-field'
import { GetGlobalColor } from '../commons'
import { MarginPadding } from '../commons'
import * as CSS from 'csstype'

type FillType = 'full' | 'border' | 'text'

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

const TextAligns: Partial<
  Record<CSS.TextAlignLastProperty, InterpolationValue[]>
> = {
  left: css`
    text-align: left;
  `,
  right: css`
    text-align: right;
  `,
}

const ConfirmFrame = styled.div.attrs<{ name?: string }>({})<{
  textAlign?: string
  borderless?: boolean
  checked?: boolean
  fillType?: FillType
  padding?: MarginPadding
}>`
  width: 100%;
  border: 1px solid #efefef;
  border-radius: 2px;
  box-sizing: border-box;
  position: relative;
  font-weight: bold;
  color: rgba(${GetGlobalColor('gray')}, 0.5);

  ${({ checked, fillType }) => checked && fillType && FillTypes[fillType]};
  ${({ textAlign }) => textAlign && TextAligns[textAlign]};

  ${({ borderless }) =>
    borderless &&
    css`
      border: none;
    `};

  ${({ padding }) =>
    padding &&
    css`
      padding-top: ${padding.top}px;
      padding-right: ${padding.right}px;
      padding-bottom: ${padding.bottom}px;
      padding-left: ${padding.left}px;
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
  ({
    name,
    value,
    children,
    onChange,
    textAlign = 'left',
    borderless,
    fillType,
    padding,
  }: {
    name?: string
    value: any
    placeholder: string
    onChange?: (e?: React.SyntheticEvent, value?: any) => any
    textAlign?: CSS.TextAlignProperty
    borderless?: boolean
    fillType?: FillType
    children?: React.ReactNode
    padding?: MarginPadding
  }) => {
    return (
      <ConfirmFrame
        name={name}
        onClick={(e) => onChange(e, !value)}
        checked={value}
        textAlign={textAlign}
        borderless={borderless}
        fillType={fillType}
        padding={padding}
      >
        {children}
        <Icon checked={value} borderless={borderless} />
      </ConfirmFrame>
    )
  },
)

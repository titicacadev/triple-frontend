import * as React from 'react'
import styled, { css } from 'styled-components'
import { ColorSet, Color } from '@titicaca/color-palette'

import Container from './container'
import { MarginPadding } from '../commons'
import { marginMixin } from '../mixins'

export type LabelColor = 'blue' | 'red' | 'purple' | 'gray' | 'green'

const LABEL_COLORS: {
  [key in LabelColor]: {
    background: string
    color: string
    emphasizedColor: string
    emphasizedBackground: string
    borderColor?: Color
  }
} = {
  blue: {
    background: ColorSet.blue100,
    color: ColorSet.blue,
    emphasizedColor: ColorSet.white,
    emphasizedBackground: ColorSet.blue,
  },
  red: {
    background: ColorSet.red100,
    color: ColorSet.red,
    emphasizedColor: ColorSet.white,
    emphasizedBackground: ColorSet.red,
  },
  purple: {
    background: ColorSet.purple100,
    color: ColorSet.purple,
    emphasizedColor: ColorSet.white,
    emphasizedBackground: ColorSet.purple,
  },
  gray: {
    background: ColorSet.gray50,
    color: ColorSet.gray700,
    emphasizedColor: ColorSet.white,
    emphasizedBackground: ColorSet.gray700,
  },
  green: {
    background: ColorSet.mint100,
    color: ColorSet.mint,
    emphasizedColor: ColorSet.white,
    emphasizedBackground: ColorSet.mint,
  },
}

interface RadioLabelProps {
  selected?: boolean
  margin?: MarginPadding
}

const RadioLabel = styled.div<RadioLabelProps>`
  display: inline-block;
  padding-left: 9px;
  font-size: 14px;
  line-height: 17px;
  color: ${({ selected }) => (selected ? '#3a3a3a' : 'rgba(58, 58, 58, 0.3)')};
  background-image: url(${({ selected }) =>
    `https://assets.triple.guide/images/img-search-select-${
      selected ? 'on' : 'off'
    }@4x.png`});
  background-size: 5px 5px;
  background-position: left center;
  background-repeat: no-repeat;
  cursor: pointer;

  ${marginMixin}
`

const PROMO_SIZES = {
  small: {
    fontSize: 11,
    borderRadius: 2,
    height: 20,
    padding: '0 6px',
  },
  medium: {
    fontSize: 12,
    borderRadius: 2,
    height: 26,
    padding: '0 10px',
  },
  large: {
    fontSize: 13,
    borderRadius: 4,
    height: 30,
    padding: '0 13px',
  },
}

interface PromoLabelProps {
  size?: keyof typeof PROMO_SIZES
  emphasized?: boolean
  color?: LabelColor
  margin?: MarginPadding
}

export const PromoLabel = styled.div<PromoLabelProps>`
  display: inline-block;
  ${marginMixin}

  ${({ size = 'small' }) => {
    const { padding, borderRadius, height, fontSize } = PROMO_SIZES[
      size || 'small'
    ]
    return `
      padding: ${padding};
      border-radius: ${borderRadius}px;
      line-height: ${height}px;
      height: ${height}px;
      font-size: ${fontSize}px;
   `
  }}

  ${({ emphasized }) =>
    emphasized
      ? css<Pick<PromoLabelProps, 'color'>>`
          font-weight: bold;
          ${({ color = 'purple' }) => {
            const { emphasizedColor, emphasizedBackground } = LABEL_COLORS[
              color
            ]
            return css`
              background-color: ${emphasizedBackground};
              color: ${emphasizedColor};
            `
          }}
        `
      : css<Pick<PromoLabelProps, 'color'>>`
          font-weight: normal;
          ${({ color = 'purple' }) => {
            const { color: textColor, background } = LABEL_COLORS[color]
            return css`
              background-color: ${background};
              color: ${textColor};
            `
          }}
        `};
`

interface LabelProps extends PromoLabelProps, RadioLabelProps {
  radio?: boolean
  promo?: boolean
  children?: React.ReactNode
}

const LabelGroup = styled(Container)<{ horizontalGap?: number }>`
  div:not(:first-child) {
    ${({ horizontalGap }) => css`
      margin-left: ${horizontalGap || 0}px;
    `};
  }
`
export default class Label extends React.PureComponent<
  LabelProps,
  React.HTMLAttributes<HTMLElement>
> {
  static Group = LabelGroup

  render() {
    const {
      props: {
        radio,
        selected,
        margin,
        children,
        promo,
        size,
        emphasized,
        color,
        ...props
      },
    } = this

    if (radio) {
      return (
        <RadioLabel {...props} selected={selected} margin={margin}>
          {children}
        </RadioLabel>
      )
    } else if (promo) {
      return (
        <PromoLabel
          {...props}
          size={size}
          emphasized={emphasized}
          color={color}
          margin={margin}
        >
          {children}
        </PromoLabel>
      )
    } else {
      return children
    }
  }
}

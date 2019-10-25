import * as React from 'react'
import styled, { css } from 'styled-components'
import Container from './container'
import {
  GetGlobalColor,
  GlobalColors,
  MarginPadding,
  GlobalSizes,
} from '../commons'

export type LabelColor = GlobalColors | 'purple'

type Color = (number | string)[]

const LABEL_COLORS: Partial<
  Record<LabelColor, { background: Color; text: Color }>
> = {
  blue: {
    background: GetGlobalColor('blue')
      .split(', ')
      .concat('0.1'),
    text: GetGlobalColor('blue')
      .split(', ')
      .concat('1'),
  },
  red: {
    background: [253, 46, 105, 0.1],
    text: [253, 46, 105, 1],
  },
  purple: {
    background: [151, 95, 255, 0.1],
    text: [151, 95, 255, 1],
  },
  gray: {
    background: [58, 58, 58, 0.05],
    text: [58, 58, 58, 0.7],
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

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};
`

const PROMO_SIZES: Partial<
  Record<
    GlobalSizes,
    { fontSize: number; borderRadius: number; height: number; padding: string }
  >
> = {
  small: {
    fontSize: 11,
    borderRadius: 1,
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
  size?: GlobalSizes
  emphasized?: boolean
  color?: LabelColor
  margin?: MarginPadding
}

export const PromoLabel = styled.div<PromoLabelProps>`
  display: inline-block;

  padding: ${({ size }) => PROMO_SIZES[size || 'small'].padding};
  border-radius: ${({ size }) => PROMO_SIZES[size || 'small'].borderRadius}px;
  line-height: ${({ size }) => PROMO_SIZES[size || 'small'].height}px;
  height: ${({ size }) => PROMO_SIZES[size || 'small'].height}px;
  font-size: ${({ size }) => PROMO_SIZES[size || 'small'].fontSize}px;

  ${({ emphasized }) =>
    emphasized
      ? css`
          font-weight: bold;
          background-color: rgba(
            ${({ color }) =>
              LABEL_COLORS[color].background.slice(0, 3).join(',')},
            1
          );
          color: white;
        `
      : css`
          font-weight: normal;
          ${({ color }) => {
            const {
              [color]: { background, text },
            } = LABEL_COLORS
            return css`
              background-color: rgba(${background.join(',')});
              color: rgba(${text.join(',')});
            `
          }}
        `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
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
          color={color || 'purple'}
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

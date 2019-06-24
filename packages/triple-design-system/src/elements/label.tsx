import * as React from 'react'
import styled, { css } from 'styled-components'
import Container from './container'
import {
  SetGlobalColor,
  GlobalColors,
  MarginPadding,
  GlobalSizes,
} from '../commons'

type labelColor = GlobalColors | 'purple'

const SetLabelColors: Partial<Record<labelColor, string>> = {
  blue: SetGlobalColor('blue'),
  red: SetGlobalColor('red'),
  purple: '151, 95, 255',
}

function rgba({ color, alpha }: { color?: labelColor; alpha?: number }) {
  return `rgba(${SetLabelColors[color || 'purple']}, ${alpha || 1})`
}

const RadioLabel = styled.div<{ selected?: boolean; margin?: MarginPadding }>`
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
}

export const PromoLabel = styled.div<{
  size?: GlobalSizes
  emphasized?: boolean
  color?: labelColor
  margin?: MarginPadding
}>`
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
          background-color: ${({ color }) => rgba({ color, alpha: 1 })};
          color: white;
        `
      : css`
          font-weight: normal;
          background-color: ${({ color }) => rgba({ color, alpha: 0.1 })};
          color: ${({ color }) => rgba({ color, alpha: 1 })};
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

function Label({
  radio,
  promo,
  children,
  ...props
}: {
  radio?: boolean
  promo?: boolean
  children?: React.ReactNode
}) {
  if (radio) {
    return <RadioLabel {...props}>{children}</RadioLabel>
  } else if (promo) {
    return <PromoLabel {...props}>{children}</PromoLabel>
  }

  return children
}

const LabelGroup = styled(Container)<{ horizontalGap?: number }>`
  div:not(:first-child) {
    ${({ horizontalGap }) => css`
      margin-left: ${horizontalGap || 0}px;
    `};
  }
`

Label.Group = LabelGroup

export default Label

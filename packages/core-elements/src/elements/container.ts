import styled, { StyledComponentProps } from 'styled-components'
import { Color, getColor } from '@titicaca/color-palette'
import * as CSS from 'csstype'

import { MarginPadding, BaseSizes } from '../commons'
import {
  paddingMixin,
  formatMarginPadding,
  shadowMixin,
  positioningMixin,
  borderRadiusMixin,
} from '../mixins'
import { unit } from '../utils/unit'

export interface ContainerPropsFromTemplate
  extends Pick<
    CSS.Properties,
    | 'position'
    | 'textAlign'
    | 'whiteSpace'
    | 'userSelect'
    | 'display'
    | 'cursor'
  > {
  centered?: boolean
  margin?: MarginPadding
  padding?: MarginPadding
  positioning?: MarginPadding
  width?: number | string
  height?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  maxHeight?: number | string

  borderRadius?: number
  clearing?: boolean
  floated?: CSS.Property.Float
  horizontalScroll?: boolean
  shadow?: BaseSizes
  backgroundColor?: Color
}

export type ContainerProps = StyledComponentProps<
  'div',
  any,
  ContainerPropsFromTemplate,
  never
>

const Container = styled.div<ContainerPropsFromTemplate>`
  box-sizing: border-box;

  ${({ position }) =>
    position &&
    `
      position: ${position};
    `};

  ${({ backgroundColor }) =>
    backgroundColor && `background-color: rgba(${getColor(backgroundColor)});`}

  ${({ centered, margin = {} }) =>
    formatMarginPadding(
      { ...margin, ...(centered ? { left: 'auto', right: 'auto' } : {}) },
      'margin',
    )}

  ${paddingMixin}

  ${({ width }) =>
    width &&
    `
      width: ${unit(width)};
    `};

  ${({ height }) =>
    height &&
    `
      height: ${unit(height)};
    `};

  ${({ minWidth }) =>
    minWidth &&
    `
     min-width: ${unit(minWidth)};
    `};

  ${({ maxWidth }) =>
    maxWidth &&
    `
    max-width: ${unit(maxWidth)};
    `};

  ${({ minHeight }) =>
    minHeight &&
    `
      min-height: ${unit(minHeight)};
    `};

  ${({ maxHeight }) =>
    maxHeight &&
    `
      max-height: ${unit(maxHeight)};
    `};

  float: ${({ floated }) => floated || 'none'};

  ${({ textAlign }) =>
    textAlign &&
    `
      text-align: ${textAlign};
    `};

  ${({ clearing }) =>
    clearing &&
    `
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    `};

  ${({ whiteSpace }) =>
    whiteSpace &&
    `
      white-space: ${whiteSpace};
    `};

  ${({ userSelect }) =>
    userSelect &&
    `
      -webkit-user-select: ${userSelect};
      user-select: ${userSelect};
    `}

  ${({ display }) =>
    display &&
    `
      display: ${display};
    `}

  ${({ horizontalScroll }) =>
    horizontalScroll &&
    `
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
    `}

  ${({ cursor }) =>
    cursor &&
    `
      cursor: ${cursor};
    `}

  ${shadowMixin}
  ${positioningMixin}
  ${borderRadiusMixin}
`

export default Container

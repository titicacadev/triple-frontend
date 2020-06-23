import styled, { StyledComponentProps } from 'styled-components'
import { Color } from '@titicaca/color-palette'
import * as CSS from 'csstype'

import { MarginPadding, BaseSizes } from '../commons'
import { paddingMixin, formatMarginPadding, shadowMixin } from '../mixins'

export interface ContainerPropsFromTemplate {
  position?: CSS.PositionProperty
  centered?: boolean
  margin?: MarginPadding
  padding?: MarginPadding
  width?: number | string
  height?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  floated?: CSS.FloatProperty
  textAlign?: CSS.TextAlignProperty
  borderRadius?: number
  clearing?: boolean
  whiteSpace?: CSS.WhiteSpaceProperty
  userSelect?: CSS.UserSelectProperty
  display?: CSS.DisplayProperty
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
    backgroundColor && `background-color: ${backgroundColor};`}

  ${({ centered, margin = {} }) =>
    formatMarginPadding(
      { ...margin, ...(centered ? { left: 'auto', right: 'auto' } : {}) },
      'margin',
    )}

  ${paddingMixin}

  ${({ width }) =>
    width &&
    `
      width: ${typeof width === 'string' ? width : `${width}px`};
    `};

  ${({ height }) =>
    height &&
    `
      height: ${typeof height === 'string' ? height : `${height}px`};
    `};

  ${({ minWidth }) =>
    minWidth &&
    `
     min-width: ${typeof minWidth === 'string' ? minWidth : `${minWidth}px`};
    `};

  ${({ maxWidth }) =>
    maxWidth &&
    `
    max-width: ${typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`};
    `};

  ${({ minHeight }) =>
    minHeight &&
    `
      min-height: ${
        typeof minHeight === 'string' ? minHeight : `${minHeight}px`
      };
    `};

  ${({ maxHeight }) =>
    maxHeight &&
    `
      max-height: ${
        typeof maxHeight === 'string' ? maxHeight : `${maxHeight}px`
      };
    `};

  float: ${({ floated }) => floated || 'none'};

  ${({ textAlign }) =>
    textAlign &&
    `
      text-align: ${textAlign};
    `};

  ${({ borderRadius }) =>
    borderRadius &&
    `
      border-radius: ${borderRadius}px;
      overflow: hidden;
      -webkit-mask-image: -webkit-radial-gradient(white, black);
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
      -user-select: ${userSelect};
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

  ${shadowMixin}
`

export default Container

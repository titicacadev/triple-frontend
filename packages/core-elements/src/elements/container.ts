import styled, { css, StyledComponentProps } from 'styled-components'
import * as CSS from 'csstype'
import { MarginPadding } from '../commons'
import { paddingMixin, formatMarginPadding } from '../mixins'

export interface ContainerPropsFromTemplate {
  position?: CSS.PositionProperty
  centered?: boolean
  margin?: MarginPadding
  padding?: MarginPadding
  width?: number
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  floated?: CSS.FloatProperty
  textAlign?: CSS.TextAlignProperty
  borderRadius?: number
  clearing?: boolean
  whiteSpace?: CSS.WhiteSpaceProperty
  userSelect?: CSS.UserSelectProperty
  display?: CSS.DisplayProperty
  horizontalScroll?: boolean
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
    css`
      position: ${position};
    `};

  ${({ centered, margin = {} }) =>
    formatMarginPadding(
      { ...margin, ...(centered ? { left: 'auto', right: 'auto' } : {}) },
      'margin',
    )}

  ${paddingMixin}

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `};

  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth}px;
    `};

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth}px;
    `};

  ${({ minHeight }) =>
    minHeight &&
    css`
      min-height: ${minHeight}px;
    `};

  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight}px;
    `};

  float: ${({ floated }) => floated || 'none'};

  ${({ textAlign }) =>
    textAlign &&
    css`
      text-align: ${textAlign};
    `};

  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}px;
      overflow: hidden;
      -webkit-mask-image: -webkit-radial-gradient(white, black);
    `};

  ${({ clearing }) =>
    clearing &&
    css`
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    `};

  ${({ whiteSpace }) =>
    whiteSpace &&
    css`
      white-space: ${whiteSpace};
    `};

  ${({ userSelect }) =>
    userSelect &&
    css`
      -webkit-user-select: ${userSelect};
      -user-select: ${userSelect};
    `}

  ${({ display }) =>
    display &&
    css`
      display: ${display};
    `}  

  ${({ horizontalScroll }) =>
    horizontalScroll &&
    css`
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
    `}  
`

export default Container

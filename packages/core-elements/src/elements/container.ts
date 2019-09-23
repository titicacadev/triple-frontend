import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import { MarginPadding } from '../commons'

// eslint-disable-next-line no-unexpected-multiline
const Container = styled.div<{
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
}>`
  box-sizing: border-box;

  ${({ position }) =>
    position &&
    css`
      position: ${position};
    `};

  ${({ centered, margin }) =>
    (margin || centered) &&
    css`
      margin-top: ${(margin || {}).top || 0}px;
      margin-bottom: ${(margin || {}).bottom || 0}px;
      margin-left: ${centered
        ? 'auto'
        : margin.left
        ? `${margin.left}px`
        : '0px'};
      margin-right: ${centered
        ? 'auto'
        : margin.right
        ? `${margin.right}px`
        : '0px'};
    `};

  ${({ padding }) =>
    padding &&
    css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `};

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
`

export default Container

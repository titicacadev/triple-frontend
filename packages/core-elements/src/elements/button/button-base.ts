import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import { Color } from '@titicaca/color-palette'

import { GlobalSizes, MarginPadding, GetGlobalColor } from '../../commons'
import { marginMixin } from '../../mixins'
import { unit } from '../../utils/unit'

export interface ButtonBaseProp {
  size?: GlobalSizes
  bold?: boolean
  textColor?: Color
  textAlpha?: number
  floated?: CSS.Property.Float
  fluid?: boolean
  margin?: MarginPadding
  disabled?: boolean
  lineHeight?: number | string
}

const SIZES: Partial<Record<GlobalSizes, ReturnType<typeof css>>> = {
  tiny: css`
    font-size: 13px;
    line-height: 16px;
  `,
  small: css`
    font-size: 14px;
    line-height: 17px;
  `,
  large: css`
    font-size: 16px;
  `,
}

const ButtonBase = styled.a<ButtonBaseProp>`
  display: inline-block;
  ${({ size }) => (size ? SIZES[size] : '')}
  font-weight: ${({ bold }) => (bold ? 'bold' : 500)};
  text-align: center;
  text-decoration: none;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  border: 0;

  color: ${({ textColor = 'gray', textAlpha = 1 }) =>
    `rgba(${GetGlobalColor(textColor)}, ${textAlpha})`};

  float: ${({ floated }) => floated || 'none'};

  ${({ lineHeight }) =>
    lineHeight &&
    css`
      line-height: ${unit(lineHeight)};
    `};

  ${({ fluid }) =>
    fluid &&
    css`
      width: 100%;
      display: block;
    `};

  ${marginMixin}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
    `};
`

export default ButtonBase

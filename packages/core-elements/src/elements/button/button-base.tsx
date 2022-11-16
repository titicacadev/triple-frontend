import { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { Property } from 'csstype'
import { Color } from '@titicaca/color-palette'

import { GetGlobalColor, MarginPadding } from '../../commons'
import { unit } from '../../utils/unit'
import { marginMixin } from '../../mixins'

import { ButtonSize } from './types'

const SIZES: Record<ButtonSize, ReturnType<typeof css>> = {
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

export interface ButtonBaseProps extends PropsWithChildren {
  bold?: boolean
  floated?: Property.Float
  fluid?: boolean
  size?: ButtonSize
  margin?: MarginPadding
  lineHeight?: number | string
  textAlpha?: number
  textColor?: Color
}

export const ButtonBase = styled.button<ButtonBaseProps>`
  display: inline-block;
  color: ${({ textColor = 'gray', textAlpha = 1 }) =>
    `rgba(${GetGlobalColor(textColor)}, ${textAlpha}) `};
  float: ${({ floated }) => floated || 'none'};
  font-weight: ${({ bold }) => (bold ? 'bold' : 500)};
  text-align: center;

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

  ${({ size = 'tiny' }) => SIZES[size]}

  &:disabled {
    opacity: 0.3;
  }
`

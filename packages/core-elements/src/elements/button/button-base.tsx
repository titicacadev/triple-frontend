import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
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

export interface ButtonBaseOwnProps {
  /**
   * Basic 및 Normal 버튼에서는 항상 `true` 입니다.
   */
  bold?: boolean
  floated?: Property.Float
  /**
   * 버튼이 전체 너비 영역을 차지합니다.
   */
  fluid?: boolean
  /**
   * 버튼 사이즈
   */
  size?: ButtonSize
  margin?: MarginPadding
  lineHeight?: number | string
  textAlpha?: number
  textColor?: Color
}

export type ButtonBaseProps = ButtonBaseOwnProps &
  PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>

export const buttonBaseMixin = ({
  bold,
  floated = 'none',
  fluid,
  size = 'tiny',
  lineHeight,
  textAlpha = 1,
  textColor = 'gray',
}: ButtonBaseOwnProps) => css`
  display: inline-block;
  color: rgba(${GetGlobalColor(textColor)}, ${textAlpha});
  float: ${floated};
  font-weight: ${bold ? 'bold' : 500};
  text-align: center;

  ${lineHeight &&
  css`
    line-height: ${unit(lineHeight)};
  `};

  ${fluid &&
  css`
    width: 100%;
    display: block;
  `};

  ${marginMixin}

  ${SIZES[size]}

  &:disabled {
    opacity: 0.3;
  }
`

export const ButtonBase = styled.button.attrs<ButtonBaseProps>((props) => ({
  /* stylelint-disable-next-line property-no-unknown */
  type: props.type ?? 'button',
}))<ButtonBaseProps>(buttonBaseMixin)

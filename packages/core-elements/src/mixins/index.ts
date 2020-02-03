import { css } from 'styled-components'
import { MarginPadding } from './../commons'
import { unit } from '../utils/unit'

export * from './text-style'

export function formatMarginPadding(
  marginPadding: MarginPadding | undefined,
  key: 'margin' | 'padding',
) {
  if (!marginPadding) {
    return ''
  }

  return css`
    ${key}: ${unit(marginPadding.top || 0)} ${unit(marginPadding.right || 0)}
      ${unit(marginPadding.bottom || 0)} ${unit(marginPadding.left || 0)};
  `
}

export const marginMixin = css<{ margin?: MarginPadding }>`
  ${({ margin }) => formatMarginPadding(margin, 'margin')}
`

export const paddingMixin = css<{ padding?: MarginPadding }>`
  ${({ padding }) => formatMarginPadding(padding, 'padding')}
`

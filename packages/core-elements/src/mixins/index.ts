import { css } from 'styled-components'
import { MarginPadding } from './../commons'

const unit = (value: number | string, suffix = 'px') =>
  typeof value === 'string' ? value : value !== 0 ? `${value}${suffix}` : value

export function formatMarginPadding(
  marginPadding: MarginPadding | undefined,
  key: 'margin' | 'padding',
) {
  if (!marginPadding) {
    return ''
  }

  return css`
    ${marginPadding.top && `${key}-top: ${unit(marginPadding.top)};`}
    ${marginPadding.right && `${key}-right: ${unit(marginPadding.right)};`}
    ${marginPadding.bottom && `${key}-bottom: ${unit(marginPadding.bottom)};`}
    ${marginPadding.left && `${key}-left: ${unit(marginPadding.left)};`}
`
}

export const marginMixin = css<{ margin?: MarginPadding }>`
  ${({ margin }) => formatMarginPadding(margin, 'margin')}
`

export const paddingMixin = css<{ padding?: MarginPadding }>`
  ${({ padding }) => formatMarginPadding(padding, 'padding')}
`

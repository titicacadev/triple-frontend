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

export const safeAreaInsetMixin = css<{
  padding?: MarginPadding
}>`
  @supports (padding: env(safe-area-inset-bottom)) {
    ${({ padding }) => {
      const paddingBottom = unit((padding || {}).bottom || 0) || '0px' // HACK: 0 대신 0px로 넣어줘야 calc가 정상작동한다

      return `padding-bottom: calc(env(safe-area-inset-bottom) + ${paddingBottom});`
    }}
  }
`

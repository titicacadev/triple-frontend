import { css, RuleSet } from 'styled-components'

import { MarginPadding } from '../types'

export const padding: (defaultValue?: MarginPadding) => RuleSet<{
  padding?: MarginPadding
}> = (defaultValue) => css<{
  padding?: MarginPadding
}>`
  ${({ padding }) => {
    const value =
      defaultValue || padding
        ? {
            ...(defaultValue || {}),
            ...(padding || {}),
          }
        : null

    return value
      ? `
        ${value.top ? `padding-top: ${value.top}px;` : ''}
        ${value.right ? `padding-right: ${value.right}px;` : ''}
        ${value.bottom ? `padding-bottom: ${value.bottom}px;` : ''}
        ${value.left ? `padding-left: ${value.left}px;` : ''}
      `
      : ''
  }}
`

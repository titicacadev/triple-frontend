import { css, BaseThemedCssFunction } from 'styled-components'

import { MarginPadding } from '../types'

export const margin: (defaultValue?: MarginPadding) => ReturnType<
  BaseThemedCssFunction<{
    padding?: MarginPadding
  }>
> = (defaultValue) => css<{
  margin?: MarginPadding
}>`
  ${({ margin }) => {
    const value =
      defaultValue || margin
        ? {
            ...(defaultValue || {}),
            ...(margin || {}),
          }
        : null

    return value
      ? `
        ${value.top ? `margin-top: ${value.top}px;` : ''}
        ${value.right ? `margin-right: ${value.right}px;` : ''}
        ${value.bottom ? `margin-bottom: ${value.bottom}px;` : ''}
        ${value.left ? `margin-left: ${value.left}px;` : ''}
      `
      : ''
  }}
`

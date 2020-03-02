import { css } from 'styled-components'
import { MarginPadding } from '../types'

export const margin = (defaultValue?: MarginPadding) => css`
  ${({ margin }: { margin?: MarginPadding }) => {
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

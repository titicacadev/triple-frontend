import { css } from 'styled-components'

import { Height } from '../types'

export const height = (defaultValue?: Height) => css<{
  height?: Height
  unit?: string
}>`
  ${({ height = defaultValue, unit = 'px' }) => {
    return height
      ? `
      height: ${height}${unit};
      `
      : ''
  }}
`

export const maxHeight = (defaultValue?: Height) => css<{
  maxHeight?: Height
  unit?: string
}>`
  ${({ maxHeight = defaultValue, unit = 'px' }) => {
    return maxHeight
      ? `
        max-height: ${maxHeight}${unit};
        `
      : ''
  }}
`

export const minHeight = (defaultValue?: Height) => css<{
  minHeight?: Height
  unit?: string
}>`
  ${({ minHeight = defaultValue, unit = 'px' }) => {
    return minHeight
      ? `
          min-height: ${minHeight}${unit};
          `
      : ''
  }}
`

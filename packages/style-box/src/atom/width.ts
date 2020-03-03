import { css } from 'styled-components'
import { Width } from '../types'

export const width = (defaultValue?: Width) => css<{
  width?: Width
  unit?: string
}>`
  ${({ width = defaultValue, unit = 'px' }) => {
    return width
      ? `
      width: ${width}${unit};
      `
      : ''
  }}
`

export const maxWidth = (defaultValue?: Width) => css<{
  maxWidth?: Width
  unit?: string
}>`
  ${({ maxWidth = defaultValue, unit = 'px' }) => {
    return maxWidth
      ? `
        max-width: ${maxWidth}${unit};
        `
      : ''
  }}
`

export const minWidth = (defaultValue?: Width) => css<{
  minWidth?: Width
  unit?: string
}>`
  ${({ minWidth = defaultValue, unit = 'px' }) => {
    return minWidth
      ? `
          min-width: ${minWidth}${unit};
          `
      : ''
  }}
`

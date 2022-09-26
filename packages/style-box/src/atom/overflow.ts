import { css } from 'styled-components'

import { Overflow } from '../types'

export const overflow = (defaultValue?: Overflow) => css<{
  overflow?: Overflow
}>`
  ${({ overflow = defaultValue }) => {
    return overflow
      ? `
        overflow: ${overflow};
        `
      : ''
  }}
`

export const overflowX = (defaultValue?: Overflow) => css<{
  overflowX?: Overflow
}>`
  ${({ overflowX = defaultValue }) => {
    return overflowX
      ? `
        overflow-x: ${overflowX};
        `
      : ''
  }}
`

export const overflowY = (defaultValue?: Overflow) => css<{
  overflowY?: Overflow
}>`
  ${({ overflowY = defaultValue }) => {
    return overflowY
      ? `
        overflow-x: ${overflowY};
        `
      : ''
  }}
`

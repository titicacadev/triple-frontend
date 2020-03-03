import { css } from 'styled-components'
import CSS from 'csstype'

export const overflow = (defaultValue?: CSS.OverflowProperty) => css<{
  overflow?: CSS.OverflowProperty
}>`
  ${({ overflow = defaultValue }) => {
    return overflow
      ? `
        overflow: ${overflow};
        `
      : ''
  }}
`

export const overflowX = (defaultValue?: CSS.OverflowProperty) => css<{
  overflowX?: CSS.OverflowProperty
}>`
  ${({ overflowX = defaultValue }) => {
    return overflowX
      ? `
        overflow-x: ${overflowX};
        `
      : ''
  }}
`

export const overflowY = (defaultValue?: CSS.OverflowProperty) => css<{
  overflowY?: CSS.OverflowProperty
}>`
  ${({ overflowY = defaultValue }) => {
    return overflowY
      ? `
        overflow-x: ${overflowY};
        `
      : ''
  }}
`

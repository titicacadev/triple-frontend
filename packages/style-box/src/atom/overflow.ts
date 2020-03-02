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

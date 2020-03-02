import { css } from 'styled-components'
import CSS from 'csstype'

export const whiteSpace = (defaultValue?: CSS.WhiteSpaceProperty) => css<{
  whiteSpace?: CSS.DisplayProperty
}>`
  ${({ whiteSpace = defaultValue }) => {
    return whiteSpace
      ? `
        white-space: ${whiteSpace};
        `
      : ''
  }}
`

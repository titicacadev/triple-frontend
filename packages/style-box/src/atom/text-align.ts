import { css } from 'styled-components'
import CSS from 'csstype'

export const textAlign = (defaultValue?: CSS.TextAlignProperty) => css<{
  textAlign?: CSS.TextAlignProperty
}>`
  ${({ textAlign = defaultValue }) => {
    return textAlign
      ? `
      text-align: ${textAlign};
      `
      : ''
  }}
`

import { css } from 'styled-components'
import CSS from 'csstype'

export const boxSizing = (defaultValue?: CSS.BoxSizingProperty) => css<{
  boxSizing?: CSS.BoxSizingProperty
}>`
  ${({ boxSizing = defaultValue }) => {
    return boxSizing
      ? `
        box-sizing: ${boxSizing};
        `
      : ''
  }}
`

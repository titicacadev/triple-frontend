import { css } from 'styled-components'
import CSS from 'csstype'

export const display = (defaultValue?: CSS.DisplayProperty) => css<{
  display?: CSS.DisplayProperty
}>`
  ${({ display = defaultValue }) => {
    return display
      ? `
        display: ${display};
        `
      : ''
  }}
`

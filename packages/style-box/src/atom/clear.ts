import { css } from 'styled-components'
import CSS from 'csstype'

export const clear = (defaultValue?: CSS.ClearProperty) => css<{
  clear?: CSS.ClearProperty
}>`
  ${({ clear = defaultValue }) => {
    return clear
      ? `
        clear: ${clear};
        `
      : ''
  }}
`

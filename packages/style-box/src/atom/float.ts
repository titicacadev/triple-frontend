import { css } from 'styled-components'
import CSS from 'csstype'

export const float = (defaultValue?: CSS.FloatProperty) => css<{
  float?: CSS.FloatProperty
}>`
  ${({ float = defaultValue }) => {
    return float
      ? `
        float: ${float}
        `
      : ''
  }}
`

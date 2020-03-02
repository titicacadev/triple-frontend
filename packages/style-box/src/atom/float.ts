import { css } from 'styled-components'
import CSS from 'csstype'

export const float = (defaultValue?: CSS.FloatProperty) => css<{
  float?: boolean
}>`
  ${({ float = defaultValue }) => {
    return float
      ? `
        float: ${float}
        `
      : ''
  }}
`

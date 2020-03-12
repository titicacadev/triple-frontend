import { css } from 'styled-components'

import { Float } from '../types'

export const float = (defaultValue?: Float) => css<{
  float?: Float
}>`
  ${({ float = defaultValue }) => {
    return float
      ? `
        float: ${float}
        `
      : ''
  }}
`

import { css } from 'styled-components'

import { Float } from '../types'

export const floated = (defaultValue?: Float) => css<{
  floated?: Float
}>`
  ${({ floated = defaultValue }) => {
    return floated
      ? `
        float: ${floated}
        `
      : ''
  }}
`

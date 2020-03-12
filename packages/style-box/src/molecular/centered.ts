import { css } from 'styled-components'

import { Centered } from '../types'

export const centered = (defaultValue?: Centered) => css<{
  centered?: Centered
}>`
  ${({ centered = defaultValue }) => {
    return centered
      ? `
        margin: 0 auto;
        `
      : ''
  }}
`

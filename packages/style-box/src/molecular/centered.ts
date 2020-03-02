import { css } from 'styled-components'

import { margin } from '../atom/margin'
import { Centered } from '../types'

export const centered = (defaultValue?: Centered) => css<{
  centered?: Centered
}>`
  ${({ centered = defaultValue }) => {
    return centered
      ? `
        ${margin({ left: 'auto', right: 'auto' })}
        `
      : ''
  }}
`

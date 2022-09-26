import { css } from 'styled-components'

import { Clear } from '../types'

export const clear = (defaultValue?: Clear) => css<{
  clear?: Clear
}>`
  ${({ clear = defaultValue }) => {
    return clear
      ? `
        clear: ${clear};
        `
      : ''
  }}
`

import { css } from 'styled-components'

import { BorderRadius } from '../types'

export const borderRadius = (defaultValue?: BorderRadius) => css<{
  borderRadius?: BorderRadius
}>`
  ${({ borderRadius = defaultValue }) => {
    return borderRadius
      ? `
        border-radius: ${borderRadius}px;
        overflow:hidden;
        `
      : ''
  }}
`

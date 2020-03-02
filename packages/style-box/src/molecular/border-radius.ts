import { css } from 'styled-components'

import { BorderRadius } from '../types'
import { overflow } from '../atom/overflow'

export const borderRadius = (defaultValue?: BorderRadius) => css<{
  borderRadius?: BorderRadius
}>`
  ${({ borderRadius = defaultValue }) => {
    return borderRadius
      ? `
        border-radius: ${borderRadius}px;
        ${overflow('hidden')}
        -webkit-mask-image: -webkit-radial-gradient(white, black);
        `
      : ''
  }}
`

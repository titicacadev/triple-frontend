import { css } from 'styled-components'

import { WhiteSpace } from '../types'

export const whiteSpace = (defaultValue?: WhiteSpace) => css<{
  whiteSpace?: WhiteSpace
}>`
  ${({ whiteSpace = defaultValue }) => {
    return whiteSpace
      ? `
        white-space: ${whiteSpace};
        `
      : ''
  }}
`

import { css } from 'styled-components'

import { BoxSizing } from '../types'

export const boxSizing = (defaultValue?: BoxSizing) => css<{
  boxSizing?: BoxSizing
}>`
  ${({ boxSizing = defaultValue }) => {
    return boxSizing
      ? `
        box-sizing: ${boxSizing};
        `
      : ''
  }}
`

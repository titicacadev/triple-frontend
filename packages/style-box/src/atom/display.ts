import { css } from 'styled-components'

import { Display } from '../types'

export const display = (defaultValue?: Display) => css<{
  display?: Display
}>`
  ${({ display = defaultValue }) => {
    return display
      ? `
        display: ${display};
        `
      : ''
  }}
`

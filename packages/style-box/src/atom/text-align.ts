import { css } from 'styled-components'

import { TextAlign } from '../types'

export const textAlign = (defaultValue?: TextAlign) => css<{
  textAlign?: TextAlign
}>`
  ${({ textAlign = defaultValue }) => {
    return textAlign
      ? `
      text-align: ${textAlign};
      `
      : ''
  }}
`

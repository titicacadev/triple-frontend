import { css } from 'styled-components'
import { Ellipsis } from '../types'

export const ellipsis = (defaultValue?: Ellipsis) => css<{
  ellipsis?: Ellipsis
}>`
  ${({ ellipsis = defaultValue }) =>
    ellipsis &&
    `
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
  `}
`

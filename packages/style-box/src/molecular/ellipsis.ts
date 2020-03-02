import { css } from 'styled-components'
import { Ellipsis } from '../types'

export const ellipsis = (defaultValue?: Ellipsis) => css`
  ${({ ellipsis }: { ellipsis?: Ellipsis }) =>
    (ellipsis || defaultValue) &&
    `
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
  `}
`

import { css } from 'styled-components'

import { HorizontalScroll } from '../types'

export const horizontalScroll = (defaultValue?: HorizontalScroll) => css<{
  horizontalScroll?: HorizontalScroll
}>`
  ${({ horizontalScroll = defaultValue }) => {
    return horizontalScroll
      ? `
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
        `
      : ''
  }}
`

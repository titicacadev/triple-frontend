import { css } from 'styled-components'

import { whiteSpace } from '../atom/white-space'
import { overflowX, overflowY } from '../atom/overflow'
import { HorizontalScroll } from '../types'

export const horizontalScroll = (defaultValue?: HorizontalScroll) => css<{
  horizontalScroll?: HorizontalScroll
}>`
  ${({ horizontalScroll = defaultValue }) => {
    return horizontalScroll
      ? `
        ${whiteSpace('nowrap')}
        ${overflowX('auto')}
        ${overflowY('hidden')}
        `
      : ''
  }}
`

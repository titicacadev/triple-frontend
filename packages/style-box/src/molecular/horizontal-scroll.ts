import { css } from 'styled-components'
import { whiteSpace } from '../atom/white-space'
import { overflow } from '../atom/overflow'

export const horizontalScroll = (defaultValue?: boolean) => css<{
  horizontalScroll?: boolean
}>`
  ${({ horizontalScroll = defaultValue }) => {
    return horizontalScroll
      ? `
        ${whiteSpace('nowrap')}
        ${overflow('auto hidden')}
        `
      : ''
  }}
`

import { css } from 'styled-components'
import { margin } from '../atom/margin'

export const centered = (defaultValue?: Centered) => css<{
  centered?: Centered
}>`
  ${({ centered = defaultValue }) => {
    return centered
      ? `
        ${margin({ left: 'auto', right: 'auto' })}
        `
      : ''
  }}
`

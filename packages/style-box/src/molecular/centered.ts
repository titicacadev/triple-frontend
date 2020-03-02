import { css } from 'styled-components'
import { margin } from '../atom/margin'

export const centered = (defaultValue?: boolean) => css<{
  centered?: boolean
}>`
  ${({ centered = defaultValue }) => {
    return centered
      ? `
        ${margin({ left: 'auto', right: 'auto' })}
        `
      : ''
  }}
`

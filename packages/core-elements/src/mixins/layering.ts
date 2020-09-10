import { css } from 'styled-components'

export const layeringMixin = (defaultTier: number) => css<{
  zTier?: number
  zIndex?: number
}>`
  z-index: ${({ zTier = defaultTier, zIndex = 0 }) =>
    (zTier || defaultTier) * 100 + zIndex};
`

import { css } from 'styled-components'

export interface LayeringMixinProps {
  zTier?: number
  zIndex?: number
}

export const layeringMixin = (defaultTier: number) => css<LayeringMixinProps>`
  z-index: ${({ zTier = defaultTier, zIndex = 0 }) => zTier * 100 + zIndex};
`

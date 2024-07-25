import { css } from 'styled-components'

export interface LayeringMixinProps {
  zTier?: number
  zIndex?: number
}

export const layeringMixin =
  (defaultTier: number) =>
  ({ zIndex = defaultTier, zTier = 0 }: LayeringMixinProps) => css`
    z-index: ${zTier * 100 + zIndex};
  `

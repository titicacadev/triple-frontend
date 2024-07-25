import { PropsWithChildren } from 'react'
import { styled, css } from 'styled-components'

import { shouldForwardProp } from '../../utils/should-forward-prop'

export type ResponsiveProps = PropsWithChildren<{
  inline?: boolean
  maxWidth?: number
  minWidth?: number
}>

export const Responsive = styled.div.withConfig({
  shouldForwardProp,
})<ResponsiveProps>`
  display: ${({ inline }) => (inline ? 'inline' : 'block')};

  ${({ minWidth }) =>
    minWidth &&
    css`
      @media (max-width: ${minWidth - 1}px) {
        display: none;
      }
    `}

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      @media (min-width: ${maxWidth + 1}px) {
        display: none;
      }
    `}
`

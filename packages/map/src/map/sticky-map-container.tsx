import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'

export const StickyMapContainer = styled(Container)<{
  top: number
}>`
  position: sticky;
  top: ${({ top }) => `${top}px`};
  background-color: #ffffff;
  z-index: 3;
`

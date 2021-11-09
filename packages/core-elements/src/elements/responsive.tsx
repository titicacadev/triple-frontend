import styled, { css } from 'styled-components'

export type ResponsiveProps = React.PropsWithChildren<{
  inline?: boolean
  maxWidth?: number
  minWidth?: number
}>

const Responsive = styled.div<ResponsiveProps>`
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

export default Responsive

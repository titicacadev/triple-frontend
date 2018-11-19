import styled, { css } from 'styled-components'

const Responsive = styled.div`
  display: ${({ inline }) => (inline ? 'inline' : 'block')};
  ${({ maxWidth, minWidth }) =>
    minWidth && maxWidth
      ? css`
          @media (max-width: ${minWidth - 1}px) and (min-width: ${maxWidth +
              1}px) {
            display: none;
          }
        `
      : minWidth
        ? css`
            @media (max-width: ${minWidth - 1}px) {
              display: none;
            }
          `
        : maxWidth
          ? css`
              @media (min-width: ${maxWidth + 1}px) {
                display: none;
              }
            `
          : ''};
`

export default Responsive

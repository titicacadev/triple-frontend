import styled, { css } from 'styled-components'

export const Segment = styled.div`
  padding: 20px;
  border-radius: 6px;
  background-color: #fafafa;

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

  ${({ padding }) =>
    padding &&
    css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `};

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

export default Segment

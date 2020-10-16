import styled, { css } from 'styled-components'

const TabLabel = styled.div<{ active?: boolean; scroll?: boolean }>`
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;

  ${({ scroll }) =>
    !scroll &&
    css`
      display: table-cell;
      padding: 11px 0;
    `};
`

export default TabLabel

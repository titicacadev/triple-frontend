import styled, { css } from 'styled-components'

const TabContainer = styled.div<{
  active?: boolean
  scroll?: boolean
}>`
  position: relative;
  white-space: nowrap;
  ${({ scroll }) =>
    scroll
      ? css`
          overflow-x: scroll;
          -webkit-overflow-scrolling: touch;
          cursor: pointer;

          ::-webkit-scrollbar {
            display: none;
          }
        `
      : css`
          display: table;
          width: 100%;
          table-layout: fixed;
        `};
`

export default TabContainer

import { Children, ReactNode } from 'react'
import styled, { css } from 'styled-components'

export const ModalActions = styled.div<{ children?: ReactNode }>`
  display: block;
  width: 100%;
  height: 50px;
  border-top-style: solid;
  border-width: 1px;
  border-color: #f5f5f5;

  a {
    ${({ children }) => {
      const childrenCount = Children.count(children)

      return css`
        width: calc((100% - ${childrenCount - 1}px) / ${childrenCount});
      `
    }};

    padding-left: 0;
    padding-right: 0;
  }

  a:not(:first-child) {
    border-width: 1px;
    border-left-style: solid;
    border-color: #f5f5f5;
  }
`

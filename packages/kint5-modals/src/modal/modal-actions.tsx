import { Children, ReactNode } from 'react'
import styled, { css } from 'styled-components'

export const ModalActions = styled.div<{ children?: ReactNode }>`
  display: flex;
  width: 100%;
  background-color: var(--color-kint5-gray20);
  border-top: 0.5px solid var(--color-kint5-gray40);
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;

  a {
    ${({ children }) => {
      const childrenCount = Children.count(children)
      return css`
        width: calc((100% - ${0.5 * (childrenCount - 1)}px) / ${childrenCount});
      `
    }};
  }

  a:not(:first-child) {
    border-left: 0.5px solid var(--color-kint5-gray40);
  }
`

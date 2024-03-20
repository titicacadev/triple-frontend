import { ReactNode } from 'react'
import styled from 'styled-components'

export const ModalActions = styled.div<{ children?: ReactNode }>`
  display: flex;
  width: 100%;
  background-color: var(--color-kint5-gray20);
  border-top: 0.5px solid var(--color-kint5-gray40);
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;

  a {
    flex: 1 0 0;
  }

  a:not(:first-child) {
    border-left: 0.5px solid var(--color-kint5-gray40);
  }
`

import * as React from 'react'
import styled, { css } from 'styled-components'

const DrawerContainer = styled.div<{ active?: boolean; overflow?: string }>`
  z-index: 20;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: ${({ overflow }) => overflow || 'hidden'};
  transform: translateY(100%);
  transition: all 300ms ease-in-out;

  ${({ active }) =>
    active &&
    css`
      transform: translateY(0%);
      transition: all 300ms ease-in-out;
    `};
`

export default function Drawer({ active, overflow, children }) {
  return (
    <DrawerContainer active={active} overflow={overflow}>
      {children}
    </DrawerContainer>
  )
}

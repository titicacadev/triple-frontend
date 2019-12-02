import * as React from 'react'
import styled, { css } from 'styled-components'

const DrawerContainer = styled.div<{
  active?: boolean
  overflow?: string
  zIndex?: number
}>`
  z-index: ${({ zIndex }) => (Number.isInteger(zIndex) ? zIndex : 20)};
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

export default function Drawer({
  active,
  overflow,
  zIndex,
  children,
}: {
  active?: boolean
  overflow?: string
  zIndex?: number
  children?: React.ReactNode
}) {
  return (
    <DrawerContainer active={active} overflow={overflow} zIndex={zIndex}>
      {children}
    </DrawerContainer>
  )
}

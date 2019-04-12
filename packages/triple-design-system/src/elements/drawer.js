import React from 'react'
import styled, { css } from 'styled-components'

const DrawerContainer = styled.div`
  z-index: 20;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background: #fff;
  transform: translateY(100%);
  transition: all 300ms ease-in-out;

  ${({ active }) =>
    active &&
    css`
      transform: translateY(0%);
      transition: all 300ms ease-in-out;
    `};
`

export default function Drawer({ active, children }) {
  return <DrawerContainer active={active}>{children}</DrawerContainer>
}

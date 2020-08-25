import * as React from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

const TRANSITION_DURATION = 300

interface DrawerContainerProps {
  overflow?: string
  zIndex?: number
  duration: number
}

const inactiveDrawerStyle = `
  transform: translateY(100%);
`

const activeDrawerStyle = `
  transform: translateY(0%);
`

const drawerTransitionConfig = `
  transition: transform ${TRANSITION_DURATION}ms ease-in-out;
`

const DrawerContainer = styled.div<DrawerContainerProps>`
  z-index: ${({ zIndex }) =>
    zIndex && Number.isInteger(zIndex) ? zIndex : 20};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: ${({ overflow }) => overflow || 'hidden'};

  ${inactiveDrawerStyle}

  &.drawer-slide-appear,
  &.drawer-slide-enter {
    ${inactiveDrawerStyle}
  }

  &.drawer-slide-appear-active,
  &.drawer-slide-enter-active {
    ${activeDrawerStyle}
    ${drawerTransitionConfig}
  }

  &.drawer-slide-enter-done {
    ${activeDrawerStyle}
  }

  &.drawer-slide-exit {
    ${activeDrawerStyle}
  }

  &.drawer-slide-exit-active {
    ${inactiveDrawerStyle}
    ${drawerTransitionConfig}
  }

  &.drawer-slide-exit-done {
    ${inactiveDrawerStyle}
  }
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
    <CSSTransition
      in={active}
      appear
      classNames="drawer-slide"
      timeout={TRANSITION_DURATION}
    >
      <DrawerContainer
        duration={TRANSITION_DURATION}
        overflow={overflow}
        zIndex={zIndex}
      >
        {children}
      </DrawerContainer>
    </CSSTransition>
  )
}

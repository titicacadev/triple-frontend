import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import { ReactNode, useRef } from 'react'

import { layeringMixin, LayeringMixinProps } from '../mixins'

import Container from './container'

const TRANSITION_DURATION = 300

interface DrawerContainerProps {
  overflow?: string
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

const DrawerContainer = styled.div<DrawerContainerProps & LayeringMixinProps>`
  ${layeringMixin(1)}
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: ${({ overflow }) => overflow || 'hidden'};

  &:not([class*='drawer-slide-']) {
    ${inactiveDrawerStyle}
    display: none;
  }

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
    display: none;
  }
`

export default function Drawer({
  active,
  overflow,
  children,
  zTier,
  zIndex,
  unmountOnExit,
}: {
  active?: boolean
  overflow?: string
  unmountOnExit?: boolean
  children?: ReactNode
} & LayeringMixinProps) {
  const drawerContainerRef = useRef<HTMLDivElement>(null)

  return (
    <CSSTransition
      nodeRef={drawerContainerRef}
      in={active}
      appear
      classNames="drawer-slide"
      timeout={TRANSITION_DURATION}
      mountOnEnter={unmountOnExit}
      unmountOnExit={unmountOnExit}
    >
      <DrawerContainer
        ref={drawerContainerRef}
        duration={TRANSITION_DURATION}
        overflow={overflow}
        zTier={zTier}
        zIndex={zIndex}
      >
        <Container maxWidth={768} centered>
          {children}
        </Container>
      </DrawerContainer>
    </CSSTransition>
  )
}

import styled from 'styled-components'
import { Transition, TransitionStatus } from 'react-transition-group'
import { TransitionProps } from 'react-transition-group/Transition'
import { CSSProperties, PropsWithChildren, useRef } from 'react'
import { Portal } from '@headlessui/react'

import { Container } from '../container'

const TRANSITION_DURATION = 300

interface DrawerContainerProps {
  overflow?: string
  duration: number
}

const DrawerContainer = styled.div<DrawerContainerProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: ${({ overflow }) => overflow || 'hidden'};
  z-index: 9999;
  transition: transform ${TRANSITION_DURATION}ms ease-in-out;
  transform: 'translateY(100%)';
`

const transitionStyles: Record<TransitionStatus, CSSProperties> = {
  entering: {
    transform: 'translateY(0%)',
  },
  entered: {
    transform: 'translateY(0%)',
  },
  exiting: {
    transform: 'translateY(100%)',
  },
  exited: {
    transform: 'translateY(100%)',
  },
  unmounted: {},
}

export interface DrawerProps
  extends PropsWithChildren,
    Pick<
      TransitionProps,
      | 'onEnter'
      | 'onEntering'
      | 'onEntered'
      | 'onExit'
      | 'onExiting'
      | 'onExited'
    > {
  active?: boolean
  overflow?: string
}

export function Drawer({
  active,
  overflow,
  children,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
}: DrawerProps) {
  const drawerContainerRef = useRef(null)

  return (
    <Transition
      nodeRef={drawerContainerRef}
      in={active}
      appear
      timeout={TRANSITION_DURATION}
      mountOnEnter
      unmountOnExit
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      {(transitionStatus) => (
        <Portal>
          <DrawerContainer
            ref={drawerContainerRef}
            duration={TRANSITION_DURATION}
            overflow={overflow}
            style={{
              ...transitionStyles[transitionStatus],
            }}
          >
            <Container
              centered
              css={{
                maxWidth: 768,
              }}
            >
              {children}
            </Container>
          </DrawerContainer>
        </Portal>
      )}
    </Transition>
  )
}

import styled from 'styled-components'
import { Fragment, PropsWithChildren } from 'react'
import { Portal, Transition } from '@headlessui/react'

import { FlexBox } from '../flex-box'

const TRANSITION_DURATION = 300

interface DrawerContainerProps {
  overflow?: string
  duration: number
}

const DrawerContainer = styled.div<DrawerContainerProps>`
  position: fixed;
  max-width: 768px;
  width: 100%;
  bottom: 0;
  overflow: ${({ overflow }) => overflow || 'hidden'};
  z-index: 9999;

  &.enter,
  &.leave {
    transition: transform ${({ duration }) => duration}ms ease-in-out;
  }

  &.enter-from,
  &.leave-to {
    transform: translateY(100%);
  }

  &.enter-to,
  &.leave-from {
    transform: translateY(0);
  }
`

export interface DrawerProps extends PropsWithChildren {
  active?: boolean
  duration?: number
  overflow?: string
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
}

/**
 * Drawer
 */
export function Drawer({
  active,
  duration = TRANSITION_DURATION,
  overflow,
  children,
  onEnter,
  onEntered,
  onExit,
  onExited,
}: DrawerProps) {
  return (
    <Transition
      show={active}
      appear
      as={Fragment}
      beforeEnter={onEnter}
      afterEnter={onEntered}
      beforeLeave={onExit}
      afterLeave={onExited}
    >
      <div>
        <Portal>
          <FlexBox flex justifyContent="center">
            <Transition.Child
              as={Fragment}
              enter="enter"
              enterFrom="enter-from"
              enterTo="enter-to"
              leave="leave"
              leaveFrom="leave-from"
              leaveTo="leave-to"
            >
              <DrawerContainer duration={duration} overflow={overflow}>
                {children}
              </DrawerContainer>
            </Transition.Child>
          </FlexBox>
        </Portal>
      </div>
    </Transition>
  )
}

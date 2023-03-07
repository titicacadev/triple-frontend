import styled from 'styled-components'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

export const Overlay = styled.div<{ duration: number }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  background-color: rgba(58, 58, 58, 0.7);
  z-index: 9999;

  &.enter,
  &.leave {
    transition: opacity ${({ duration }) => duration}ms ease-in;
  }

  &.enter-from,
  &.leave-to {
    opacity: 0;
  }

  &.enter-to,
  &.leave-from {
    opacity: 1;
  }
`

export interface ActionSheetOverlayProps {
  duration: number
}

export const ActionSheetOverlay = ({ duration }: ActionSheetOverlayProps) => {
  return (
    <Transition.Child
      as={Fragment}
      enter="enter"
      enterFrom="enter-from"
      enterTo="enter-to"
      leave="leave"
      leaveFrom="leave-from"
      leaveTo="leave-to"
    >
      <Overlay duration={duration} />
    </Transition.Child>
  )
}

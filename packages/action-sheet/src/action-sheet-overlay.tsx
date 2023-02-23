import { CSSProperties } from 'react'
import { TransitionStatus } from 'react-transition-group'
import styled from 'styled-components'

import { useActionSheet } from './action-sheet-context'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  background-color: rgba(58, 58, 58, 0.7);
  z-index: 9999;
`

const transitionStyles: Record<TransitionStatus, CSSProperties> = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
  exiting: {
    opacity: 0,
  },
  exited: {
    opacity: 0,
  },
  unmounted: {},
}

export interface ActionSheetOverlayProps {
  duration: number
}

export const ActionSheetOverlay = ({ duration }: ActionSheetOverlayProps) => {
  const { transitionStatus } = useActionSheet()

  return (
    <Overlay
      style={{
        transition: `opacity ${duration}ms ease-in`,
        opacity: 0,
        ...transitionStyles[transitionStatus],
      }}
    />
  )
}

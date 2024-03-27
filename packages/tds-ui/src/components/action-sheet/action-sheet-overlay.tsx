import styled from 'styled-components'
import { FloatingOverlay } from '@floating-ui/react'

import { TRANSITION_DURATION } from './constants'

export const Overlay = styled(FloatingOverlay)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  background-color: rgba(58, 58, 58, 0.7);
  z-index: 9999;
  transition: opacity ${TRANSITION_DURATION}ms ease-in;
  opacity: 0;

  &[data-transition='open'] {
    opacity: 1;
  }
`

export interface ActionSheetOverlayProps {
  transitionStatus: string
}

export const ActionSheetOverlay = ({
  transitionStatus,
}: ActionSheetOverlayProps) => {
  return <Overlay lockScroll data-transition={transitionStatus} />
}

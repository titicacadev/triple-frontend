import { useEffect } from 'react'
import styled from 'styled-components'
import { FloatingOverlay, useTransitionStatus } from '@floating-ui/react'

export const Overlay = styled(FloatingOverlay)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 58, 58, 0.7);
  z-index: 9999;
`

export interface ActionSheetOverlayProps {
  transitionStatus: ReturnType<typeof useTransitionStatus>['status']
}

export const ModalOverlay = ({ transitionStatus }: ActionSheetOverlayProps) => {
  useEffect(() => {
    const bodyStyle = document.body.style
    if (transitionStatus === 'open') {
      bodyStyle.overflow = 'hidden'
    }

    if (transitionStatus === 'close') {
      bodyStyle.overflow = ''
    }
  }, [transitionStatus])

  return <Overlay data-transition={transitionStatus} />
}

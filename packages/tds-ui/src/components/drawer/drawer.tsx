import { styled } from 'styled-components'
import { PropsWithChildren, useEffect } from 'react'
import {
  FloatingPortal,
  useFloating,
  useTransitionStatus,
} from '@floating-ui/react'

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
  transition: transform ${({ duration }) => duration}ms ease-in-out;
  transform: translateY(100%);

  &[data-transition='open'] {
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

export function Drawer({
  active,
  duration = TRANSITION_DURATION,
  overflow,
  children,
  onEnter,
  onEntered,
  onExit,
  onExited,
  ...props
}: DrawerProps) {
  const { context, refs } = useFloating({
    open: active,
  })

  const { isMounted, status } = useTransitionStatus(context, {
    duration,
  })

  useEffect(() => {
    if (status === 'open') {
      onEnter?.()
      const timeout = setTimeout(() => onEntered?.(), TRANSITION_DURATION)
      return () => clearTimeout(timeout)
    } else if (status === 'close') {
      onExit?.()
      const timeout = setTimeout(() => onExited?.(), TRANSITION_DURATION)
      return () => clearTimeout(timeout)
    }
  }, [onEnter, onEntered, onExit, onExited, status])

  if (!isMounted) {
    return null
  }

  return (
    <FloatingPortal preserveTabOrder={false}>
      <FlexBox flex justifyContent="center">
        <DrawerContainer
          ref={refs.setFloating}
          duration={duration}
          overflow={overflow}
          data-transition={status}
          {...props}
        >
          {children}
        </DrawerContainer>
      </FlexBox>
    </FloatingPortal>
  )
}

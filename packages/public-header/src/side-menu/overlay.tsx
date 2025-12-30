import { PropsWithChildren, useEffect } from 'react'
import styled from 'styled-components'
import { Container } from '@titicaca/core-elements'
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react'

const TRANSITION_DURATION = 300
const SIDE_BAR_WIDTH = 325

const StyledFloatingOverlay = styled(FloatingOverlay)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 58, 58, 0.5);
  z-index: 9999;
`

const SideBarContainer = styled(Container)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  max-width: ${SIDE_BAR_WIDTH}px;
  width: ${SIDE_BAR_WIDTH}px;
  background-color: #fff;
  user-select: none;
  z-index: 9999;
  outline: none;

  @media (max-width: ${SIDE_BAR_WIDTH}px) {
    width: 100%;
  }

  @supports (padding: env(safe-area-inset-bottom)) {
    padding-bottom: env(safe-area-inset-bottom);
  }

  &::-webkit-scrollbar {
    display: none;
  }

  transition: transform ${TRANSITION_DURATION}ms ease-out;
  transform: translateX(100%);

  &[data-transition='open'] {
    transform: translateX(0);
  }
`

export interface SideMenuOverlayProps extends PropsWithChildren {
  open: boolean
  onClose?: () => void
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
}

export function SideMenuOverlay({
  open = false,
  children,
  onClose,
  onEnter,
  onEntered,
  onExit,
  onExited,
  ...props
}: SideMenuOverlayProps) {
  const { context, refs } = useFloating({
    open,
    onOpenChange: (open) => (open ? undefined : onClose?.()),
  })

  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'menu' })

  const { getFloatingProps } = useInteractions([dismiss, role])

  const { isMounted, status } = useTransitionStatus(context, {
    duration: TRANSITION_DURATION,
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
    <FloatingPortal>
      <StyledFloatingOverlay lockScroll />
      <FloatingFocusManager context={context} initialFocus={refs.floating}>
        <SideBarContainer
          id="side-menu-container"
          ref={refs.setFloating}
          data-transition={status}
          aria-modal
          {...getFloatingProps(props)}
        >
          {children}
        </SideBarContainer>
      </FloatingFocusManager>
    </FloatingPortal>
  )
}

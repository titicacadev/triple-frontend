import { PropsWithChildren, useEffect } from 'react'
import styled from 'styled-components'
import { Navbar, Text } from '@titicaca/kint5-core-elements'
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

type NavbarIcon = 'close' | 'back'

const TRANSITION_DURATION = 300

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  user-select: none;
  z-index: 9999;
  outline: none;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @supports (padding: env(safe-area-inset-bottom)) {
    padding-bottom: env(safe-area-inset-bottom);
  }

  &::-webkit-scrollbar {
    display: none;
  }

  transition: transform ${TRANSITION_DURATION}ms ease-out;
  transform: translateY(100%);

  &[data-transition='open'] {
    transform: translateY(0);
  }
`

export interface PopupProps extends PropsWithChildren {
  /**
   * 팝업을 열지 결정합니다.
   */
  open: boolean
  /** Navbar의 제목입니다. */
  title?: string
  icon?: NavbarIcon
  /**
   * Navbar의 렌더링을 생략할 수 있도록 합니다.
   */
  noNavbar?: boolean
  /**
   * 닫기 버튼을 눌렀을 때의 이벤트 입니다.
   */
  onClose: () => void
  onEnter?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExited?: () => void
}

/**
 * 밑에서 올라오는 팝업입니다.
 */
export function Popup({
  open = false,
  icon = 'close',
  title,
  noNavbar,
  children,
  onClose,
  onEnter,
  onEntered,
  onExit,
  onExited,
  ...props
}: PopupProps) {
  const { context, refs } = useFloating({
    open,
    onOpenChange: (open) => (open ? undefined : onClose?.()),
  })

  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })

  const { getFloatingProps } = useInteractions([dismiss, role])

  const { isMounted, status } = useTransitionStatus(context, {
    duration: TRANSITION_DURATION,
  })

  useEffect(() => {
    const bodyStyle = document.body.style
    const isRendered = !!document.getElementById(context.floatingId)

    if (!isRendered) {
      return
    }

    if (status === 'open') {
      bodyStyle.overflow = 'hidden'
    }

    if (status === 'close') {
      bodyStyle.overflow = ''
    }

    return () => {
      // 팝업이 열린 상태에서 unmount되는 경우를 처리합니다.
      // (e.g. 팝업이 열린 상태에서 다른 페이지로 이동)
      if (status === 'open') {
        bodyStyle.overflow = ''
      }
    }
  }, [status, context])

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
      <FloatingOverlay />
      <FloatingFocusManager context={context} initialFocus={refs.floating}>
        <PopupContainer
          ref={refs.setFloating}
          data-transition={status}
          aria-modal
          {...getFloatingProps(props)}
        >
          {noNavbar ? null : (
            <Navbar
              leftButtonIconType={icon}
              onLeftButtonClick={onClose}
              centerContent={
                <Text css={{ fontSize: 14, fontWeight: 700 }}>{title}</Text>
              }
              css={{
                backgroundColor: 'var(--color-kint5-gray0)',
                zIndex: 3,
              }}
            />
          )}
          {children}
        </PopupContainer>
      </FloatingFocusManager>
    </FloatingPortal>
  )
}

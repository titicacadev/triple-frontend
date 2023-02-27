import { PropsWithChildren, useRef, CSSProperties } from 'react'
import styled from 'styled-components'
import { Navbar } from '@titicaca/core-elements'
import { Dialog } from '@headlessui/react'
import { Transition, TransitionStatus } from 'react-transition-group'

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

  transition: transform ${TRANSITION_DURATION}ms ease-out;
  transform: translateY(100%);

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @supports (padding: env(safe-area-inset-bottom)) {
    padding-bottom: env(safe-area-inset-bottom);
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const transitionStyles: Record<TransitionStatus, CSSProperties> = {
  entering: {
    transform: 'translateY(0)',
  },
  entered: {
    transform: 'translateY(0)',
  },
  exiting: {
    opacity: 'translateY(100%)',
  },
  exited: {
    opacity: 'translateY(100%)',
  },
  unmounted: {},
}

/**
 * 밑에서 올라오는 팝업입니다.
 */
function Popup({
  open = false,
  borderless = false,
  onClose,
  icon = 'close',
  title,
  noNavbar,
  children,
  ...props
}: PropsWithChildren<{
  /**
   * 팝업을 열지 결정합니다.
   */
  open: boolean
  /**
   * 닫기 버튼을 눌렀을 때의 이벤트 입니다.
   */
  onClose: () => void
  /**
   * Navbar의 border를 그릴지 결정합니다.
   */
  borderless?: boolean
  /** Navbar의 제목입니다. */
  title?: string
  icon?: NavbarIcon
  /**
   * Navbar의 렌더링을 생략할 수 있도록 합니다.
   */
  noNavbar?: boolean
}>) {
  const ref = useRef(null)
  const panelRef = useRef(null)

  return (
    <Transition
      in={open}
      nodeRef={ref}
      timeout={TRANSITION_DURATION}
      appear
      mountOnEnter
      unmountOnExit
    >
      {(transitionStatus) => (
        <Dialog
          ref={ref}
          initialFocus={panelRef}
          static
          open={open}
          onClose={() => onClose?.()}
        >
          <Dialog.Panel
            as={PopupContainer}
            ref={panelRef}
            tabIndex={-1}
            style={{
              ...transitionStyles[transitionStatus],
            }}
            {...props}
          >
            <PopupContainer>
              {noNavbar ? null : (
                <Navbar borderless={borderless} title={title}>
                  <Navbar.Item floated="left" icon={icon} onClick={onClose} />
                </Navbar>
              )}
              {children}
            </PopupContainer>
          </Dialog.Panel>
        </Dialog>
      )}
    </Transition>
  )
}

export default Popup

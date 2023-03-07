import { PropsWithChildren, useRef, Fragment } from 'react'
import styled from 'styled-components'
import { Navbar } from '@titicaca/core-elements'
import { Dialog, Transition } from '@headlessui/react'

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

  &.enter,
  &.leave {
    transition: transform ${TRANSITION_DURATION}ms ease-in;
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

export interface PopupProps extends PropsWithChildren {
  /**
   * 팝업을 열지 결정합니다.
   */
  open: boolean
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
function Popup({
  open = false,
  borderless = false,
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
  const ref = useRef(null)
  const panelRef = useRef(null)

  return (
    <Transition
      show={open}
      as={Fragment}
      beforeEnter={onEnter}
      afterEnter={onEntered}
      beforeLeave={onExit}
      afterLeave={onExited}
    >
      <Dialog
        ref={ref}
        initialFocus={panelRef}
        static
        onClose={() => onClose?.()}
      >
        <Transition.Child
          as={Fragment}
          enter="enter"
          enterFrom="enter-from"
          enterTo="enter-to"
          leave="leave"
          leaveFrom="leave-from"
          leaveTo="leave-to"
        >
          <Dialog.Panel
            as={PopupContainer}
            ref={panelRef}
            tabIndex={-1}
            {...props}
          >
            {noNavbar ? null : (
              <Navbar borderless={borderless} title={title}>
                <Navbar.Item floated="left" icon={icon} onClick={onClose} />
              </Navbar>
            )}
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Popup

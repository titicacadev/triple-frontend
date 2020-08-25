import React, {
  SyntheticEvent,
  PropsWithChildren,
  useRef,
  useEffect,
} from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { Navbar } from '@titicaca/core-elements'

type NavbarIcon = 'close' | 'back'

const TRANSITION_DURATION = 300

const inactivePopupContainerStyle = `
  transform: translateY(100%);
`

const activePopupContainerStyle = `
  transform: translateY(0);
`

const popupContainerTransitionConfig = `
  transition: transform ${TRANSITION_DURATION}ms ease-out;
`

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 10;
  user-select: none;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  padding-bottom: 13px;

  @supports (padding: max(0px)) and (padding: env(safe-area-inset-bottom)) {
    padding-bottom: max(13px, calc(env(safe-area-inset-bottom) + 17px));
  }
  &::-webkit-scrollbar {
    display: none;
  }

  &:not([class*='fade-']) {
    ${inactivePopupContainerStyle}
    display: none;
  }

  &.fade-appear,
  &.fade-enter {
    ${inactivePopupContainerStyle}
  }

  &.fade-appear-active,
  &.fade-enter-active {
    ${activePopupContainerStyle}
    ${popupContainerTransitionConfig}
  }

  &.fade-enter-done {
    ${activePopupContainerStyle}
  }

  &.fade-exit {
    ${activePopupContainerStyle}
  }

  &.fade-exit-active {
    ${inactivePopupContainerStyle}
    ${popupContainerTransitionConfig}
  }

  &.fade-exit-done {
    ${inactivePopupContainerStyle}
    display: none;
  }
`

export default function Popup({
  open = false,
  borderless = false,
  onClose,
  icon = 'close',
  title,
  noNavbar,
  children,
}: PropsWithChildren<{
  open: boolean
  onClose: (e: SyntheticEvent) => void
  borderless?: boolean
  title?: string
  icon?: NavbarIcon
  noNavbar?: boolean
}>) {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && popupRef.current && popupRef.current.scrollTop > 0) {
      popupRef.current.scrollTop = 0
    }
  }, [open])

  return (
    <CSSTransition
      timeout={TRANSITION_DURATION}
      in={open}
      classNames="fade"
      appear
    >
      {/* https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451 */}
      <PopupContainer ref={popupRef}>
        {noNavbar ? null : (
          <Navbar borderless={borderless} title={title}>
            <Navbar.Item floated="left" icon={icon} onClick={onClose} />
          </Navbar>
        )}

        {children}
      </PopupContainer>
    </CSSTransition>
  )
}

import { SyntheticEvent, PropsWithChildren, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import {
  Navbar,
  layeringMixin,
  LayeringMixinProps,
} from '@titicaca/core-elements'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

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

const PopupContainer = styled.div<LayeringMixinProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  user-select: none;

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @supports (padding: env(safe-area-inset-bottom)) {
    padding-bottom: env(safe-area-inset-bottom);
  }
  &::-webkit-scrollbar {
    display: none;
  }

  &:not([class*='popup-slide-']) {
    ${inactivePopupContainerStyle}
    display: none;
  }

  &.popup-slide-appear,
  &.popup-slide-enter {
    ${inactivePopupContainerStyle}
  }

  &.popup-slide-appear-active,
  &.popup-slide-enter-active {
    ${activePopupContainerStyle}
    ${popupContainerTransitionConfig}
  }

  &.popup-slide-enter-done {
    ${activePopupContainerStyle}
  }

  &.popup-slide-exit {
    ${activePopupContainerStyle}
  }

  &.popup-slide-exit-active {
    ${inactivePopupContainerStyle}
    ${popupContainerTransitionConfig}
  }

  &.popup-slide-exit-done {
    ${inactivePopupContainerStyle}
    display: none;
  }

  ${layeringMixin(2)}
`

export default function Popup({
  open = false,
  borderless = false,
  onClose,
  icon = 'close',
  title,
  noNavbar,
  children,
  zTier,
  zIndex,
  unmountOnExit,
  ...restProps
}: PropsWithChildren<
  {
    open: boolean
    onClose: (e: SyntheticEvent) => void
    borderless?: boolean
    title?: string
    icon?: NavbarIcon
    noNavbar?: boolean
    unmountOnExit?: boolean
  } & LayeringMixinProps &
    Partial<CSSTransitionProps<HTMLDivElement>>
>) {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && popupRef.current && popupRef.current.scrollTop > 0) {
      popupRef.current.scrollTop = 0
    }
  }, [open])

  return (
    <CSSTransition
      nodeRef={popupRef}
      timeout={TRANSITION_DURATION}
      in={open}
      classNames="popup-slide"
      appear
      mountOnEnter={unmountOnExit}
      unmountOnExit={unmountOnExit}
      {...restProps}
    >
      <PopupContainer ref={popupRef} zTier={zTier} zIndex={zIndex}>
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

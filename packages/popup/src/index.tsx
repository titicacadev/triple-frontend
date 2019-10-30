import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock'
import React, { createRef, ReactNode, SyntheticEvent, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import { Navbar } from '@titicaca/core-elements'

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 10;

  transition: all 300ms ease-out;
  transform: translateY(100%);

  &.fade-enter-done {
    transform: translateY(0);
  }

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  padding-bottom: 13px;

  @supports (padding: max(0px)) and (padding: env(safe-area-inset-bottom)) {
    padding-bottom: max(13px, calc(env(safe-area-inset-bottom) + 17px));
  }
`

export default function Popup({
  open = false,
  borderless = false,
  onClose,
  children,
  title,
  isIOS = false,
}: {
  open: boolean
  borderless?: boolean
  onClose: (e: SyntheticEvent) => void
  children: ReactNode
  title?: string
  isIOS?: boolean
}) {
  const lockedContainer = createRef()

  useEffect(() => {
    if (open && lockedContainer.current && !isIOS) {
      setTimeout(() => disableBodyScroll(lockedContainer.current), 0)
    } else if (!open && !isIOS) {
      clearAllBodyScrollLocks()
    }
  }, [isIOS, open, lockedContainer])

  return (
    <CSSTransition timeout={0} in={open} classNames="fade" appear>
      {/* https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451 */}
      <PopupContainer ref={lockedContainer as any}>
        <Navbar borderless={borderless} title={title}>
          <Navbar.Item floated="left" icon="close" onClick={onClose} />
        </Navbar>

        {children}
      </PopupContainer>
    </CSSTransition>
  )
}

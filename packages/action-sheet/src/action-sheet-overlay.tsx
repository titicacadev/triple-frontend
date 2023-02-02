import { forwardRef, PropsWithChildren, SyntheticEvent } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'

import { useActionSheet } from './action-sheet-context'
import { silenceEvent } from './utils/event'

const inactiveOverlayFadeStyle = css`
  opacity: 0;
`

const activeOverlayFadeStyle = css`
  opacity: 1;
  z-index: 9999;
`

const overlayFadeConfig = css<{ duration: number }>`
  transition: opacity ${({ duration }) => duration}ms ease-in;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: rgba(58, 58, 58, 0.7);

  &:not([class*='action-sheet-fade-']) {
    ${inactiveOverlayFadeStyle}

    display: none;
  }

  &.action-sheet-fade-appear,
  &.action-sheet-fade-enter {
    ${inactiveOverlayFadeStyle}
  }

  &.action-sheet-fade-appear-active,
  &.action-sheet-fade-enter-active {
    ${activeOverlayFadeStyle}
    ${overlayFadeConfig}
  }

  &.action-sheet-fade-enter-done {
    ${activeOverlayFadeStyle}
  }

  &.action-sheet-fade-exit {
    ${activeOverlayFadeStyle}
  }

  &.action-sheet-fade-exit-active {
    ${inactiveOverlayFadeStyle}
    ${overlayFadeConfig}
  }

  &.action-sheet-fade-exit-done {
    ${inactiveOverlayFadeStyle}

    display: none;
  }
`

export interface ActionSheetOverlayProps extends PropsWithChildren {
  duration: number
}

export const ActionSheetOverlay = forwardRef<
  HTMLDivElement,
  ActionSheetOverlayProps
>(({ children, duration }, ref) => {
  const { open, onClose } = useActionSheet()

  const onOverlayClick = (e: SyntheticEvent) => {
    silenceEvent(e)
    onClose?.()
  }

  return (
    <CSSTransition
      nodeRef={ref}
      in={open}
      appear
      classNames="action-sheet-fade"
      timeout={duration}
    >
      <Overlay ref={ref} duration={duration} onClick={onOverlayClick}>
        {children}
      </Overlay>
    </CSSTransition>
  )
})
ActionSheetOverlay.displayName = 'ActionSheetOverlay'

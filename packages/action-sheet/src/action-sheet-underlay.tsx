import { PropsWithChildren, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'

import { useActionSheet } from './action-sheet-context'

const inactiveUnderlayFadeStyle = css`
  opacity: 0;
`

const activeUnderlayFadeStyle = css`
  opacity: 1;
`

const underlayFadeConfig = css<{ duration: number }>`
  transition: opacity ${({ duration }) => duration}ms ease-in;
`

export const Underlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  background-color: rgba(58, 58, 58, 0.7);
  z-index: 9999;

  &:not([class*='action-sheet-fade-']) {
    ${inactiveUnderlayFadeStyle}

    display: none;
  }

  &.action-sheet-fade-appear,
  &.action-sheet-fade-enter {
    ${inactiveUnderlayFadeStyle}
  }

  &.action-sheet-fade-appear-active,
  &.action-sheet-fade-enter-active {
    ${activeUnderlayFadeStyle}
    ${underlayFadeConfig}
  }

  &.action-sheet-fade-enter-done {
    ${activeUnderlayFadeStyle}
  }

  &.action-sheet-fade-exit {
    ${activeUnderlayFadeStyle}
  }

  &.action-sheet-fade-exit-active {
    ${inactiveUnderlayFadeStyle}
    ${underlayFadeConfig}
  }

  &.action-sheet-fade-exit-done {
    ${inactiveUnderlayFadeStyle}

    display: none;
  }
`

export interface ActionSheetUnderlayProps extends PropsWithChildren {
  duration: number
}

export const ActionSheetUnderlay = ({
  children,
  duration,
  ...props
}: ActionSheetUnderlayProps) => {
  const { open } = useActionSheet()
  const ref = useRef(null)

  return (
    <CSSTransition
      nodeRef={ref}
      in={open}
      appear
      classNames="action-sheet-fade"
      timeout={duration}
      mountOnEnter
      unmountOnExit
    >
      <Underlay ref={ref} duration={duration} {...props}>
        {children}
      </Underlay>
    </CSSTransition>
  )
}

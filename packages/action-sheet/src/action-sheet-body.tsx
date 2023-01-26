import { FocusScope } from '@react-aria/focus'
import {
  Container,
  MarginPadding,
  safeAreaInsetMixin,
} from '@titicaca/core-elements'
import { forwardRef, PropsWithChildren, ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'

import { useActionSheet } from './action-sheet-context'
import { ActionSheetTitle } from './action-sheet-title'

const inactiveSheetSlideStyle = css<{ from: 'top' | 'bottom' }>`
  ${({ from }) => {
    switch (from) {
      case 'top':
        return 'transform: translate3d(0, -100%, 0);'
      case 'bottom':
        return 'transform: translate3d(0, 100%, 0);'
    }
  }}
`

const activeSheetSlideStyle = css`
  transform: translate3d(0, 0, 0);
`

const sheetSlideConfig = css<{ duration: number }>`
  transition: transform ${({ duration }) => duration}ms ease-in;
`

interface SheetProps {
  borderRadius: number
  bottomSpacing: number
  duration: number
  from: 'top' | 'bottom'
  padding: MarginPadding
}

const Sheet = styled.div<SheetProps>`
  position: fixed;
  width: 100%;
  max-width: 768px;
  background-color: var(--color-white);

  padding-bottom: ${({ from, bottomSpacing }) =>
    from === 'top' ? 30 : bottomSpacing}px;
  padding-top: ${({ from }) => (from === 'bottom' ? 30 : 20)}px;

  &:not([class*='action-sheet-slide-']) {
    ${inactiveSheetSlideStyle}

    display: none;
  }

  &.action-sheet-slide-appear,
  &.action-sheet-slide-enter {
    ${inactiveSheetSlideStyle}
  }

  &.action-sheet-slide-appear-active,
  &.action-sheet-slide-enter-active {
    ${activeSheetSlideStyle}
    ${sheetSlideConfig}
  }

  &.action-sheet-slide-enter-done {
    ${activeSheetSlideStyle}
  }

  &.action-sheet-slide-exit {
    ${activeSheetSlideStyle}
  }

  &.action-sheet-slide-exit-active {
    ${inactiveSheetSlideStyle}
    ${sheetSlideConfig}
  }

  &.action-sheet-slide-exit-done {
    ${inactiveSheetSlideStyle}

    display: none;
  }

  ${({ from, borderRadius }) => {
    switch (from) {
      case 'top':
        return css`
          top: 0;
          border-radius: 0 0 ${borderRadius}px ${borderRadius}px;
        `
      case 'bottom':
        return css`
          bottom: 0;
          border-radius: ${borderRadius}px ${borderRadius}px 0 0;

          ${safeAreaInsetMixin};
        `
    }
  }}
`

const Content = styled(Container)`
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

export interface ActionSheetBodyProps extends PropsWithChildren {
  borderRadius: number
  bottomSpacing: number
  duration: number
  maxContentHeight: string | number
  from: 'top' | 'bottom'
  title?: ReactNode
}

export const ActionSheetBody = forwardRef<HTMLDivElement, ActionSheetBodyProps>(
  (
    {
      children,
      borderRadius,
      bottomSpacing,
      duration,
      maxContentHeight,
      from,
      title,
      ...props
    },
    ref,
  ) => {
    const { open, titleId } = useActionSheet()

    return (
      <CSSTransition
        nodeRef={ref}
        in={open}
        appear
        classNames="action-sheet-slide"
        timeout={duration}
        mountOnEnter
        unmountOnExit
      >
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <FocusScope contain restoreFocus autoFocus>
          <Sheet
            ref={ref}
            borderRadius={borderRadius}
            bottomSpacing={bottomSpacing}
            duration={duration}
            from={from}
            padding={{ bottom: bottomSpacing }}
            role="dialog"
            aria-labelledby={titleId}
            aria-modal
            {...props}
          >
            {title && <ActionSheetTitle>{title}</ActionSheetTitle>}
            <Content
              css={{
                maxHeight: maxContentHeight,
                padding: '0 25px',
              }}
            >
              {children}
            </Content>
          </Sheet>
        </FocusScope>
      </CSSTransition>
    )
  },
)

ActionSheetBody.displayName = 'ActionSheetBody'

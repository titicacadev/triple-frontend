import {
  Container,
  MarginPadding,
  safeAreaInsetMixin,
} from '@titicaca/core-elements'
import { PropsWithChildren, ReactNode } from 'react'
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
          border-radius: 0 0 ${borderRadius}px ${borderRadius}px;
        `
      case 'bottom':
        return css`
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

export const ActionSheetBody = ({
  children,
  borderRadius,
  bottomSpacing,
  duration,
  maxContentHeight,
  from,
  title,
  ...props
}: ActionSheetBodyProps) => {
  const { ref, dialogProps, open } = useActionSheet()

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
      <Sheet
        {...dialogProps}
        ref={ref}
        borderRadius={borderRadius}
        bottomSpacing={bottomSpacing}
        duration={duration}
        from={from}
        padding={{ bottom: bottomSpacing }}
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
    </CSSTransition>
  )
}

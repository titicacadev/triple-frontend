import { FocusScope } from '@react-aria/focus'
import { white } from '@titicaca/color-palette'
import { Container, safeAreaInsetMixin } from '@titicaca/core-elements'
import { forwardRef, PropsWithChildren, ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'

import { useActionSheet } from './action-sheet-context'
import { ActionSheetTitle } from './action-sheet-title'

const unit = (value: number | string, suffix = 'px') =>
  typeof value === 'string' ? value : value !== 0 ? `${value}${suffix}` : value

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
}

const Sheet = styled.div<SheetProps>`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 768px;
  background-color: ${white};

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
          border-radius: 0 0 ${unit(borderRadius)} ${unit(borderRadius)};
        `
      case 'bottom':
        return css`
          bottom: 0;
          border-radius: ${unit(borderRadius)} ${unit(borderRadius)} 0 0;

          ${safeAreaInsetMixin}
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
        <FocusScope>
          <Sheet
            {...props}
            ref={ref}
            borderRadius={borderRadius}
            bottomSpacing={bottomSpacing}
            duration={duration}
            from={from}
            role="dialog"
            aria-labelledby={titleId}
            aria-modal
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

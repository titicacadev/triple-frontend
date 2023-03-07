import {
  Container,
  MarginPadding,
  safeAreaInsetMixin,
} from '@titicaca/core-elements'
import { Fragment, MutableRefObject, PropsWithChildren, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { Dialog, Transition } from '@headlessui/react'

import { ActionSheetTitle } from './action-sheet-title'

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
  z-index: 9999;
  outline: none;

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

  &.enter,
  &.leave {
    transition: transform ${({ duration }) => duration}ms ease-in;
  }

  &.enter-from,
  &.leave-to {
    transform: translateY(${({ from }) => (from === 'top' ? -100 : 100)}%);
  }

  &.enter-to,
  &.leave-from {
    transform: translateY(0);
  }
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
  panelRef?: MutableRefObject<null>
}

export const ActionSheetBody = ({
  children,
  borderRadius,
  bottomSpacing,
  duration,
  maxContentHeight,
  from,
  title,
  panelRef,
  ...props
}: ActionSheetBodyProps) => {
  return (
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
        as={Sheet}
        ref={panelRef}
        tabIndex={-1}
        borderRadius={borderRadius}
        bottomSpacing={bottomSpacing}
        duration={duration}
        from={from}
        padding={{ bottom: bottomSpacing }}
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
      </Dialog.Panel>
    </Transition.Child>
  )
}

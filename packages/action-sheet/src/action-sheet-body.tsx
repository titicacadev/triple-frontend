import {
  Container,
  MarginPadding,
  safeAreaInsetMixin,
} from '@titicaca/core-elements'
import {
  CSSProperties,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
} from 'react'
import styled, { css } from 'styled-components'
import { Dialog } from '@headlessui/react'
import { TransitionStatus } from 'react-transition-group'

import { ActionSheetTitle } from './action-sheet-title'
import { useActionSheet } from './action-sheet-context'

interface SheetProps {
  borderRadius: number
  bottomSpacing: number
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

const transitionStyles = (
  status: TransitionStatus,
  from: 'top' | 'bottom',
): CSSProperties => {
  switch (status) {
    case 'entering':
    case 'entered':
      return { transform: `translate3d(0, 0, 0)` }
    case 'exiting':
    case 'exited':
      return { transform: `translate3d(0, ${from === 'top' ? -100 : 100}%, 0)` }
    default:
      return {}
  }
}

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
  const { transitionStatus } = useActionSheet()

  return (
    <Dialog.Panel
      as={Sheet}
      ref={panelRef}
      tabIndex={-1}
      borderRadius={borderRadius}
      bottomSpacing={bottomSpacing}
      from={from}
      padding={{ bottom: bottomSpacing }}
      style={{
        transition: `transform ${duration}ms ease-in`,
        transform: `translate3d(0, ${from === 'top' ? -100 : 100}%, 0)`,
        ...transitionStyles(transitionStatus, from),
      }}
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
  )
}

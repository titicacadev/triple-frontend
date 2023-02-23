import {
  Container,
  MarginPadding,
  safeAreaInsetMixin,
} from '@titicaca/core-elements'
import { forwardRef, PropsWithChildren, ReactNode } from 'react'
// import { TransitionStatus } from 'react-transition-group'
import styled, { css } from 'styled-components'
import { Dialog } from '@headlessui/react'

import { ActionSheetTitle } from './action-sheet-title'

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

// const transformStyle = (state: TransitionStatus, from: 'top' | 'bottom') => {
//   switch (state) {
//     case 'entering':
//     case 'entered':
//       return `translate3d(0, 0, 0)`
//     case 'exiting':
//     case 'exited':
//       return `translate3d(0, ${from === 'top' ? -100 : 100}%, 0)`
//     default:
//       return `translate3d(0, ${from === 'top' ? -100 : 100}%, 0)`
//   }
// }

export interface ActionSheetBodyProps extends PropsWithChildren {
  borderRadius: number
  bottomSpacing: number
  duration: number
  maxContentHeight: string | number
  from: 'top' | 'bottom'
  title?: ReactNode
}

export const ActionSheetBody = forwardRef<HTMLDivElement, ActionSheetBodyProps>(
  ({
    children,
    borderRadius,
    bottomSpacing,
    duration,
    maxContentHeight,
    from,
    title,
    ...props
  }) => {
    return (
      <Dialog.Panel
        as={Sheet}
        borderRadius={borderRadius}
        bottomSpacing={bottomSpacing}
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
      // <Sheet
      //   as={Dialog.Panel}
      //   borderRadius={borderRadius}
      //   bottomSpacing={bottomSpacing}
      //   from={from}
      //   padding={{ bottom: bottomSpacing }}
      //   style={{
      //     transition: `transform ${duration}ms ease-in`,
      //     transform: transformStyle(state, from),
      //   }}
      //   {...props}
      // >
      //   {title && <ActionSheetTitle>{title}</ActionSheetTitle>}
      //   <Content
      //     css={{
      //       maxHeight: maxContentHeight,
      //       padding: '0 25px',
      //     }}
      //   >
      //     {children}
      //   </Content>
      // </Sheet>
    )
  },
)

ActionSheetBody.displayName = 'ActionSheetBody'

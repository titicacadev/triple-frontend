import {
  Container,
  MarginPadding,
  safeAreaInsetMixin,
} from '@titicaca/core-elements'
import { PropsWithChildren, ReactNode, forwardRef } from 'react'
import styled, { css, CSSProp } from 'styled-components'

import { ActionSheetTitle } from './action-sheet-title'
import { TRANSITION_DURATION } from './constants'

interface SheetProps {
  $borderRadius: number
  $bottomSpacing: number
  $from: 'top' | 'bottom'
  padding: MarginPadding
}

const Sheet = styled.div<SheetProps>`
  position: fixed;
  width: 100%;
  max-width: 768px;
  background-color: var(--color-white);
  padding-bottom: ${({ $from, $bottomSpacing }) =>
    $from === 'top' ? 30 : $bottomSpacing}px;
  padding-top: ${({ $from }) => ($from === 'bottom' ? 30 : 20)}px;
  z-index: 9999;
  outline: none;
  ${({ $from, $borderRadius }) => {
    switch ($from) {
      case 'top':
        return css`
          top: 0;
          border-radius: 0 0 ${$borderRadius}px ${$borderRadius}px;
        `
      case 'bottom':
        return css`
          bottom: 0;
          border-radius: ${$borderRadius}px ${$borderRadius}px 0 0;
          ${safeAreaInsetMixin};
        `
    }
  }}
  transition: transform ${TRANSITION_DURATION}ms ease-in;
  transform: translateY(${({ $from }) => ($from === 'top' ? -100 : 100)}%);

  &[data-transition='open'] {
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
  from: 'top' | 'bottom'
  maxContentHeight?: string | number
  title?: ReactNode
  labelId: string
  transitionStatus: string
  css?: CSSProp
}

export const ActionSheetBody = forwardRef<HTMLDivElement, ActionSheetBodyProps>(
  function ActionSheetBody(
    {
      children,
      borderRadius,
      bottomSpacing,
      from,
      maxContentHeight,
      title,
      labelId,
      transitionStatus,
      ...props
    },
    ref,
  ) {
    return (
      <Sheet
        ref={ref}
        $borderRadius={borderRadius}
        $bottomSpacing={bottomSpacing}
        $from={from}
        padding={{ bottom: bottomSpacing }}
        aria-labelledby={labelId}
        data-transition={transitionStatus}
        {...props}
      >
        {title && (
          <ActionSheetTitle labelId={labelId}>{title}</ActionSheetTitle>
        )}
        <Content
          css={{
            maxHeight: maxContentHeight,
            padding: '0 25px',
          }}
        >
          {children}
        </Content>
      </Sheet>
    )
  },
)

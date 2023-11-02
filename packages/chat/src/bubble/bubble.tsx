import styled, { css } from 'styled-components'
import { Text } from '@titicaca/core-elements'
import { PropsWithChildren, MouseEvent } from 'react'
import {
  LongPressCallbackMeta,
  LongPressReactEvents,
  useLongPress,
} from 'use-long-press'

const BACKGROUND_COLORS: { [key: string]: string } = {
  mint: '#00BB92',
  white: '#ffffff',
}

interface BubbleCSSProp {
  maxWidthOffset?: number
  my: boolean
  hasArrow?: boolean
}
export type BubbleProp = BubbleCSSProp & {
  id: string
  onClick?: (messageId: string, e: MouseEvent) => void
  onLongPress?: (
    messageId: string,
    target: LongPressReactEvents<Element>,
    context: LongPressCallbackMeta<unknown>,
  ) => void
}

const StyledBubble = styled(Text).attrs({
  textAlign: 'left',
  inlineBlock: true,
})<BubbleCSSProp>`
  border-radius: 20px;
  position: relative;
  margin: 0;
  padding: 12px 14px;

  > div {
    word-break: break-word;
    white-space: pre-wrap;
  }

  a {
    ${({ my }) => css`
      color: ${my ? '#B5FFFB' : 'var(--color-blue)'} !important;
    `}
    text-decoration: underline !important;
  }

  ${({ maxWidthOffset }) =>
    `max-width: calc(100% - ${maxWidthOffset || 100}px);`}
  ${({ my, hasArrow = true }) => css`
    background-color: ${BACKGROUND_COLORS[my ? 'mint' : 'white']};
    ${my && 'color:  var(--color-white);'}
    ${hasArrow &&
    (my ? 'border-top-right-radius: 4px;' : 'border-top-left-radius: 4px;')};
  `}
`

export function Bubble({
  id,
  onClick,
  onLongPress,
  children,
  ...props
}: PropsWithChildren<BubbleProp>) {
  const bind = useLongPress(
    (target, context) => {
      onLongPress?.(id, target, context)
    },
    {
      threshold: 500,
      cancelOnMovement: true,
    },
  )

  return (
    <StyledBubble onClick={(e) => onClick?.(id, e)} {...props} {...bind()}>
      {children}
    </StyledBubble>
  )
}

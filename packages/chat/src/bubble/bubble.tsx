import styled, { css } from 'styled-components'
import { Text } from '@titicaca/core-elements'
import { PropsWithChildren } from 'react'
import { useLongPress } from 'use-long-press'

import { BubbleCSSProp, BubbleProp } from './type'
import ParentMessageUI, { ParentMessageUIProp } from './parent/parent-ui'

const StyledBubble = styled(Text).attrs({
  textAlign: 'left',
  inlineBlock: true,
})<BubbleCSSProp>`
  border-radius: 20px;
  position: relative;
  margin: 0;
  padding: 11px;

  > div {
    word-break: break-word;
    white-space: pre-wrap;
  }

  ${({ maxWidthOffset }) =>
    `max-width: calc(100% - ${maxWidthOffset || 100}px);`}
  ${({ my, hasArrow = true }) => css`
    background-color: ${my ? '#00BB92' : '#F6F6F6'};
    ${my && 'color:  var(--color-white);'}
    ${hasArrow &&
    (my ? 'border-top-right-radius: 4px;' : 'border-top-left-radius: 4px;')};
  `}
`

export function BaseBubble({
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
    <StyledBubble onClick={(e) => onClick?.(e, id)} {...props} {...bind()}>
      {children}
    </StyledBubble>
  )
}

export default function BubbleWithParentMessage({
  parentMessage,
  onParentMessageClick,
  children,
  ...props
}: PropsWithChildren<BubbleProp> & {
  parentMessage?: ParentMessageUIProp
  onParentMessageClick?: (id: string) => void
}) {
  return (
    <BaseBubble {...props}>
      {parentMessage ? (
        <ParentMessageUI onClick={onParentMessageClick} {...parentMessage} />
      ) : null}
      {children}
    </BaseBubble>
  )
}

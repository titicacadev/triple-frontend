import { styled, css } from 'styled-components'
import { PropsWithChildren } from 'react'
import { useLongPress } from 'use-long-press'
import { Text } from '@titicaca/tds-ui'

import { BubbleCSSProp, BubbleProp } from './type'
import ParentMessageUI, { ParentMessageUIProp } from './parent'

const StyledBubble = styled(Text).attrs({
  textAlign: 'left',
  inlineBlock: true,
})<BubbleCSSProp>`
  position: relative;
  margin: 0;
  padding: 11px;

  > div {
    word-break: break-word;
    white-space: pre-wrap;
  }

  ${({ borderRadius = 20 }) => `border-radius: ${borderRadius}px;`}
  ${({ maxWidthOffset }) =>
    `max-width: calc(100% - ${maxWidthOffset || 100}px);`}
  ${({ my, hasArrow = true, arrowRadius = 4 }) => css`
    background-color: ${my ? '#00BB92' : '#F6F6F6'};
    ${my && 'color:  var(--color-white);'}
    ${hasArrow &&
    (my
      ? `border-top-right-radius: ${arrowRadius}px;`
      : `border-top-left-radius: ${arrowRadius}px;`)};
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

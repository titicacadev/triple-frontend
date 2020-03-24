import React, { useEffect, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { List, Text, longClickable } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useHistoryContext,
} from '@titicaca/react-contexts'

export const ACTION_SHEET_PREFIX = 'location-properties.copy-action-sheet'

export interface PropertyItemProps {
  title: string
  value?: string | React.ReactNode
  singleLine?: boolean
  identifier: string
  eventActionFragment?: string
  onClick?: () => void
}

const PropertyItemContainer = styled.div`
  white-space: nowrap;

  * {
    vertical-align: top;
    line-height: 1.43;
  }
`

const PropertyValueContainer = styled.div<{ width: string }>`
  display: inline-block;
  width: ${({ width }) => width};
`

export default function PropertyItem({
  identifier,
  title,
  value,
  singleLine,
  onClick,
  eventActionFragment,
}: PropertyItemProps) {
  const titleTextRef = useRef<HTMLDivElement>(null)
  const [titleTextWidth, setTitleTextWidth] = useState(0)
  const LongClickableItemContainer = longClickable(PropertyItemContainer)
  const { push } = useHistoryContext()
  const { trackSimpleEvent } = useEventTrackingContext()

  useEffect(() => {
    if (titleTextRef.current !== null) {
      setTitleTextWidth((titleTextRef?.current as any)?.offsetWidth)
    }
  }, [titleTextRef, title])

  const handleLongClick = useCallback(() => {
    if (eventActionFragment) {
      trackSimpleEvent({ action: `${eventActionFragment}_복사하기_실행` })
    }

    push(`${ACTION_SHEET_PREFIX}.${identifier}`)
  }, [push, identifier, trackSimpleEvent, eventActionFragment])

  return (
    <List.Item>
      <LongClickableItemContainer
        onLongClick={handleLongClick}
        onClick={onClick}
      >
        <Text.WithRef
          inlineBlock
          whiteSpace="nowrap"
          bold
          size="small"
          ref={titleTextRef}
        >
          {title}
        </Text.WithRef>
        <PropertyValueContainer width={`calc(100% - ${titleTextWidth}px)`}>
          <Text
            margin={{ left: 10 }}
            size="small"
            alpha={0.7}
            wordBreak="break-all"
            whiteSpace="normal"
            {...(singleLine && { ellipsis: true, whiteSpace: 'nowrap' })}
          >
            {value}
          </Text>
        </PropertyValueContainer>
      </LongClickableItemContainer>
    </List.Item>
  )
}

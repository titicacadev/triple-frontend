import { useCallback } from 'react'
import { List, Text, longClickable, FlexBox } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useUserAgentContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'

export const ACTION_SHEET_PREFIX = 'location-properties.copy-action-sheet'

export interface PropertyItemProps {
  title: string
  value?: string
  singleLine?: boolean
  identifier: string
  eventActionFragment?: string
  onClick?: () => void
}

const LongClickableItemFlexBox = longClickable(FlexBox)

export default function PropertyItem({
  identifier,
  title,
  value,
  singleLine,
  onClick,
  eventActionFragment,
}: PropertyItemProps) {
  const { isPublic } = useUserAgentContext()

  const { push } = useHistoryFunctions()
  const { trackSimpleEvent } = useEventTrackingContext()

  const handleLongClick = useCallback(() => {
    if (eventActionFragment) {
      trackSimpleEvent({ action: `${eventActionFragment}_복사하기_실행` })
    }

    push(`${ACTION_SHEET_PREFIX}.${identifier}`)
  }, [push, identifier, trackSimpleEvent, eventActionFragment])

  return (
    <List.Item>
      <LongClickableItemFlexBox
        alignItems="flex-start"
        onLongClick={!isPublic ? handleLongClick : undefined}
        onClick={onClick}
      >
        <Text bold size="small" flexShrink={1} lineHeight={1.43}>
          {title}
        </Text>
        <Text
          size="small"
          alpha={0.7}
          ellipsis={singleLine}
          margin={{ left: 10 }}
          flex={1}
          lineHeight={1.43}
          wordBreak="break-all"
        >
          {value}
        </Text>
      </LongClickableItemFlexBox>
    </List.Item>
  )
}

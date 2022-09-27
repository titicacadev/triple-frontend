import { useCallback } from 'react'
import { List, Text, longClickable, FlexBox } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

export const ACTION_SHEET_PREFIX = 'location-properties.copy-action-sheet'

export interface PropertyItemProps {
  title: string
  value?: string
  singleLine?: boolean
  identifier: string
  eventActionFragment?: string
  onClick?: () => void
}

const LongClickableItemContainer = longClickable(FlexBox)

export default function PropertyItem({
  identifier,
  title,
  value,
  singleLine,
  onClick,
  eventActionFragment,
}: PropertyItemProps) {
  const app = useTripleClientMetadata()

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
      <LongClickableItemContainer
        flex
        alignItems="flex-start"
        onLongClick={app ? handleLongClick : undefined}
        onClick={onClick}
      >
        <Text bold size="small" css={{ flexShrink: 1, lineHeight: 1.43 }}>
          {title}
        </Text>
        <Text
          size="small"
          alpha={0.7}
          ellipsis={singleLine}
          css={{
            marginLeft: 10,
            flex: 1,
            lineHeight: 1.43,
            wordBreak: 'break-all',
          }}
        >
          {value}
        </Text>
      </LongClickableItemContainer>
    </List.Item>
  )
}

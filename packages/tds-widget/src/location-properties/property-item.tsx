import { useCallback } from 'react'
import {
  List,
  Text,
  longClickable,
  FlexBox,
  LongClickableComponentProps,
  FlexBoxProps,
} from '@titicaca/tds-ui'
import {
  useTrackEvent,
  useHashRouter,
  useClientApp,
} from '@titicaca/triple-web'

export const ACTION_SHEET_PREFIX = 'location-properties.copy-action-sheet'

export interface PropertyItemProps {
  title: string
  value?: string
  singleLine?: boolean
  identifier: string
  eventActionFragment?: string
  onClick?: () => void
}

type LongClickableItemContainerProps = LongClickableComponentProps &
  FlexBoxProps

const LongClickableItemContainer =
  longClickable<LongClickableItemContainerProps>(FlexBox)

export function PropertyItem({
  identifier,
  title,
  value,
  singleLine,
  onClick,
  eventActionFragment,
}: PropertyItemProps) {
  const app = useClientApp()
  const trackEvent = useTrackEvent()
  const { addUriHash } = useHashRouter()

  const handleLongClick = useCallback(() => {
    if (eventActionFragment) {
      trackEvent({
        ga: [`${eventActionFragment}_복사하기_실행`],
        fa: {
          action: `${eventActionFragment}_복사하기_실행`,
        },
      })
    }

    addUriHash(`${ACTION_SHEET_PREFIX}.${identifier}`)
  }, [addUriHash, identifier, trackEvent, eventActionFragment])

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

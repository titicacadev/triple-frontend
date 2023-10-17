import { useCallback } from 'react'
import {
  List,
  Text,
  longClickable,
  FlexBox,
  LongClickableComponentProps,
  FlexBoxProps,
} from '@titicaca/kint5-core-elements'
import {
  useEventTrackingContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

export const ACTION_SHEET_PREFIX = 'location-properties.copy-action-sheet'

export interface PropertyItemProps {
  title: string
  value?: string
  iconUrl?: string
  singleLine?: boolean
  identifier: string
  eventActionFragment?: string
  onClick?: () => void
}

type LongClickableItemContainerProps = LongClickableComponentProps &
  FlexBoxProps

const LongClickableItemContainer =
  longClickable<LongClickableItemContainerProps>(FlexBox)

export default function PropertyItem({
  identifier,
  title,
  value,
  iconUrl,
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
        gap="9px"
        onLongClick={app ? handleLongClick : undefined}
        onClick={onClick}
      >
        {iconUrl ? (
          <img src={iconUrl} alt={title} />
        ) : (
          <Text bold size="small" css={{ flexShrink: 1, lineHeight: 1.43 }}>
            {title}
          </Text>
        )}
        <Text
          ellipsis={singleLine}
          css={{
            fontSize: 14,
            fontWeight: 400,
            ...(identifier === 'officialSiteUrl' && {
              color: 'var(--color-kint5-brand1)',
            }),
          }}
        >
          {value}
        </Text>
      </LongClickableItemContainer>
    </List.Item>
  )
}

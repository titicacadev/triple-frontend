import styled, { CSSProp } from 'styled-components'
import { Container, Text, shouldForwardProp } from '@titicaca/core-elements'
import { format, setDefaultOptions } from 'date-fns'
import { ko } from 'date-fns/locale'

import { ReplyMessageIcon } from '../icons/reply-message-icon'
import { REPLY_BUTTON_DATA_ID } from '../chat/constants'

const BubbleInfoContainer = styled(Container)`
  vertical-align: bottom;
`

const UnreadMessageCountText = styled.div.withConfig({
  shouldForwardProp,
})<{ css?: CSSProp }>`
  color: #26cec2;
  font-size: 10px;
  ${(props) => props.css}
`

const ReplyActionButton = styled.button<{
  align: 'left' | 'right'
}>`
  display: flex;
  align-items: flex-end;
  justify-content: ${({ align }) => (align === 'right' ? 'flex-end' : 'auto')};
  width: 100%;
  height: 22px;
  padding-bottom: 3px;
  cursor: pointer;
`

setDefaultOptions({ locale: ko })

export function BubbleInfo({
  align,
  unreadCount,
  date,
  showTimeInfo = true,
  showDateInfo = false,
  onReplyClick,
  dateTimeStyle,
  unreadCountStyle,
  ...props
}: {
  align: 'left' | 'right'
  unreadCount: number | null
  date: string
  showTimeInfo?: boolean
  showDateInfo?: boolean
  onReplyClick?: () => void
  dateTimeStyle?: { css?: CSSProp }
  unreadCountStyle?: { css?: CSSProp }
  css?: CSSProp
}) {
  return (
    <BubbleInfoContainer position="relative" display="inline-block" {...props}>
      {onReplyClick ? (
        <ReplyActionButton
          align={align}
          onClick={onReplyClick}
          data-id={REPLY_BUTTON_DATA_ID}
        >
          <ReplyMessageIcon />
        </ReplyActionButton>
      ) : null}

      {unreadCount ? (
        <UnreadMessageCountText css={unreadCountStyle?.css}>
          {unreadCount}
        </UnreadMessageCountText>
      ) : null}

      {showDateInfo ? (
        <Text size={10} alpha={0.51} css={dateTimeStyle?.css}>
          {format(new Date(date), 'MM.dd')}
        </Text>
      ) : null}

      {showTimeInfo ? (
        <Text size={10} alpha={0.51} css={dateTimeStyle?.css}>
          {format(new Date(date), 'a h:mm')}
        </Text>
      ) : null}
    </BubbleInfoContainer>
  )
}

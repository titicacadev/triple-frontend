import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'
import { format, setDefaultOptions } from 'date-fns'
import { ko } from 'date-fns/locale'

import { ReplyMessageIcon } from '../icons/reply-meesage-icon'

const BubbleInfoContainer = styled(Container)`
  vertical-align: bottom;
`

const UnreadMessageCountText = styled.div`
  color: #26cec2;
  font-size: 10px;
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
  ...props
}: {
  align: 'left' | 'right'
  unreadCount: number | null
  date: string
  showTimeInfo?: boolean
  showDateInfo?: boolean
  onReplyClick?: () => void
}) {
  return (
    <BubbleInfoContainer position="relative" display="inline-block" {...props}>
      {onReplyClick ? (
        <ReplyActionButton align={align} onClick={onReplyClick}>
          <ReplyMessageIcon />
        </ReplyActionButton>
      ) : null}

      {unreadCount ? (
        <UnreadMessageCountText>{unreadCount}</UnreadMessageCountText>
      ) : null}

      {showDateInfo ? (
        <Text size={10} alpha={0.51}>
          {format(new Date(date), 'MM.dd')}
        </Text>
      ) : null}

      {showTimeInfo ? (
        <Text size={10} alpha={0.51}>
          {format(new Date(date), 'a h:mm')}
        </Text>
      ) : null}
    </BubbleInfoContainer>
  )
}

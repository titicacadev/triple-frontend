import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'
import { format, setDefaultOptions } from 'date-fns'
import { ko } from 'date-fns/locale'

const BubbleInfoContainer = styled(Container)`
  vertical-align: bottom;
`

const UnreadMessageCountText = styled.div`
  color: #26cec2;
  font-size: 10px;
`

setDefaultOptions({ locale: ko })

export function BubbleInfo({
  unreadCount,
  date,
  showTimeInfo = true,
  showDateInfo = false,
  ...props
}: {
  unreadCount: number | null
  date: string
  showTimeInfo?: boolean
  showDateInfo?: boolean
}) {
  return (
    <BubbleInfoContainer position="relative" display="inline-block" {...props}>
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

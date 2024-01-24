import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'
import { isSameDay, isSameYear, format, setDefaultOptions } from 'date-fns'
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
  ...props
}: {
  unreadCount: number | null
  date: string
}) {
  const showDate = !isSameDay(new Date(), new Date(date))
  const showYear = !isSameYear(new Date(), new Date(date))

  return (
    <BubbleInfoContainer position="relative" display="inline-block" {...props}>
      {unreadCount ? (
        <UnreadMessageCountText>{unreadCount}</UnreadMessageCountText>
      ) : null}

      {showDate ? (
        <Text size={10} alpha={0.51}>
          {format(new Date(date), showYear ? 'yyyy.MM.dd' : 'MM.dd')}
        </Text>
      ) : null}

      <Text size={10} alpha={0.51}>
        {format(new Date(date), 'a h:mm')}
      </Text>
    </BubbleInfoContainer>
  )
}

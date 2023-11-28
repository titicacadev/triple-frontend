import moment from 'moment'
import styled from 'styled-components'
import { Button, Container, Text } from '@titicaca/core-elements'

const BubbleInfoContainer = styled(Container)`
  vertical-align: bottom;
`

const UnreadMessageCountText = styled.div`
  color: #26cec2;
  font-size: 10px;
`

moment.locale('ko')

export function BubbleInfo({
  unreadCount,
  date,
  thanks,
  onThanksClick,
  ...props
}: {
  unreadCount: number | null
  date: string
  thanks?: { count: number; haveMine: boolean }
  onThanksClick?: () => void
}) {
  const showDate = !moment().isSame(date, 'day')
  const showYear = !moment().isSame(date, 'year')

  return (
    <BubbleInfoContainer position="relative" display="inline-block" {...props}>
      {thanks ? (
        <Thanks
          count={thanks.count}
          haveMine={thanks.haveMine}
          onClick={onThanksClick}
        />
      ) : null}

      {unreadCount ? (
        <UnreadMessageCountText>{unreadCount}</UnreadMessageCountText>
      ) : null}

      {showDate ? (
        <Text size={10} alpha={0.51}>
          {moment(date).format(showYear ? 'YYYY.MM.DD' : 'MM.DD')}
        </Text>
      ) : null}

      <Text size={10} alpha={0.51}>
        {moment(date).format('A hh:mm')}
      </Text>
    </BubbleInfoContainer>
  )
}

function Thanks({
  count,
  haveMine,
  onClick,
}: {
  count: number
  haveMine: boolean
  onClick?: () => void
}) {
  return (
    <Button
      css={{ color: haveMine ? 'pink' : 'black' }}
      onClick={() => onClick?.()}
    >
      {count}
    </Button>
  )
}

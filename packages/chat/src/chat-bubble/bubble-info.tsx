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
      {thanks && onThanksClick ? (
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

const ThanksButton = styled(Button)<{ haveMine: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;
  background-color: ${({ haveMine }) =>
    haveMine ? 'var(--color-white)' : 'var(--color-gray50)'};
  color: ${({ haveMine }) => (haveMine ? '#1DBEB2' : 'var(--color-gray700)')};
  ${({ haveMine }) => (haveMine ? 'border: 1px solid #1DBEB2' : '')};
  padding: 3.5px 8px 4.5px 8px;
  font-weight: normal;
`

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
    <ThanksButton haveMine={haveMine} onClick={() => onClick?.()}>
      <img
        src="https://assets.triple-dev.titicaca-corp.com/images/ic_chat_thumbsup_on.svg"
        alt="좋아요 아이콘"
      />
      {count === 0 ? null : count}
    </ThanksButton>
  )
}

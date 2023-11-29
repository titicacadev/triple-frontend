import { Button } from '@titicaca/core-elements'
import styled from 'styled-components'

const ThanksButton = styled(Button)<{ haveMine: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;
  background-color: ${({ haveMine }) =>
    haveMine ? 'var(--color-white)' : 'var(--color-gray50)'};
  color: ${({ haveMine }) => (haveMine ? '#1DBEB2' : 'var(--color-gray700)')};
  ${({ haveMine }) => (haveMine ? 'border: 1px solid #1DBEB2' : '')};
  padding: 3.5px 8px 4.5px;
  font-weight: normal;
`

export default function Thanks({
  count,
  haveMine,
  onClick,
  ...props
}: {
  count: number
  haveMine: boolean
  onClick?: () => void
}) {
  return (
    <ThanksButton haveMine={haveMine} onClick={() => onClick?.()} {...props}>
      <img
        src="https://assets.triple-dev.titicaca-corp.com/images/ic_chat_thumbsup_on.svg"
        alt="좋아요 아이콘"
      />
      {count === 0 ? null : count}
    </ThanksButton>
  )
}

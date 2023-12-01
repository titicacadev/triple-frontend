import { Button } from '@titicaca/core-elements'
import styled from 'styled-components'

const ThanksButton = styled(Button)<{ haveMine: boolean }>`
  display: inline-flex;
  gap: 3px;
  height: 20px;
  align-items: center;
  background-color: ${({ haveMine }) =>
    haveMine ? 'var(--color-white)' : 'var(--color-gray50)'};
  color: ${({ haveMine }) => (haveMine ? '#1DBEB2' : 'var(--color-gray700)')};
  ${({ haveMine }) => (haveMine ? 'border: 1px solid #1DBEB2;' : '')}
  padding: 3.5px 6px 4.5px 7px;
  font-weight: ${({ haveMine }) => (haveMine ? '700' : '500')};
  font-size: 10px;
`

const ThanksCount = styled.span`
  font-size: 10px;
  line-height: 11px;
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
        width={11}
        height={11}
      />
      {count === 0 ? null : <ThanksCount>{count}</ThanksCount>}
    </ThanksButton>
  )
}

import { Button, Text } from '@titicaca/tds-ui'
import { styled, css } from 'styled-components'

export const HiddenElement = styled.div`
  height: 1px;
`

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 0 0 1px;
  outline-offset: -1px;
  float: left;
  object-fit: cover;
`

export const ProfileName = styled(Text)`
  font-size: 11px;
  font-weight: 600;
`

export const SendingFailureHandlerContainer = styled.div`
  display: inline-block;
  vertical-align: bottom;
  width: 48px;
  height: 24px;
  border-radius: 6px;
  overflow: hidden;
  font-size: 10px;
`

const sendingFailureHandlerStyle = css`
  height: 100%;
  border: none;
  outline: none;
  background-color: #fd2e69;
  background-size: 14px 14px;
  background-position: center;
  background-repeat: no-repeat;
`

export const RetryButton = styled.button`
  ${sendingFailureHandlerStyle};

  width: 23.5px;
`

export const DeleteButton = styled.button`
  ${sendingFailureHandlerStyle};

  width: 24.5px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
`

const ThanksButton = styled(Button)<{ $haveMine: boolean }>`
  display: flex;
  gap: 3px;
  height: 20px;
  align-items: center;
  background-color: ${({ $haveMine }) =>
    $haveMine ? 'var(--color-white)' : 'var(--color-gray50)'};
  color: ${({ $haveMine }) => ($haveMine ? '#1DBEB2' : 'var(--color-gray700)')};
  ${({ $haveMine }) => ($haveMine ? 'border: 1px solid #1DBEB2;' : '')}
  padding: 3.5px 6px 4.5px 7px;
  font-weight: ${({ $haveMine }) => ($haveMine ? '700' : '500')};
  font-size: 10px;
`

const ThanksCount = styled.span`
  font-size: 10px;
  line-height: 11px;
`

export function Thanks({
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
    <ThanksButton $haveMine={haveMine} onClick={() => onClick?.()} {...props}>
      <img
        src="https://assets.triple.guide/images/ic_chat_thumbsup_on.svg"
        alt="좋아요 아이콘"
        width={11}
        height={11}
      />
      {count === 0 ? null : <ThanksCount>{count}</ThanksCount>}
    </ThanksButton>
  )
}

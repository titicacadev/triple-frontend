import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container as BaseContainer, Text } from '@titicaca/tds-ui'

import { ArrowBottom16Icon } from '../icons/arrow-bottom-16-icon'
import { ChatMessageInterface, UserType } from '../types'
import { getTextMessage } from '../preview'

export const Container = styled.div`
  position: relative;
`

const ButtonContainer = styled(BaseContainer)`
  position: absolute;
  right: 16px;
  top: -52px;

  & > button {
    background-color: ${({ theme }) => theme.nol.colorNeutralW100};
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.nol.colorNeutralG10};
    width: 40px;
    height: 40px;
  }
`

export function ScrollToBottomButton({
  onClick,
  delay = 200,
  ...props
}: {
  onClick: (behavior: ScrollBehavior) => void
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, delay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isVisible) {
    return (
      <ButtonContainer {...props}>
        <button onClick={() => onClick('instant')} type="button">
          <ArrowBottom16Icon />
        </button>
      </ButtonContainer>
    )
  }
}

const NewMessageButton = styled.button.attrs({ type: 'button' })`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.nol.colorNeutralW100};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.nol.colorNeutralB10};
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`

const Thumbnail = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.nol.colorNeutralG15};
  object-fit: cover;
  flex-shrink: 0;
`

const Name = styled(Text).attrs({
  maxLines: 1,
  bold: true,
  size: 12,
  lineHeight: '16px',
  ellipsis: true,
})`
  max-width: 70px;
  color: ${({ theme }) => theme.nol.colorNeutralG60};
  flex-shrink: 0;
  overflow: hidden;
`

const Message = styled(Text).attrs({
  maxLines: 1,
  size: 12,
  lineHeight: '16px',
  ellipsis: true,
})`
  color: ${({ theme }) => theme.nol.colorNeutralB100};
  overflow: hidden;
  flex-grow: 1;
`

const NewMessageContainer = styled(BaseContainer)`
  position: absolute;
  top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  transition: all 200ms ease-out;

  &:has(${NewMessageButton}) {
    top: -48px;
  }
`

export function NewMessage<T = UserType>({
  message,
  onClick,
  ...props
}: {
  message: ChatMessageInterface<T> | null
  onClick: () => void
}) {
  return (
    <NewMessageContainer {...props}>
      {message && (
        <NewMessageButton onClick={onClick}>
          {message.sender.profile.thumbnail ? (
            <Thumbnail src={message.sender.profile.thumbnail} />
          ) : null}
          <Name>{message.sender.profile.name}</Name>
          <Message>{getTextMessage(message.payload)}</Message>
        </NewMessageButton>
      )}
    </NewMessageContainer>
  )
}

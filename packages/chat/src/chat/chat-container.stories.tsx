import { Story } from '@storybook/react'
import { FlexBox } from '@titicaca/core-elements'
import styled from 'styled-components'

import { MessageType, TextPayload } from '../types'
import { CHAT_ARGS } from '../bubbles/__stories__/constants'

import ChatContainer, { ChatContainerProps } from './chat-container'
import Chat from './chat'

export default {
  title: 'chat / ChatContainer',
  component: ChatContainer,
}

const ChatMessagesContainer = styled(FlexBox).attrs({
  flexGrow: 1,
})`
  overflow-y: scroll;
  padding-left: 20px;
  padding-right: 30px;

  @media only screen and (max-width: 480px) {
    height: calc(100vh - 190px);
  }
`

const Input = ({
  postMessage,
}: {
  postMessage: (payload: TextPayload) => void
}) => {
  const onClick = () => {
    postMessage({ type: MessageType.TEXT, message: 'zz' })
  }

  return (
    <>
      <input />
      <button onClick={onClick}>보내기</button>
    </>
  )
}

const Template: Story<ChatContainerProps> = () => (
  <ChatContainer
    container={ChatMessagesContainer}
    inputElement={Input}
    textBubbleFontSize="large"
    textBubbleMaxWidthOffset={110}
    mediaUrlBase="https://media.triple.guide"
    cloudinaryName="triple-cms"
  >
    <Chat {...CHAT_ARGS} />
  </ChatContainer>
)

export const ChatStory = Template.bind({})

ChatStory.storyName = '채팅 리스트'

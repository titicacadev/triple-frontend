import { Story } from '@storybook/react'
import { FlexBox } from '@titicaca/core-elements'
import styled from 'styled-components'

import { MessageType, TextPayload } from '../types'
import { CHAT_ARGS } from '../utils/constants'

import { ChatContainerProps, ChatContainer } from './chat-container'
import { Chat } from './chat'

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
    <FlexBox
      flex
      alignItems="center"
      justifyContent="space-around"
      css={{
        width: '100%',
        marginTop: '30px',
        border: 'var(--color-gray300) 1px solid',
      }}
    >
      <input
        style={{
          width: '80%',
          padding: '20px',
          border: 'var(--color-gray300) 1px solid',
        }}
        placeholder="보내기 버튼 클릭 시 dummy message 1개만 보내지는 것으로 보이게 설정했습니다."
      />
      <button onClick={onClick}>보내기</button>
    </FlexBox>
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

ChatStory.storyName = 'Chat Room'

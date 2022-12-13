import React from 'react'
import { Story } from '@storybook/react'

import { CHAT_ARGS, MEDIA_ARGS } from '../utils/constants'
import { UserType } from '../types'

import { ChatContext } from './chat-context'
import { Chat, ChatProps } from './chat'

export default {
  title: 'chat / Chat',
  component: Chat,
  argTypes: {
    displayTarget: {
      control: {
        type: 'select',
        options: [
          UserType.TRIPLE_USER,
          UserType.TRIPLE_OPERATOR,
          UserType.TNA_PARTNER,
        ],
      },
      textBubbleFontSize: {
        control: {
          type: 'select',
          options: ['medium', 'large'],
        },
      },
    },
  },
}

const Template: Story<ChatProps> = (args) => (
  <ChatContext.Provider value={{ ...MEDIA_ARGS }}>
    <Chat {...args} />
  </ChatContext.Provider>
)

export const ChatStory = Template.bind({})

ChatStory.storyName = 'Default'
ChatStory.args = {
  ...CHAT_ARGS,
}

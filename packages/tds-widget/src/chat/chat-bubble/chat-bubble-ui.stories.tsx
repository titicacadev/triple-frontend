import type { Meta, StoryFn } from '@storybook/react'

import { ChatContext } from '../chat'
import { MessageType } from '../types'
import { MEDIA_ARGS, SAMPLE_IMAGES } from '../utils/constants'

import { ChatBubbleUI, ChatBubbleUIProps } from './chat-bubble-ui'

export default {
  title: 'chat / ChatBubbleUI',
  component: ChatBubbleUI,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['sent', 'received'],
      },
    },
    createdAt: {
      control: { type: 'date' },
    },
  },
} as Meta<typeof ChatBubbleUI>

const Template: StoryFn<ChatBubbleUIProps> = (args) => (
  <ChatContext.Provider value={{ ...MEDIA_ARGS }}>
    <ChatBubbleUI {...args} />
  </ChatContext.Provider>
)

export const Text = {
  render: Template,

  args: {
    type: 'sent',
    payload: {
      type: MessageType.TEXT,
      message: '안녕하세요\nhttps://www.google.com',
    },
    unreadCount: 1,
    createdAt: new Date(2022, 10, 1).toISOString(),
    profileName: '테스트계정',
  },
}

export const Image = {
  render: Template,

  args: {
    type: 'received',
    payload: { type: MessageType.IMAGES, images: SAMPLE_IMAGES },
    unreadCount: 1,
    createdAt: new Date(2022, 10, 1).toISOString(),
    profileName: '테스트계정',
  },
}

export const Rich = {
  render: Template,

  args: {
    type: 'received',
    payload: {
      type: MessageType.RICH,
      items: [
        { type: MessageType.TEXT, message: '안녕하세요.' },
        { type: MessageType.IMAGES, images: SAMPLE_IMAGES },
        {
          type: MessageType.BUTTON,
          label: '버튼 누르기',
          action: {
            type: MessageType.LINK,
            param: 'https://www.google.com',
          },
        },
      ],
    },
    unreadCount: 1,
    createdAt: new Date(2022, 10, 1).toISOString(),
    profileName: '테스트계정',
  },
}

export const FailedSentMessage = {
  render: Template,

  args: {
    type: 'sent',
    payload: {
      type: MessageType.RICH,
      items: [{ type: MessageType.TEXT, message: '안녕하세요.' }],
    },
    unreadCount: 1,
    createdAt: undefined,
    profileName: '테스트계정',
  },
}

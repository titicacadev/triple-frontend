import { Meta, StoryFn } from '@storybook/react'

import { TextBubble } from '../bubble/text'

import BubbleContainer, { BubbleContainerProp } from './bubble-container'

export default {
  title: 'chat / BubbleContainer',
  component: BubbleContainer,
} as Meta<typeof BubbleContainer>

const Template: StoryFn<BubbleContainerProp> = (args) => (
  <BubbleContainer {...args}>
    <TextBubble
      message={'안녕하세요\nhttps://www.google.com'}
      my={args.my}
      id="text-bubble"
    />
  </BubbleContainer>
)

export const SentBubbleContainer = {
  render: Template,
  argTypes: {
    my: {
      type: 'boolean',
      required: true,
    },
    createdAt: {
      type: 'date',
    },
    unreadCount: {
      type: 'number',
    },
    showInfo: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    my: true,
    createdAt: new Date(2022, 10, 1).toISOString(),
    unreadCount: null,
    showInfo: true,
  },
  thanks: { count: 1, haveMine: false },
}

export const ReceivedBubbleContainer = {
  render: Template,
  argTypes: {
    my: {
      type: 'boolean',
      required: true,
    },
    createdAt: {
      type: 'date',
    },
    unreadCount: {
      type: 'number',
    },
    showInfo: {
      control: {
        type: 'boolean',
      },
    },
    profile: {
      control: {
        type: 'object',
      },
    },
  },
  args: {
    my: false,
    createdAt: new Date(2022, 10, 1).toISOString(),
    unreadCount: null,
    showInfo: true,
    profile: {
      imageUrl:
        'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
      name: '테스트계정',
      userId: 'test',
      unregister: false,
    },
  },
}

import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import Replies from './replies'

export default {
  title: 'replies / Replies',
  component: Replies,
  argTypes: {
    resourceId: {
      type: 'string',
      required: true,
    },
    resourceType: {
      options: ['itinerary', 'review', 'article'],
      control: {
        type: 'select',
        required: true,
      },
    },
    placeholders: {
      reply: {
        type: 'string',
        required: false,
      },
      childReply: {
        type: 'string',
        required: false,
      },
    },
    size: {
      type: 'number',
      required: false,
      defaultValue: 10,
    },
    isFormFixed: {
      type: 'boolean',
      required: false,
    },
  },
} as ComponentMeta<typeof Replies>

export const Basic: ComponentStoryObj<typeof Replies> = {
  args: {
    resourceId: 'c31a0e75-0053-4ef2-9407-d2bdc7f116e3',
    resourceType: 'article',
    placeholders: {
      reply: '댓글을 입력하세요.',
      childReply: '답글을 입력하세요.',
    },
  },
}

import React from 'react'
import Replies, { ResourceType } from '@titicaca/replies'
import { Story } from '@storybook/react'

export default {
  title: 'Replies',
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
    registerPlaceholder: {
      type: 'string',
      required: false,
    },
    size: {
      type: 'number',
      required: false,
      defaultValue: 10,
    },
  },
}

const RepliesTemplate: Story<{
  resourceId: string
  resourceType: ResourceType
  registerPlaceholder?: string
  size?: number
  onClick: () => void
}> = (args) => <Replies {...args} />

export const BaseReplies = RepliesTemplate.bind({})

BaseReplies.args = {
  resourceId: '14a66dcf-b170-4edf-967b-b830d2362109',
  resourceType: 'itinerary',
}

BaseReplies.storyName = '기본 댓글'

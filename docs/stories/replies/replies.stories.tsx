import React from 'react'
import Replies, { ResourceType } from '@titicaca/replies'
import { Story } from '@storybook/react'

import { sessionContextProviderDecorator } from '../../decorators'

export default {
  title: 'Replies',
  component: Replies,
  decorators: [sessionContextProviderDecorator],
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
  resourceId: 'bb3addcf-1390-4f42-8a44-d7fc32d4a084',
  resourceType: 'itinerary',
}

BaseReplies.storyName = '기본 댓글'

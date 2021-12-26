import Replies from '@titicaca/replies'
import { ComponentStoryObj, Meta } from '@storybook/react'

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
} as Meta

export const BaseReplies: ComponentStoryObj<typeof Replies> = {
  storyName: '기본 댓글',
  args: {
    resourceId: 'bb3addcf-1390-4f42-8a44-d7fc32d4a084',
    resourceType: 'itinerary',
  },
}

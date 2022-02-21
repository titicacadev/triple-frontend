import Replies from '@titicaca/replies'
import { ComponentStoryObj, Meta } from '@storybook/react'

import {
  historyProviderDecorator,
  tripleClientMetadataDecorator,
} from '../../decorators'

export default {
  title: 'Replies',
  component: Replies,
  decorators: [historyProviderDecorator, tripleClientMetadataDecorator],
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
    replyPlaceholder: {
      type: 'string',
      required: false,
    },
    childReplyPlaceholder: {
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
    resourceId: 'c31a0e75-0053-4ef2-9407-d2bdc7f116e3',
    resourceType: 'article',
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { http, HttpResponse } from 'msw'
import { EventTrackingProvider } from '@titicaca/triple-web'

import { Replies } from './replies'

export default {
  title: 'tds-widget / replies / Replies',
  component: Replies,
  parameters: {
    msw: {
      handlers: [
        http.post<object, { content: string }>(
          '/api/reply/messages?contentFormat=plaintext',
          async ({ request }) => {
            const newReply = await request.json()
            return HttpResponse.json({
              id: 'new reply',
              parentId: undefined,
              blinded: false,
              deleted: false,
              isMine: true,
              childrenCount: 0,
              createdAt: new Date(2024, 1, 1).toString(),
              updatedAt: new Date(2024, 1, 1).toString(),
              reactions: {},
              content: { text: newReply.content },
              children: [],
              writer: {
                href: '',
                name: '트리플',
                profileImage: '',
                badges: [],
              },
              actionSpecifications: {
                delete: false,
                reaction: false,
                report: false,
              },
            })
          },
        ),
      ],
    },
  },
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
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
} as Meta<typeof Replies>

export const Basic: StoryObj<typeof Replies> = {
  args: {
    resourceId: 'c31a0e75-0053-4ef2-9407-d2bdc7f116e3',
    resourceType: 'article',
    placeholders: {
      reply: '댓글을 입력하세요.',
      childReply: '답글을 입력하세요.',
    },
  },
}

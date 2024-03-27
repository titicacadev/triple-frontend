import type { Meta, StoryObj } from '@storybook/react'
import { SessionContextProvider } from '@titicaca/react-contexts'
import { rest } from 'msw'

import Replies from './replies'

export default {
  title: 'replies / Replies',
  component: Replies,
  parameters: {
    msw: {
      handlers: [
        rest.post(
          '/api/reply/messages?contentFormat=plaintext',
          async (req, res, ctx) => {
            const newReply = await req.json()
            return res(
              ctx.json({
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
              }),
            )
          },
        ),
      ],
    },
  },
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
  decorators: [
    (Story) => (
      <SessionContextProvider
        type="browser"
        props={{
          initialUser: undefined,
          initialSessionAvailability: true,
        }}
      >
        <Story />
      </SessionContextProvider>
    ),
  ],
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

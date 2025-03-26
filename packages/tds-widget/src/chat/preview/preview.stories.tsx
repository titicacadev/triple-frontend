import type { Meta, StoryFn } from '@storybook/react'

import { RoomType, UserType } from '../types'

import { Preview, PreviewProps } from './preview'

export default {
  title: 'tds-widget / chat / Preview',
  component: Preview,
} as Meta<typeof Preview>

const Template: StoryFn<PreviewProps<RoomType, UserType>> = (args) => (
  <Preview {...args} />
)

export const Default = {
  render: Template,

  args: {
    titleMessageContainerStyle: {
      css: {
        margin: '0 65px 0 0',
      },
    },
    chatRoom: {
      id: 'test1',
      createdAt: '2025-03-12T05:47:38.956Z',
      type: 'interpark-tna-product',
      privateChannel: true,
      name: 'DEV',
      isDirect: false,
      lastMessageId: '14039',
      memberIds: ['test2', 'test3'],
      members: [
        {
          id: 'test3',
          createdAt: '2022-01-21T07:59:44.652Z',
          type: 'TNA_PARTNER',
          identifier: '130',
          code: 'TEST_PARTNER',
          profile: {
            name: '노출 파트너명',
            thumbnail: '',
            message: '',
          },
        },
        {
          id: 'test2',
          createdAt: '2025-01-31T01:01:00.085Z',
          type: 'INTERPARK_USER',
          identifier: '1000',
          code: 'test',
          profile: {
            name: '테스트',
            thumbnail: '',
            message: '',
          },
        },
      ],
      lastMessage: {
        id: '14039',
        createdAt: '2025-03-10T04:14:12.701Z',
        roomId: 'test1',
        senderId: 'test2',
        displayTarget: 'all',
        payload: {
          type: 'text',
          message: 'TF14입니닷',
        },
      },
      memberCounts: 2,
      unreadCount: 4,
    },
    me: {
      id: 'test3',
      createdAt: '2022-01-21T07:59:44.652Z',
      type: 'TNA_PARTNER',
      identifier: '130',
      code: 'TEST_PARTNER',
      profile: {
        name: '노출 파트너명',
        thumbnail: '',
        message: '',
      },
      channel: {
        channel: 'TRIPLE_CHAT_USER_CHANNEL_test3',
        events: {
          unread: 'TRIPLE_CHAT_USER_UNREAD_test3',
          send: 'TRIPLE_CHAT_USER_SEND_test3',
          join: 'TRIPLE_CHAT_ROOM_JOIN_test3',
          refresh: 'REFRESH',
        },
        needAuth: false,
      },
    },
    handleRoomClick: () => {},
  },
}

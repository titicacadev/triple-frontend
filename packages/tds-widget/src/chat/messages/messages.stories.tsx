import { ComponentProps } from 'react'
import { createGlobalStyle } from 'styled-components'

import {
  ScrollProvider,
  ChatRoomMessages as NolMessageComponent,
} from '../chat'
import {
  NOL_PARTNER_ROOM_BUBBLE_INFO_STYLE,
  NOL_PARTNER_ROOM_BUBBLE_STYLE as BASE_NOL_PARTNER_ROOM_BUBBLE_STYLE,
} from '../bubble'
import { NolThemeProvider } from '../nol-theme-provider'
import { NOL_COLOR } from '../nol-theme-provider/constants'

import MessagesComponent from './'

export default {
  title: 'tds-widget / chat / Messages',
  component: MessagesComponent,
  render: (args: ComponentProps<typeof MessagesComponent>) => (
    <ScrollProvider>
      <MessagesComponent {...args} />
    </ScrollProvider>
  ),
}

export const Messages = {
  args: {
    messages: [
      {
        type: 'text',
        value: { message: '안녕하세요.' },
        id: 'text message',
        sender: {
          id: 'test user',
          profile: {
            name: 'test user',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
        thanks: { count: 1, haveMine: false },
        parentMessage: {
          id: 'parent_message',
          type: 'text',
          blinded: false,
          value: { message: '안녕하세요' },
          sender: {
            profile: { name: '트리플' },
            unregistered: false,
          },
        },
      },
      {
        type: 'another',
        value: { text: 'Another Message.' },
        id: 'another message',
        sender: {
          id: 'test user',
          profile: {
            name: 'test user',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
      },
      {
        type: 'text',
        value: {
          message: '안녕하세요. 이 메시지는 삭제된 메시지 테스트용입니다.',
        },
        id: 'deleted message',
        deleted: true,
        sender: {
          id: 'test user',
          profile: {
            name: 'test user',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
      },
      {
        type: 'product',
        value: {
          product: {
            customerBookingStatus: 'BOOKED',
            productName: '상품 이름',
            productThumbnail:
              'https://media.triple.guide/triple-cms/c_limit,f_auto,w_1024/3ec44da6-ef5f-4804-bdd8-ab9aebc28e2b.jpeg',
          },
        },
        id: 'product message',
        sender: {
          id: 'test user',
          profile: {
            name: 'test user',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
      },
      {
        type: 'text',
        value: { message: '안녕하세요.' },
        id: 'my text message',
        sender: {
          id: 'test',
          profile: {
            name: 'test',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
      },
      {
        type: 'images',
        id: 'image message',
        value: {
          images: [
            {
              id: 'test image',
              sizes: {
                large: {
                  url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
                },
              },
            },
          ],
        },
        sender: {
          id: 'test user',
          profile: {
            name: 'test user',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
      },
      {
        type: 'images',
        id: 'image message2',
        value: {
          images: [
            {
              id: 'test image',
              sizes: {
                large: {
                  url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
                },
              },
            },
            {
              id: 'test image2',
              sizes: {
                large: {
                  url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
                },
              },
            },
          ],
        },
        sender: {
          id: 'test user',
          profile: {
            name: 'test user',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 2).toISOString(),
      },
    ],
    pendingMessages: [],
    failedMessages: [],
    me: {
      id: 'test',
      profile: {
        name: '테스트',
        photo:
          'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
      },
    },
    customBubble: {
      another: (message: { id: string; value: { text: string } }) => {
        return (
          <div key={message.id} css={{ display: 'inline-block' }}>
            {message.value.text}
          </div>
        )
      },
    },
    hasDateDivider: true,
  },
}

export const MessagesWithDateDivider = {
  args: {
    messages: [
      {
        type: 'text',
        value: { message: '안녕하세요.' },
        id: 'text message 1',
        sender: {
          id: 'test user',
          profile: {
            name: 'test user',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1, 10, 30).toISOString(),
        thanks: { count: 1, haveMine: false },
      },
      {
        type: 'text',
        value: { message: '상단 메세지와 같은 날짜 + 같은 시간' },
        id: 'text message 2',
        sender: {
          id: 'test user',
          profile: {
            name: 'test user',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1, 10, 30).toISOString(),
        thanks: { count: 1, haveMine: false },
      },
      {
        type: 'text',
        value: { message: '상단 메세지와 같은 날짜 + 다른 시간' },
        id: 'text message 3',
        sender: {
          id: 'test user',
          profile: {
            name: 'test user',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1, 10, 31).toISOString(),
        thanks: { count: 1, haveMine: false },
      },
      {
        type: 'text',
        value: {
          message: '상단 메세지와 다른 날짜',
        },
        id: 'text message 4',
        sender: {
          id: 'test user',
          profile: {
            name: 'test user',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 2, 10, 30).toISOString(),
      },
      {
        type: 'text',
        value: { message: '보낸 첫 메세지' },
        id: 'my text message 1',
        sender: {
          id: 'test',
          profile: {
            name: 'test',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 2, 10, 32).toISOString(),
      },
      {
        type: 'text',
        value: { message: '상단 메세지와 같은 날짜 + 같은 시간' },
        id: 'my text message 2',
        sender: {
          id: 'test',
          profile: {
            name: 'test',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 2, 10, 32).toISOString(),
      },
      {
        type: 'text',
        value: { message: '상단 메세지와 같은 날짜 + 다른 시간' },
        id: 'my text message 3',
        sender: {
          id: 'test',
          profile: {
            name: 'test',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 2, 10, 33).toISOString(),
      },
      {
        type: 'text',
        value: { message: '상단 메세지와 다른 날짜' },
        id: 'my text message 4',
        sender: {
          id: 'test',
          profile: {
            name: 'test',
            photo:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 3, 10, 30).toISOString(),
      },
    ],
    pendingMessages: [],
    failedMessages: [],
    me: {
      id: 'test',
      profile: {
        name: '테스트',
        photo:
          'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
      },
    },
    hasDateDivider: true,
  },
}

const NolGlobalStyle = createGlobalStyle`
  html {
    text-size-adjust: none;
    -webkit-touch-callout: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 62.5%;
    background-color: #fff;
  }

  body {
    font-weight: normal;
    font-size: 1.3rem;
    line-height: 1.3;

    * {
      letter-spacing: 0;
      word-spacing: 0;
    }
  }
`

export const NolMessages = {
  render: (args: ComponentProps<typeof NolMessageComponent>) => (
    <NolThemeProvider theme={NOL_COLOR}>
      <ScrollProvider>
        <NolGlobalStyle />
        <NolMessageComponent {...args} />
      </ScrollProvider>
    </NolThemeProvider>
  ),
  args: {
    messages: [
      {
        payload: {
          type: 'rich',
          items: [
            {
              type: 'button',
              label: '버튼 메시지 바로가기',
              action: { type: 'link', param: 'https://www.triple.guide' },
            },
          ],
        },
        id: 'button message',
        sender: {
          roomMemberId: 'test user',
          profile: {
            name: 'test user',
            thumbnail:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
        thanks: { count: 1, haveMine: false },
      },
      {
        payload: {
          type: 'rich',
          items: [
            {
              type: 'button',
              label: '버튼 메시지 바로가기 disabled',
              action: { type: 'link', param: 'https://www.triple.guide' },
            },
          ],
        },
        disabled: true,
        id: 'button message disabled',
        sender: {
          roomMemberId: 'test user',
          profile: {
            name: 'test user',
            thumbnail:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
        thanks: { count: 1, haveMine: false },
      },
      {
        payload: {
          type: 'rich',
          items: [
            {
              type: 'button',
              label: '버튼 메시지 바로가기',
              action: { type: 'link', param: 'https://www.triple.guide' },
            },
          ],
        },
        id: 'my button message',
        sender: {
          roomMemberId: 'test',
          profile: {
            name: 'test',
            thumbnail:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
        thanks: { count: 1, haveMine: false },
      },
      {
        payload: {
          type: 'text',
          message: '안녕하세요.',
        },
        id: 'text message',
        sender: {
          roomMemberId: 'test user',
          profile: {
            name: 'test user',
            thumbnail:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
        thanks: { count: 1, haveMine: false },
      },
      {
        payload: {
          type: 'text',
          message: '안녕하세요.',
        },
        id: 'my text message',
        sender: {
          roomMemberId: 'test',
          profile: {
            name: 'test',
            thumbnail:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
      },
      {
        payload: {
          type: 'text',
          message: '연속 두번째로 보내는 메시지 입니다.',
        },
        id: 'my text message 2',
        sender: {
          roomMemberId: 'test',
          profile: {
            name: 'test',
            thumbnail:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
      },
      {
        id: 'my coupon message',
        payload: {
          type: 'coupon',
          coupon: {
            name: '빨리 예약하세요~ 오늘까지만 사용 가능한 쿠폰~',
            discount: {
              type: 'AMOUNT',
              value: 5000,
              maxDiscountAmount: 5000,
            },
            period: {
              startAt: '2025-05-23T00:00:00+09:00',
              endAt: '2035-05-24T00:00:00+09:00',
            },
            code: 'KYCHS7TFRJ577XLA',
            propertyId: '10003136',
            type: 'RANDOM',
          },
        },
        sender: {
          roomMemberId: 'test',
          profile: {
            name: 'test',
            thumbnail:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
      },
      {
        id: 'coupon message',
        payload: {
          type: 'coupon',
          coupon: {
            name: '빨리 예약하세요~ 오늘까지만 사용 가능한 쿠폰~',
            discount: {
              type: 'AMOUNT',
              value: 5000,
              maxDiscountAmount: 5000,
            },
            period: {
              startAt: '2025-05-23T00:00:00+09:00',
              endAt: '2035-05-24T00:00:00+09:00',
            },
            code: 'KYCHS7TFRJ577XLA',
            propertyId: '10003136',
            type: 'RANDOM',
          },
        },
        sender: {
          roomMemberId: 'test user',
          profile: {
            name: 'test user',
            thumbnail:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
      },
    ],
    pendingMessages: [
      {
        payload: {
          type: 'text',
          message: '보내는 중인 메시지.',
        },
        id: 'text message pending',
        sender: {
          roomMemberId: 'test',
          profile: {
            name: 'test',
            thumbnail:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
        createdAt: new Date(2022, 10, 1).toISOString(),
      },
    ],
    failedMessages: [
      {
        payload: {
          type: 'text',
          message: '실패한 메시지 메시지.',
        },
        id: 'text message pending',
        sender: {
          roomMemberId: 'test',
          profile: {
            name: 'test',
            thumbnail:
              'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
          },
          unregistered: false,
          unfriended: false,
        },
      },
    ],
    me: {
      roomMemberId: 'test',
      profile: {
        name: '테스트',
        thumbnail:
          'https://assets.triple-dev.titicaca-corp.com/images/app-download@2x.png',
      },
    },
    customBubble: {
      another: (message: { id: string; value: { text: string } }) => {
        return (
          <div key={message.id} css={{ display: 'inline-block' }}>
            {message.value.text}
          </div>
        )
      },
    },
    hasDateDivider: true,
    displayTarget: 'TNA_PARTNER',
    onRetry: () => {},
    onRetryCancel: () => {},
    bubbleStyle: {
      ...BASE_NOL_PARTNER_ROOM_BUBBLE_STYLE,
      sent: BASE_NOL_PARTNER_ROOM_BUBBLE_STYLE.white,
      received: BASE_NOL_PARTNER_ROOM_BUBBLE_STYLE.blue,
    },
    bubbleInfoStyle: NOL_PARTNER_ROOM_BUBBLE_INFO_STYLE,
    showProfilePhoto: false,
    spacing: { message: 6 },
    shouldSplitRichMessage: true,
  },
}

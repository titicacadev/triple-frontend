import { ScrollProvider } from '../chat'

import Messages from './'

export default {
  title: 'chat / Messages',
  component: Messages,
  render: (args) => (
    <ScrollProvider>
      <Messages {...args} />
    </ScrollProvider>
  ),
}

export const Message = {
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
    pendingMessages: [
      {
        type: 'text',
        value: { message: 'Pending Message' },
        id: 'failed message',
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
      },
    ],
    failedMessages: [
      {
        type: 'text',
        value: { message: '안녕하세요.' },
        id: 'failed message',
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
      },
    ],
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

export const MessageWithTime = {
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

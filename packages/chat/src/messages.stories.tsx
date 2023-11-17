import Messages from './messages'

export default {
  title: 'chat / Messages',
  component: Messages,
}

export const Message = {
  args: {
    messages: [
      {
        type: 'text',
        value: { message: '안녕하세요.' },
        id: 'test',
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
        id: 'test',
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
        id: 'test',
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
    ],
    pendingMessages: [],
    failedMessages: [
      {
        type: 'text',
        value: { message: '안녕하세요.' },
        id: 'test',
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
  },
}

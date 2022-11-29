import { MessageType, MetaDataInterface, UserType } from '../../types'
import { ChatContextValue } from '../../chat'
import { ChatProps } from '../../chat/chat'

export const SAMPLE_IMAGES: MetaDataInterface[] = [
  {
    cloudinaryId: '70c9db60-cd42-49c3-b6a8-274318695cc2',
    width: 1024,
    height: 1024,
    cloudinaryBucket: '',
    id: '1',
    type: '',
    sizes: {
      full: {
        url: '',
      },
      large: {
        url: '',
      },
      smallSquare: {
        url: '',
      },
    },
  },
]

const empty = () => {}

export const MEDIA_ARGS: ChatContextValue = {
  cloudinaryName: 'triple-cms',
  mediaUrlBase: 'https://media.triple.guide',
  textBubbleFontSize: 'medium',
  textBubbleMaxWidthOffset: 100,
  onRichBubbleButtonBeforeRouting: empty,
  onImageBubbleClick: empty,
  onTextBubbleClick: empty,
}

export const CHAT_ARGS: ChatProps = {
  displayTarget: UserType.TNA_PARTNER,
  userInfo: {
    me: {
      id: '61ea67f0de3e37001997a80f',
      type: UserType.TNA_PARTNER,
      identifier: '130',
      code: 'TNA_BPM',
      profile: {
        name: 'TNA_BPM',
        thumbnail:
          'https://s3.ap-northeast-2.amazonaws.com/triple-tna-dev/partner/logo/1e2496ab-8725-4df4-84c7-db9804d3c71d.jpeg',
        message: '',
      },
    },
    others: [
      {
        id: '6344be9953749900140bca42',
        type: UserType.TRIPLE_USER,
        identifier: '4043',
        code: '_KA2408084137-1661761357899',
        profile: {
          name: '후라이',
          thumbnail:
            'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/52557846-363d-430a-9afd-1cd7fd4fe0b4.jpeg',
          message: '',
        },
      },
    ],
  },
  getMessages: async () => {
    return [
      {
        id: 4562,
        roomId: '6344c73a53749900140bca43',
        createdAt: '2022-11-03T06:44:57.017Z',
        senderId: '61ea67f0de3e37001997a80f',
        displayTarget: [UserType.TRIPLE_USER],
        payload: {
          type: MessageType.RICH,
          items: [
            {
              message:
                '안녕하세요.\nTNA_BPM입니다. 예약해주셔서 감사합니다!\n\n궁금한 점이 있으시면 TNA_BPM 문의를 편하게 이용해주세요.',
              type: MessageType.TEXT,
            },
            {
              label: '예약상세 바로가기',
              action: {
                type: MessageType.LINK,
                param: 'https://triple.guide/',
              },
              type: MessageType.BUTTON,
            },
          ],
        },
        alternative: {
          type: MessageType.TEXT,
          message:
            '안녕하세요.\nTNA_BPM입니다. 예약해주셔서 감사합니다!\n\n궁금한 점이 있으시면 TNA_BPM 문의를 편하게 이용해주세요.',
        },
      },
      {
        id: 5749,
        roomId: '6344c73a53749900140bca43',
        senderId: '6344be9953749900140bca42',
        createdAt: '2022-11-03T06:44:57.017Z',
        displayTarget: 'all',
        payload: {
          type: MessageType.TEXT,
          message: '테스트 메시지',
        },
      },
    ]
  },
  room: {
    id: '6344c73a53749900140bca43',
    createdAt: '2022-10-11T01:30:34.519Z',
    name: '',
    isDirect: true,
    lastMessageId: 5749,
    members: [
      {
        id: '61ea67f0de3e37001997a80f',
        type: UserType.TNA_PARTNER,
        identifier: '130',
        code: 'TNA_BPM',
        profile: {
          name: 'TNA_BPM',
          thumbnail:
            'https://s3.ap-northeast-2.amazonaws.com/triple-tna-dev/partner/logo/1e2496ab-8725-4df4-84c7-db9804d3c71d.jpeg',
          message: '',
        },
      },
      {
        id: '6344be9953749900140bca42',
        type: UserType.TRIPLE_USER,
        identifier: '4043',
        code: '1',
        profile: {
          name: '후라이',
          thumbnail:
            'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/52557846-363d-430a-9afd-1cd7fd4fe0b4.jpeg',
          message: '',
        },
      },
    ],
    lastMessage: {
      id: 5749,
      createdAt: '2022-11-03T06:44:57.017Z',
      roomId: '6344c73a53749900140bca43',
      senderId: '6344be9953749900140bca42',
      displayTarget: 'all',
      payload: {
        type: MessageType.TEXT,
        message: '테스트 메시지',
      },
    },
    unreadCount: 0,
  },
  postMessage: async (payload) => {
    return {
      success: true,
      newMessages: [
        {
          id: 490999,
          roomId: '6344c73a53749900140bca43',
          senderId: '6344be9953749900140bca42',
          createdAt: '2022-11-04T06:44:57.017Z',
          displayTarget: 'all',
          payload,
        },
      ],
    }
  },
}

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@titicaca/tds-theme'
import { render, screen, waitFor } from '@testing-library/react'
import { ClientAppName, EventTrackingProvider } from '@titicaca/triple-web'
import { createTestWrapper } from '@titicaca/triple-web-test-utils'

import { RepliesProvider } from './context'
import { Reply } from './list/reply'
import { Reply as ReplyType } from './types'

jest.mock('@titicaca/triple-web')
jest.mock('@titicaca/router')
const onFocusInput = jest.fn()
const fetchMoreReplies = jest.fn()

jest.mock('@titicaca/triple-web', () => ({
  ...jest.requireActual('@titicaca/triple-web'),
  useClientAppCallback: jest.fn().mockImplementation(() => jest.fn()),
  useSessionCallback: jest.fn().mockImplementation(() => jest.fn()),
}))
jest.mock('@titicaca/router', () => ({
  ...jest.requireActual('@titicaca/router'),
  useNavigate: jest.fn().mockImplementation(() => ({
    navigate: jest.fn(),
    openWindow: jest.fn(),
  })),
}))
jest.mock('./replies-api-client')

beforeEach(() => {
  jest.clearAllMocks()
})

const MOCKED_REPLY = {
  id: '00000000-0000-0000-0000-00000000000',
  writer: {
    href: '/my',
    name: '테스트_닉네임',
    profileImage:
      'https://media.triple.guide/triple-dev/image/upload/w_256,h_256,c_thumb,f_auto/v1620873995/ckeqqm84ovq7daqmx0oz.jpg',
    badges: [],
  },
  content: {
    text: '댓글&답글 작성 내용',
  },
  children: [],
  childrenCount: 0,
  isMine: true,
  createdAt: '2022-01-13T06:05:08.668Z',
  updatedAt: '2022-01-13T06:05:08.668Z',
  blinded: false,
  deleted: false,
  actionSpecifications: {
    reaction: true,
    report: false,
    delete: true,
    reply: {
      toMessageId: '00000000-0000-0000-0000-00000000000',
      mentioningUserName: 'TripleTester',
      mentioningUserUid: 'USER_UUID',
      mentioningUserHref: '/users/USER_UUID',
    },
    edit: {
      plaintext: '댓글&답글 작성 내용',
    },
  },
}

describe('좋아요 수에 따른 문구 노출 조건을 테스트합니다.', () => {
  test('갯수가 양수일 때, 좋아요 문구 및 갯수를 노출합니다.', async () => {
    const reply = generateMockReply({
      reactions: {
        like: {
          count: 1,
          haveMine: false,
        },
      },
    })

    render(
      <ThemeProvider theme={defaultTheme}>
        <EventTrackingProvider page={{ label: 'test', path: '/test' }} utm={{}}>
          <RepliesProvider>
            <Reply
              reply={reply}
              focusInput={onFocusInput}
              fetchMoreReplies={fetchMoreReplies}
            />
          </RepliesProvider>
        </EventTrackingProvider>
      </ThemeProvider>,
      {
        wrapper: createTestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
          },
        }),
      },
    )

    const likeCountElement = screen.queryByText(/좋아요/)

    await waitFor(() => {
      expect(likeCountElement).toBeInTheDocument()
    })
  })

  test('갯수가 0일 때, 좋아요 문구 및 갯수를 노출하지 않습니다.', async () => {
    const reply = generateMockReply({
      reactions: {
        like: {
          count: 0,
          haveMine: false,
        },
      },
    })

    render(
      <ThemeProvider theme={defaultTheme}>
        <EventTrackingProvider page={{ label: 'test', path: '/test' }} utm={{}}>
          <RepliesProvider>
            <Reply
              reply={reply}
              focusInput={onFocusInput}
              fetchMoreReplies={fetchMoreReplies}
            />
          </RepliesProvider>
        </EventTrackingProvider>
      </ThemeProvider>,
      {
        wrapper: createTestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
          },
        }),
      },
    )

    const likeCountElement = screen.queryByText(/좋아요/)

    await waitFor(() => {
      expect(likeCountElement).not.toBeInTheDocument()
    })
  })

  test('갯수가 음수일 때, 좋아요 문구 및 갯수를 노출하지 않습니다.', async () => {
    const reply = generateMockReply({
      reactions: {
        like: {
          count: -1,
          haveMine: false,
        },
      },
    })

    render(
      <ThemeProvider theme={defaultTheme}>
        <EventTrackingProvider page={{ label: 'test', path: '/test' }} utm={{}}>
          <RepliesProvider>
            <Reply
              reply={reply}
              focusInput={onFocusInput}
              fetchMoreReplies={fetchMoreReplies}
            />
          </RepliesProvider>
        </EventTrackingProvider>
      </ThemeProvider>,
      {
        wrapper: createTestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
          },
        }),
      },
    )

    const likeCountElement = screen.queryByText(/좋아요/)

    await waitFor(() => {
      expect(likeCountElement).not.toBeInTheDocument()
    })
  })
})

function generateMockReply(reactions: Pick<ReplyType, 'reactions'>) {
  return { ...MOCKED_REPLY, ...reactions }
}

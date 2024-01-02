import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@titicaca/tds-theme'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import {
  ClientAppName,
  EventTrackingProvider,
  TestWrapper,
} from '@titicaca/triple-web'

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
jest.mock('@titicaca/ui-flow')
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
        wrapper: TestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
          },
          userAgentProvider: {
            ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
            browser: { name: 'WebKit', version: '605.1.15', major: '605' },
            engine: { name: 'WebKit', version: '605.1.15' },
            os: { name: 'iOS', version: '13.3.1' },
            device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
            cpu: { architecture: undefined },
            isMobile: true,
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
        wrapper: TestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
          },
          userAgentProvider: {
            ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
            browser: { name: 'WebKit', version: '605.1.15', major: '605' },
            engine: { name: 'WebKit', version: '605.1.15' },
            os: { name: 'iOS', version: '13.3.1' },
            device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
            cpu: { architecture: undefined },
            isMobile: true,
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
        wrapper: TestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
          },
          userAgentProvider: {
            ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
            browser: { name: 'WebKit', version: '605.1.15', major: '605' },
            engine: { name: 'WebKit', version: '605.1.15' },
            os: { name: 'iOS', version: '13.3.1' },
            device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
            cpu: { architecture: undefined },
            isMobile: true,
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

describe('로그인한 사용자의 좋아요 클릭 액션을 테스트합니다.', () => {
  test('좋아요를 클릭했던 사용자가 다시 클릭하면, 좋아요 갯수를 -1 합니다.', async () => {
    const reply = generateMockReply({
      reactions: {
        like: {
          count: 2,
          haveMine: true,
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
        wrapper: TestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
          },
          sessionProvider: {
            user: {
              name: 'TripleTester',
              provider: 'TRIPLE',
              country: 'ko',
              lang: 'ko',
              unregister: null,
              photo: 'images.source',
              mileage: {
                badges: [{ icon: { imageUrl: '' } }],
                level: 1,
                point: 0,
              },
              uid: 'USER_UUID',
            },
          },
          userAgentProvider: {
            ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
            browser: { name: 'WebKit', version: '605.1.15', major: '605' },
            engine: { name: 'WebKit', version: '605.1.15' },
            os: { name: 'iOS', version: '13.3.1' },
            device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
            cpu: { architecture: undefined },
            isMobile: true,
          },
        }),
      },
    )

    const unlikeButtonElement = screen.getByRole('button', {
      name: /unlike-button/i,
    })

    const beforeLikeCount = reply.reactions.like?.count || 0

    fireEvent.click(unlikeButtonElement)

    const afterLikeCount = await screen.findByText(/좋아요/)

    expect(afterLikeCount).toHaveTextContent(`좋아요 ${beforeLikeCount - 1}`)
  })

  test('좋아요를 클릭하지 않았던 사용자가 클릭하면, 좋아요 갯수를 +1 합니다.', async () => {
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
        wrapper: TestWrapper({
          clientAppProvider: {
            device: { autoplay: 'always', networkType: 'unknown' },
            metadata: { name: ClientAppName.iOS, version: '6.5.0' },
          },
          sessionProvider: {
            user: {
              name: 'TripleTester',
              provider: 'TRIPLE',
              country: 'ko',
              lang: 'ko',
              unregister: null,
              photo: 'images.source',
              mileage: {
                badges: [{ icon: { imageUrl: '' } }],
                level: 1,
                point: 0,
              },
              uid: 'USER_UUID',
            },
          },
          userAgentProvider: {
            ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
            browser: { name: 'WebKit', version: '605.1.15', major: '605' },
            engine: { name: 'WebKit', version: '605.1.15' },
            os: { name: 'iOS', version: '13.3.1' },
            device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
            cpu: { architecture: undefined },
            isMobile: true,
          },
        }),
      },
    )

    const likeButtonElement = screen.getByRole('button', {
      name: /like-button/i,
    })

    const beforeLikeCount = reply.reactions.like?.count || 0

    fireEvent.click(likeButtonElement)

    const afterLikeCount = await screen.findByText(/좋아요/)

    expect(afterLikeCount).toHaveTextContent(`좋아요 ${beforeLikeCount + 1}`)
  })
})

function generateMockReply(reactions: Pick<ReplyType, 'reactions'>) {
  return { ...MOCKED_REPLY, ...reactions }
}

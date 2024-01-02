import { PropsWithChildren } from 'react'
import i18n from 'i18next'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import {
  ClientAppName,
  EventTrackingProvider,
  TripleWeb,
  useClientAppCallback,
  useSessionCallback,
} from '@titicaca/triple-web'
import { useNavigate } from '@titicaca/router'

import { RepliesProvider } from './context'
import { Reply } from './list/reply'
import { Reply as ReplyType } from './types'

jest.mock('@titicaca/triple-web')
jest.mock('@titicaca/router')
jest.mock('./replies-api-client')

beforeEach(() => {
  ;(
    useNavigate as unknown as jest.MockedFunction<
      () => ReturnType<typeof useNavigate>
    >
  ).mockImplementation(() => {
    return { navigate: () => {}, openWindow: () => {} }
  })
  ;(
    useClientAppCallback as unknown as jest.MockedFunction<
      typeof useClientAppCallback
    >
  ).mockImplementation((_, fn) => fn)
  ;(
    useSessionCallback as unknown as jest.MockedFunction<
      typeof useSessionCallback
    >
  )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .mockImplementation((fn) => {
      return fn
    })
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
      mentioningUserName: '테스트_닉네임',
      mentioningUserUid: 'USER_UUID',
      mentioningUserHref: '/users/USER_UUID',
    },
    edit: {
      plaintext: '댓글&답글 작성 내용',
    },
  },
}

const onFocusInput = jest.fn()
const fetchMoreReplies = jest.fn()

describe('리액션 관련 기능을 테스트합니다.', () => {
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
        <Reply
          reply={reply}
          focusInput={onFocusInput}
          fetchMoreReplies={fetchMoreReplies}
        />,
        { wrapper: ReplyWithLoginWrapper },
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
        <Reply
          reply={reply}
          focusInput={onFocusInput}
          fetchMoreReplies={fetchMoreReplies}
        />,
        { wrapper: ReplyWithLoginWrapper },
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
        <Reply
          reply={reply}
          focusInput={onFocusInput}
          fetchMoreReplies={fetchMoreReplies}
        />,
        { wrapper: ReplyWithLoginWrapper },
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
        <Reply
          reply={reply}
          focusInput={onFocusInput}
          fetchMoreReplies={fetchMoreReplies}
        />,
        { wrapper: ReplyWithLoginWrapper },
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
        <Reply
          reply={reply}
          focusInput={onFocusInput}
          fetchMoreReplies={fetchMoreReplies}
        />,
        { wrapper: ReplyWithLoginWrapper },
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
})

function generateMockReply(reactions: Pick<ReplyType, 'reactions'>) {
  return { ...MOCKED_REPLY, ...reactions }
}

function ReplyWithLoginWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <TripleWeb
      clientAppProvider={{
        metadata: {
          name: ClientAppName.iOS,
          version: '6.5.0',
        },
        device: {
          autoplay: 'always',
          networkType: 'wifi',
        },
      }}
      envProvider={{
        appUrlScheme: 'dev-soto',
        webUrlBase: 'https://triple-dev.titicaca-corp.com',
        facebookAppId: '',
        defaultPageTitle: '',
        defaultPageDescription: '',
        googleMapsApiKey: 'AIzaSyDuSWU_yBwuQzeyRFcTqhyifqNX_8oaXI4',
        afOnelinkId: '',
        afOnelinkPid: '',
        afOnelinkSubdomain: '',
      }}
      sessionProvider={{
        user: null,
      }}
      i18nProvider={{
        i18n,
        lang: 'ko',
      }}
      userAgentProvider={{
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;Triple-iOS/6.5.0',
        browser: { name: 'WebKit', version: '605.1.15', major: '605' },
        engine: { name: 'WebKit', version: '605.1.15' },
        os: { name: 'iOS', version: '13.3.1' },
        device: { vendor: 'Apple', model: 'iPhone', type: 'mobile' },
        cpu: { architecture: undefined },
        isMobile: true,
      }}
    >
      <EventTrackingProvider page={{ label: 'test', path: '/test' }} utm={{}}>
        <RepliesProvider>{children}</RepliesProvider>
      </EventTrackingProvider>
    </TripleWeb>
  )
}

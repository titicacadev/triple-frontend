import { authGuardedFetchers } from '@titicaca/fetcher'

import {
  fetchReplies,
  fetchChildReplies,
  deleteReply,
  authorMessage,
} from './replies-api-client'
import { ResourceType, Reply } from './types'

jest.mock('@titicaca/fetcher')

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
  reactions: {},
}

type CustomJestFn = jest.MockedFunction<
  () => Promise<{
    ok: boolean
    parsedBody: unknown
  }>
>

const mockedAuthGuardedFetchers = {
  get: authGuardedFetchers.get as unknown as CustomJestFn,
  post: authGuardedFetchers.post as unknown as CustomJestFn,
  del: authGuardedFetchers.del as unknown as CustomJestFn,
  put: authGuardedFetchers.put as unknown as CustomJestFn,
}

beforeEach(() => {
  mockedAuthGuardedFetchers.get.mockClear()
  mockedAuthGuardedFetchers.post.mockClear()
  mockedAuthGuardedFetchers.del.mockClear()
  mockedAuthGuardedFetchers.put.mockClear()
})

describe('Get Replies', () => {
  test('올바른 요청일 때, 10개의 Reply를 반환합니다.', async () => {
    mockedAuthGuardedFetchers.get.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        parsedBody: [MOCKED_REPLY],
      }),
    )

    const replies = await fetchReplies({
      resourceId: 'resource_id',
      resourceType: 'article',
      page: 0,
      size: 10,
    })

    expect(replies).toStrictEqual([MOCKED_REPLY])
  })

  test('올바르지 않은 요청일 때, 빈 배열을 반환합니다.', async () => {
    mockedAuthGuardedFetchers.get.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        parsedBody: [],
      }),
    )

    const replies = await fetchReplies({
      resourceId: 'resource_id',
      resourceType: 'article',
      page: 0,
      size: 10,
    })

    expect(replies).toStrictEqual([])
  })
})

describe('Get ChildReplies', () => {
  test('올바른 요청일 때, 3개의 ChildReply를 반환합니다.', async () => {
    const mockedBody = [
      {
        ...MOCKED_REPLY,
        id: '1',
      },
      {
        ...MOCKED_REPLY,
        id: '2',
      },
      {
        ...MOCKED_REPLY,
        id: '3',
      },
    ]

    mockedAuthGuardedFetchers.get.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        parsedBody: mockedBody,
      }),
    )

    const childReply = await fetchChildReplies({
      id: 'parent_reply_id',
    })

    expect(childReply).toStrictEqual(mockedBody)
  })

  test('올바르지 않은 요청일 때, 빈 배열을 반환합니다.', async () => {
    mockedAuthGuardedFetchers.get.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        parsedBody: undefined,
      }),
    )

    const childReply = await fetchChildReplies({
      id: 'parent_reply_id',
    })

    expect(childReply).toStrictEqual([])
  })
})

describe('Delete Reply', () => {
  test('올바른 요청일 때, 삭제된 reply를 반환합니다.', async () => {
    const mockedBodyWithDeletedReply = {
      ...MOCKED_REPLY,
      id: '1',
    }

    mockedAuthGuardedFetchers.del.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        parsedBody: mockedBodyWithDeletedReply,
      }),
    )

    const deletedReply = await deleteReply({
      currentMessageId: mockedBodyWithDeletedReply.id,
    })

    expect(deletedReply).toStrictEqual(mockedBodyWithDeletedReply)
  })

  test('올바르지 않은 요청일 때, undefined를 반환합니다.', async () => {
    mockedAuthGuardedFetchers.del.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        parsedBody: undefined,
      }),
    )

    const deletedReply = await deleteReply({ currentMessageId: '1' })

    expect(deletedReply).toBeUndefined()
  })
})

describe('Author Message', () => {
  const mockedBaseReplyProps = {
    resourceId: 'resource_id',
    resourceType: 'resource_type' as ResourceType,
    content: 'content',
  }

  test('props로 파생된 타입이 writeReply일 때, 작성된 reply를 반환합니다.', async () => {
    const mockedBodyWithWritedReply = {
      ...MOCKED_REPLY,
      content: {
        text: '댓글을 작성합니다.',
      },
    }

    mockedAuthGuardedFetchers.post.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        parsedBody: mockedBodyWithWritedReply,
      }),
    )

    const { response, authoringRequestType } = (await authorMessage(
      mockedBaseReplyProps,
    )) as { response: Reply; authoringRequestType: string }

    expect(authoringRequestType).toEqual('writeReply')
    expect(response).toStrictEqual(mockedBodyWithWritedReply)
  })

  test('props로 파생된 타입이 writeChildReply일 때, 작성된 child reply를 반환합니다.', async () => {
    const mockedBodyWithWritedChildReply = {
      ...MOCKED_REPLY,
      content: {
        text: '답글을 작성합니다.',
      },
    }

    mockedAuthGuardedFetchers.post.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        parsedBody: mockedBodyWithWritedChildReply,
      }),
    )

    const mockedWriteChildReplyProps = {
      ...mockedBaseReplyProps,
      parentMessageId: 'parent_message_id',
      mentionedUserUid: 'mentioned_user_uid',
    }

    const { response, authoringRequestType } = (await authorMessage(
      mockedWriteChildReplyProps,
    )) as {
      response: Reply
      authoringRequestType: string
    }

    expect(authoringRequestType).toEqual('writeChildReply')
    expect(response).toStrictEqual(mockedBodyWithWritedChildReply)
  })

  test('props로 파생된 타입이 editReply일 때, 수정된 reply를 반환합니다.', async () => {
    const mockedBodyWithEditedReply = {
      ...MOCKED_REPLY,
      content: {
        text: '수정된 텍스트입니다.',
      },
    }

    mockedAuthGuardedFetchers.put.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        parsedBody: mockedBodyWithEditedReply,
      }),
    )

    const mockedEditedReplyProps = {
      ...mockedBaseReplyProps,
      parentMessageId: 'parent_message_id',
      currentMessageId: 'current_message_id',
    }

    const { response, authoringRequestType } = (await authorMessage(
      mockedEditedReplyProps,
    )) as { response: Reply; authoringRequestType: string }

    expect(authoringRequestType).toEqual('editReply')
    expect(response).toStrictEqual(mockedBodyWithEditedReply)
  })
})

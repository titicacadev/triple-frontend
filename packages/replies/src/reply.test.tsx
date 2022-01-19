import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import '@testing-library/jest-dom'
import { RepliesProvider } from './context'
import Reply from './list/reply'

jest.mock('./replies-api-clients')

describe('리액션 관련 기능을 테스트합니다.', () => {
  test('좋아요를 클릭했던 사용자가 다시 클릭하면, 좋아요 갯수를 -1 합니다.', async () => {
    const mockedFetchReply = jest.fn()
    const fetchReply = mockedFetchReply.mockResolvedValue({
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
      reactions: {
        like: {
          count: 2,
          haveMine: true,
        },
      },
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
    })

    const reply = await fetchReply()
    const onFocusInput = jest.fn()

    const { getByRole, findByRole } = render(
      <RepliesProvider>
        <Reply reply={reply} focusInput={onFocusInput} />
      </RepliesProvider>,
    )

    const unlikeButtonElement = getByRole('button', {
      name: /unlike-button/i,
    })

    const beforeLikeCount = reply.reactions.like?.count || 0

    fireEvent.click(unlikeButtonElement)

    const afterLikeCount = await findByRole('article', { name: /like-count/i })

    expect(afterLikeCount.textContent).toEqual(`좋아요 ${beforeLikeCount - 1}`)
  })

  test('좋아요를 클릭하지 않았던 사용자가 클릭하면, 좋아요 갯수를 +1 합니다.', async () => {
    const mockedFetchReply = jest.fn()
    const fetchReply = mockedFetchReply.mockResolvedValue({
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
      reactions: {
        like: {
          count: 1,
          haveMine: false,
        },
      },
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
    })

    const reply = await fetchReply()

    const onFocusInput = jest.fn()

    const { getByRole, findByRole } = render(
      <RepliesProvider>
        <Reply reply={reply} focusInput={onFocusInput} />
      </RepliesProvider>,
    )

    const likeButtonElement = getByRole('button', {
      name: /like-button/i,
    })

    const beforeLikeCount = reply.reactions.like?.count || 0

    fireEvent.click(likeButtonElement)

    const afterLikeCount = await findByRole('article', {
      name: /like-count/i,
    })

    expect(afterLikeCount.textContent).toEqual(`좋아요 ${beforeLikeCount + 1}`)
  })

  test('좋아요 갯수가 0 이하일 때, 좋아요 문구 및 갯수를 노출하지 않습니다.', async () => {
    const mockedFetchReply = jest.fn()
    const fetchReply = mockedFetchReply.mockResolvedValue({
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
      reactions: {
        like: {
          count: -1,
          haveMine: false,
        },
      },
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
    })

    const reply = await fetchReply()

    const onFocusInput = jest.fn()

    const { queryByRole } = render(
      <RepliesProvider>
        <Reply reply={reply} focusInput={onFocusInput} />
      </RepliesProvider>,
    )

    const likeCountElement = queryByRole('like-count')

    expect(likeCountElement).not.toBeInTheDocument()
  })
})

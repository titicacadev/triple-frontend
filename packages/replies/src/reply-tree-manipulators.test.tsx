import {
  addReply,
  deleteReply,
  editReply,
  appendReplyChildren,
} from './reply-tree-manipulators'
import { Reply } from './types'

const MOCK_REPLY_TEST_ID_ZERO = '00000000-0000-0000-0000-00000000000'
const MOCK_REPLY_TEST_ID_ONE = '11111111-1111-1111-1111-11111111111'
const MOCK_REPLY_TEST_ID_TWO = '22222222-2222-2222-2222-22222222222'

const MOCK_BASE_REPLY = {
  id: MOCK_REPLY_TEST_ID_ZERO,
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
  isMine: true,
  createdAt: '2022-01-13T06:05:08.668Z',
  updatedAt: '2022-01-13T06:05:08.668Z',
  reactions: {
    like: {
      count: 0,
      haveMine: false,
    },
  },
  blinded: false,
  deleted: false,
  actionSpecifications: {
    reaction: false,
    report: false,
    delete: false,
    reply: {
      toMessageId: MOCK_REPLY_TEST_ID_ZERO,
      mentioningUserName: '테스트_닉네임',
      mentioningUserUid: 'USER_UUID',
      mentioningUserHref: '/users/USER_UUID',
    },
    edit: {
      plaintext: '댓글&답글 작성 내용',
    },
  },
  children: [],
  childrenCount: 0,
}

describe('Reply 추가 기능을 테스트합니다.', () => {
  test('답글을 추가합니다.', () => {
    const mockAddingReply = generateMockReply({
      id: MOCK_REPLY_TEST_ID_TWO,
      parentId: MOCK_BASE_REPLY.id,
    })

    const rootTree = generateMockReply({
      children: [
        {
          ...generateMockReply({
            id: MOCK_REPLY_TEST_ID_ONE,
            parentId: MOCK_BASE_REPLY.id,
          }),
        },
      ],
      childrenCount: 1,
    })

    const addedReply = addReply(mockAddingReply, rootTree)

    expect(addedReply.childrenCount).toBe(2)
  })
})

describe('Reply 삭제 기능을 테스트합니다.', () => {
  test('댓글을 제거합니다.', () => {
    const mockDeletingReply = generateMockReply()
    const tree = generateMockReply()

    const deletedReply = deleteReply(mockDeletingReply, tree)

    expect(deletedReply).toBeUndefined()
  })

  test('답글을 제거합니다.', () => {
    const mockDeletingChildReply = generateMockReply({
      id: MOCK_REPLY_TEST_ID_ONE,
      parentId: MOCK_BASE_REPLY.id,
    })

    const tree = generateMockReply({
      children: [
        {
          ...generateMockReply({
            id: MOCK_REPLY_TEST_ID_ONE,
            parentId: MOCK_BASE_REPLY.id,
          }),
        },
      ],
      childrenCount: 1,
    })

    const deletedReply = deleteReply(mockDeletingChildReply, tree) as Reply

    expect(deletedReply.childrenCount).toBe(0)
  })
})

describe('Reply 수정 기능을 테스트합니다.', () => {
  test('댓글을 수정합니다.', () => {
    const mockEditingReply = generateMockReply({
      content: { text: '수정된 텍스트' },
    })

    const tree = generateMockReply({
      content: { text: '원본 텍스트' },
    })

    const editedReply = editReply(mockEditingReply, mockEditingReply, tree)

    expect(editedReply.content.text).toBe('수정된 텍스트')
  })

  test('답글을 수정합니다.', () => {
    const mockEditingReply = generateMockReply({
      id: MOCK_REPLY_TEST_ID_ONE,
      parentId: MOCK_BASE_REPLY.id,
    })

    const tree = generateMockReply({
      children: [
        {
          ...generateMockReply({
            id: MOCK_REPLY_TEST_ID_ONE,
            parentId: MOCK_BASE_REPLY.id,
            content: { text: '원본 텍스트' },
          }),
        },
      ],
    })

    const editedChildReply = editReply(
      mockEditingReply,
      { content: { text: '수정된 텍스트' } },
      tree,
    )

    expect(editedChildReply.children[0].content.text).toBe('수정된 텍스트')
  })
})

test('Reply 페이징 기능을 테스트합니다.', () => {
  const originalReply = {
    id: MOCK_BASE_REPLY.id,
    children: [MOCK_BASE_REPLY],
  } as unknown as Reply

  const appendingReply = [
    generateMockReply({ id: MOCK_REPLY_TEST_ID_ONE }),
    generateMockReply({ id: MOCK_REPLY_TEST_ID_TWO }),
  ]
  const tree = {
    id: MOCK_BASE_REPLY.id,
    children: [MOCK_BASE_REPLY],
  } as unknown as Reply

  const { children: newReplies } = appendReplyChildren(
    originalReply,
    appendingReply,
    tree,
  )
  expect(newReplies.length).toBe(3)
})

function generateMockReply(updatedAttributes?: Partial<Reply>): Reply {
  return {
    ...MOCK_BASE_REPLY,
    ...updatedAttributes,
  }
}

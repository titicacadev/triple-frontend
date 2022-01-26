import { addReply, deleteReply, editReply } from './reply-tree-manipulators'
import { Reply } from './types'

const MOCK_BASE_REPLY = {
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
  children: [],
  childrenCount: 0,
}

describe('Reply 추가 기능을 테스트합니다.', () => {
  test('Reply를 추가합니다.', () => {
    const mockAddingReply = {
      ...MOCK_BASE_REPLY,
      id: '22222222-2222-2222-2222-22222222222',
      parentId: MOCK_BASE_REPLY.id,
      children: [],
      childrenCount: 0,
    }

    const rootTree = {
      ...MOCK_BASE_REPLY,
      children: [
        {
          ...MOCK_BASE_REPLY,
          id: '11111111-1111-1111-1111-11111111111',
          parentId: MOCK_BASE_REPLY.id,
          children: [],
          childrenCount: 0,
        },
      ],
      childrenCount: 1,
    }

    const addedReply = addReply(mockAddingReply, rootTree)

    expect(addedReply.childrenCount).toBe(2)
  })
})

describe('Reply 삭제 기능을 테스트합니다.', () => {
  test('댓글을 제거합니다.', () => {
    const mockDeletingReply = {
      ...MOCK_BASE_REPLY,
      id: '00000000-0000-0000-0000-00000000000',
      children: [],
      childrenCount: 0,
    }

    const tree = {
      ...MOCK_BASE_REPLY,
      children: [],
      childrenCount: 0,
    }

    const deletedReply = deleteReply(mockDeletingReply, tree)

    expect(deletedReply).toBeUndefined()
  })

  test('답글을 제거합니다.', () => {
    const mockDeletingChildReply = {
      ...MOCK_BASE_REPLY,
      id: '11111111-1111-1111-1111-11111111111',
      parentId: MOCK_BASE_REPLY.id,
      children: [],
      childrenCount: 0,
    }

    const tree = {
      ...MOCK_BASE_REPLY,
      children: [
        {
          ...MOCK_BASE_REPLY,
          id: '11111111-1111-1111-1111-11111111111',
          parentId: MOCK_BASE_REPLY.id,
          children: [],
          childrenCount: 0,
        },
      ],
      childrenCount: 1,
    }

    const deletedReply = deleteReply(mockDeletingChildReply, tree) as Reply

    expect(deletedReply.childrenCount).toBe(0)
  })
})

describe('Reply 수정 기능을 테스트합니다.', () => {
  test('댓글을 수정합니다.', () => {
    const mockEditingReply = {
      ...MOCK_BASE_REPLY,
      content: { text: '수정된 텍스트' },
    }

    const tree = {
      ...MOCK_BASE_REPLY,
      content: { text: '원본 텍스트' },
    }

    const editedReply = editReply(mockEditingReply, mockEditingReply, tree)

    expect(editedReply.content.text).toBe('수정된 텍스트')
  })

  test('답글을 수정합니다.', () => {
    const mockEditingReply = {
      ...MOCK_BASE_REPLY,
      id: '11111111-1111-1111-1111-11111111111',
      parentId: MOCK_BASE_REPLY.id,
    }

    const tree = {
      ...MOCK_BASE_REPLY,
      children: [
        {
          ...MOCK_BASE_REPLY,
          id: '11111111-1111-1111-1111-11111111111',
          parentId: MOCK_BASE_REPLY.id,
          content: { text: '원본 텍스트' },
        },
      ],
    }

    const editedChildReply = editReply(
      mockEditingReply,
      { content: { text: '수정된 텍스트' } },
      tree,
    )

    expect(editedChildReply.children[0].content.text).toBe('수정된 텍스트')
  })
})

import {
  addReply,
  deleteReply,
  editReply,
  appendReplyChildren,
} from './reply-tree-manipulators'
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
    reaction: false,
    report: false,
    delete: false,
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

describe('addReply', () => {
  const addingReply = generateMockReply({
    id: '12345678-1234-1234-1234-12345678912',
    parentId: '11111111-1111-1111-1111-11111111111',
  })

  describe('탐색 깊이가 1보다 클 때', () => {
    test('Reply 트리에 노드를 추가하는 경우, 노드가 추가된 Reply 트리를 반환합니다.', () => {
      const originalReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        children: [
          generateMockReply({
            id: '23456789-4321-4321-4321-23456789111',
            parentId: '11111111-1111-1111-1111-11111111111',
          }),
        ],
        childrenCount: 1,
      })

      const addedReply = addReply(addingReply, originalReply)

      const expectedReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        children: [
          generateMockReply({
            id: '23456789-4321-4321-4321-23456789111',
            parentId: '11111111-1111-1111-1111-11111111111',
          }),
          addingReply,
        ],
        childrenCount: 2,
      })

      expect(addedReply).toEqual(expectedReply)
    })

    test('Child를 추가할 노드를 순회를 통해 찾은 경우, Child 노드가 추가된 트리를 반환합니다.', () => {
      const mockReplies = [
        generateMockReply({
          id: '23456789-4321-4321-4321-23456789111',
          children: [
            generateMockReply({
              id: '123123as-11mf-123m-12hv-12345678912',
              parentId: '23456789-4321-4321-4321-23456789111',
            }),
          ],
          childrenCount: 1,
        }),
        generateMockReply({
          id: '11111111-1111-1111-1111-11111111111',
          children: [
            generateMockReply({
              id: '23456789-4321-4321-4321-23456789111',
              parentId: '11111111-1111-1111-1111-11111111111',
            }),
          ],
          childrenCount: 1,
        }),
      ]

      const originalReply = generateMockReply({
        children: mockReplies,
      })

      const addedReply = addReply(addingReply, originalReply)

      const expectedReply = generateMockReply({
        children: [
          mockReplies[0],
          generateMockReply({
            id: '11111111-1111-1111-1111-11111111111',
            children: [
              generateMockReply({
                id: '23456789-4321-4321-4321-23456789111',
                parentId: '11111111-1111-1111-1111-11111111111',
              }),
              addingReply,
            ],
            childrenCount: 2,
          }),
        ],
      })

      expect(addedReply).toEqual(expectedReply)
    })

    test('Child를 추가할 노드를 순회 했지만 못찾은 경우, 기존 트리를 반환합니다.', () => {
      const originalReply = generateMockReply({
        id: '00000000-0000-0000-0000-00000000000',
        children: [
          generateMockReply({
            id: '23456789-4321-4321-4321-23456789111',
            parentId: '00000000-0000-0000-0000-00000000000',
          }),
        ],
      })

      const addedReply = addReply(addingReply, originalReply)

      expect(addedReply).toEqual(originalReply)
    })
  })
})

describe('deleteReply', () => {
  describe('탐색 깊이가 1일 때', () => {
    const mockDeletingReply = generateMockReply()

    test('Child 노드가 없는 Reply 트리를 삭제할 경우, undefined를 반환합니다.', () => {
      const originalReply = generateMockReply()

      const deletedReply = deleteReply(mockDeletingReply, originalReply)

      expect(deletedReply).toBeUndefined()
    })

    test('삭제해야하는 Reply 트리의 ID가 일치하지 않을 경우, 기존 Reply 트리를 반환합니다.', () => {
      const originalReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
      })

      const deletedReply = deleteReply(mockDeletingReply, originalReply)

      expect(deletedReply).toEqual(originalReply)
    })
  })

  describe('탐색 깊이가 1보다 클 때', () => {
    test('삭제해야하는 Child 노드를 순회하여 찾은 경우, 해당 노드가 삭제된 Reply 트리를 반환합니다.', () => {
      const mockDeletingChildReply = generateMockReply({
        id: '12345678-1234-1234-1234-12345678912',
        parentId: '11111111-1111-1111-1111-11111111111',
      })

      const originalReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        children: [
          generateMockReply({
            id: '12345678-1234-1234-1234-12345678912',
            parentId: '11111111-1111-1111-1111-11111111111',
          }),
        ],
        childrenCount: 1,
      })

      const deletedReply = deleteReply(mockDeletingChildReply, originalReply)

      const expetedReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        children: [],
        childrenCount: 0,
      })

      expect(deletedReply).toEqual(expetedReply)
    })

    test('삭제해야하는 Child 노드의 ID가 일치하지 않을 경우, 기존 Reply 트리를 반환합니다.', () => {
      const mockDeletingChildReply = generateMockReply({
        id: '12345678-1234-1234-1234-12345678912',
      })

      const originalReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        children: [
          generateMockReply({
            id: '23456789-1234-1234-1234-23456789123',
            parentId: '11111111-1111-1111-1111-11111111111',
          }),
        ],
        childrenCount: 1,
      })

      const deletedReply = deleteReply(mockDeletingChildReply, originalReply)

      expect(deletedReply).toEqual(originalReply)
    })
  })
})

describe('editReply', () => {
  describe('탐색 깊이가 1일 때', () => {
    test('수정해야하는 Reply 트리를 찾을 경우, 수정된 Reply 트리를 반환합니다.', () => {
      const mockEditingReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        content: { text: '수정된 텍스트' },
      })

      const originalReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        content: { text: '원본 텍스트' },
      })

      const editedReply = editReply(
        mockEditingReply,
        mockEditingReply,
        originalReply,
      )

      const expectedReply = {
        ...originalReply,
        ...mockEditingReply,
      }

      expect(editedReply).toEqual(expectedReply)
    })

    test('수정해야하는 Reply 트리의 ID가 일치하지 않을 경우, 기존 Reply 트리를 반환합니다.', () => {
      const mockEditingReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        content: { text: '수정된 텍스트' },
      })

      const originalReply = generateMockReply({
        id: '22222222-2222-2222-2222-22222222222',
        content: { text: '원본 텍스트' },
      })

      const editedReply = editReply(
        mockEditingReply,
        mockEditingReply,
        originalReply,
      )

      expect(editedReply).toEqual(originalReply)
    })
  })

  describe('탐색 깊이가 1보다 클 때,', () => {
    test('Child 노드를 순회하여 찾은 경우, 해당 Child 노드를 수정한 Reply 트리를 반환합니다.', () => {
      const mockEditingChildReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        content: { text: '수정된 텍스트' },
      })

      const originalReply = generateMockReply({
        id: '12345678-1234-1234-1234-12345678912',
        children: [
          generateMockReply({
            id: '11111111-1111-1111-1111-11111111111',
            content: { text: '원본 텍스트' },
          }),
        ],
      })

      const editedReply = editReply(
        mockEditingChildReply,
        mockEditingChildReply,
        originalReply,
      )

      const expectedReply = {
        ...originalReply,
        children: [mockEditingChildReply],
      }

      expect(editedReply).toEqual(expectedReply)
    })
  })
})

describe('appendReplyChildren', () => {
  test('페이징을 이용하여 Reply 트리를 추가할 경우, 트리가 추가된 Reply 트리를 반환합니다.', () => {
    const mockAddingReply = {
      id: null,
      children: [MOCK_BASE_REPLY],
    } as unknown as Reply

    const appendingReply = [
      generateMockReply({ id: '11111111-1111-1111-1111-11111111111' }),
      generateMockReply({ id: '22222222-2222-2222-2222-22222222222' }),
    ]

    const originalReply = {
      id: null,
      children: [MOCK_BASE_REPLY],
    } as unknown as Reply

    const { children: newReplies } = appendReplyChildren(
      mockAddingReply,
      appendingReply,
      originalReply,
    )

    const expectedReply = [...mockAddingReply.children, ...appendingReply]

    expect(newReplies).toEqual(expectedReply)
  })

  test('페이징을 이용하여 Child 노드를 추가할 경우, Child 노드가 추가된 Reply 트리를 반환합니다.', () => {
    const mockAddingReply = generateMockReply({
      id: '11111111-1111-1111-1111-11111111111',
      children: [
        generateMockReply({
          id: '12345678-1234-1234-1234-12345678912',
          parentId: '11111111-1111-1111-1111-11111111111',
        }),
        generateMockReply({
          id: '23456789-1234-1234-1234-12345678912',
          parentId: '11111111-1111-1111-1111-11111111111',
        }),
        generateMockReply({
          id: '34567891-1234-1234-1234-12345678912',
          parentId: '11111111-1111-1111-1111-11111111111',
        }),
      ],
      childrenCount: 3,
    })

    const appendingReply = [
      generateMockReply({
        id: '4567891-1234-1234-1234-12345678912',
        parentId: '11111111-1111-1111-1111-11111111111',
      }),
      generateMockReply({
        id: '5678912-1234-1234-1234-12345678912',
        parentId: '11111111-1111-1111-1111-11111111111',
      }),
      generateMockReply({
        id: '6789123-1234-1234-1234-12345678912',
        parentId: '11111111-1111-1111-1111-11111111111',
      }),
    ]

    const originalReply = generateMockReply({
      id: '12345678-1234-1234-12345678912',
      children: [mockAddingReply],
      childrenCount: 1,
    })

    const { children: newReplies } = appendReplyChildren(
      mockAddingReply,
      appendingReply,
      originalReply,
    )

    const expectedReply = [
      {
        ...mockAddingReply,
        children: [...mockAddingReply.children, ...appendingReply],
      },
    ]

    expect(newReplies).toEqual(expectedReply)
  })
})

function generateMockReply(updatedAttributes?: Partial<Reply>): Reply {
  return {
    ...MOCK_BASE_REPLY,
    ...updatedAttributes,
  }
}

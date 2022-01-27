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

describe('Reply 추가 기능을 테스트합니다.', () => {
  const addingReply = generateMockReply({
    id: '12345678-1234-1234-1234-12345678912',
    parentId: '11111111-1111-1111-1111-11111111111',
  })

  describe('답글 테스트 항목', () => {
    test('답글 추가 후, 댓글을 반환합니다. (바로 찾은 경우)', () => {
      const originalReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        children: [
          generateMockReply({
            id: '23456789-4321-4321-4321-23456789111',
            parentId: '11111111-1111-1111-1111-11111111111',
          }),
        ],
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

    test('답글 추가 후, 댓글을 반환합니다. (바로 못찾은 경우)', () => {
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

    test('댓글이 없을 때, 답글을 추가하면 기존 댓글을 반환합니다.', () => {
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

describe('Reply 삭제 기능을 테스트합니다.', () => {
  describe('댓글 테스트 항목', () => {
    const mockDeletingReply = generateMockReply()

    test('댓글이 1개 있는 리스트에서 댓글을 삭제하면 undefined를 반환합니다.', () => {
      const originalReply = generateMockReply()

      const deletedReply = deleteReply(mockDeletingReply, originalReply)

      expect(deletedReply).toBeUndefined()
    })

    test('댓글이 2개 이상 있는 리스트에서 댓글을 삭제한 후 댓글을 반환합니다.', () => {
      const originalReply = {
        id: null,
        children: [
          generateMockReply({
            id: '00000000-0000-0000-0000-00000000000',
          }),
          generateMockReply({
            id: '11111111-1111-1111-1111-11111111111',
          }),
          generateMockReply({
            id: '22222222-2222-2222-2222-22222222222',
          }),
        ],
        childrenCount: 3,
      } as unknown as Reply

      const deletedReply = deleteReply(mockDeletingReply, originalReply)

      const expectedReply = {
        id: null,
        children: [
          generateMockReply({
            id: '11111111-1111-1111-1111-11111111111',
          }),
          generateMockReply({
            id: '22222222-2222-2222-2222-22222222222',
          }),
        ],
        childrenCount: 2,
      }

      expect(deletedReply).toEqual(expectedReply)
    })

    test('답글이 달려있는 상태에서 댓글 삭제 시 deleted와 content의 값을 변경 후 반환합니다.', () => {
      const mockDeletingReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
      })

      const originalReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        children: [
          generateMockReply({
            id: '23456789-1234-1234-23456789123',
            parentId: '11111111-1111-1111-1111-11111111111',
            children: [],
          }),
        ],
        childrenCount: 1,
      })

      const deletedReply = deleteReply(mockDeletingReply, originalReply)

      const expectedReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
        children: [
          {
            ...generateMockReply({
              id: '23456789-1234-1234-23456789123',
              parentId: '11111111-1111-1111-1111-11111111111',
              children: [],
            }),
          },
        ],
        childrenCount: 1,
        deleted: true,
        content: {},
      })

      expect(deletedReply).toEqual(expectedReply)
    })

    test('삭제한 댓글의 ID가 일치히지 않으면 기존 댓글을 반환합니다.', () => {
      const originalReply = generateMockReply({
        id: '11111111-1111-1111-1111-11111111111',
      })

      const deletedReply = deleteReply(mockDeletingReply, originalReply)

      expect(deletedReply).toEqual(originalReply)
    })
  })

  describe('답글 테스트 항목', () => {
    test('답글 삭제 후, 댓글을 반환합니다.', () => {
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

    test('삭제해야하는 답글의 ID가 일치하지 않으면 기존 답글을 반환합니다.', () => {
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

describe('Reply 수정 기능을 테스트합니다.', () => {
  describe('댓글 테스트 항목', () => {
    test('댓글을 수정합니다.', () => {
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

    test('수정한 댓글의 ID가 일치하지 않으면 기존 댓글을 반환합니다.', () => {
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

  describe('답글 테스트 항목', () => {
    test('답글을 수정합니다.', () => {
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

describe('Reply 페이징 기능을 테스트합니다.', () => {
  test('다음 페이지의 댓글을 불러옵니다.', () => {
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

  test('다음 페이지의 답글을 불러옵니다.', () => {
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

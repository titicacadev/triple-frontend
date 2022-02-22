import { useEffect, useState, useCallback, MouseEvent, useRef } from 'react'
import { Container } from '@titicaca/core-elements'

import { checkUniqueReply } from './utils'
import { fetchReplies, fetchChildReplies } from './replies-api-clients'
import { Reply, ResourceType, Placeholders } from './types'
import ReplyList from './list'
import GuideText from './guide-text'
import Register from './register'
import { RepliesProvider } from './context'
import { TextAreaHandle } from './auto-resizing-textarea'
import {
  addReply,
  appendReplyChildren,
  deleteReply,
  editReply,
} from './reply-tree-manipulators'

export default function Replies({
  resourceId,
  resourceType,
  placeholders,
  size = 10,
  // FIXME: 개발 완료 후 onClickCapture props를 제거합니다.
  // 제공되는 댓글의 일부 기능을 노출하지 않기 위해서 추가한 임시 핸들러 props이며,
  // 개발이 완료되면 없어질 props입니다.
  onClickCapture,
}: {
  resourceId: string
  resourceType: ResourceType
  placeholders?: Placeholders
  size?: number
  onClickCapture?: (event: MouseEvent<HTMLDivElement>) => void
}) {
  const [replies, setReplies] = useState<Reply[]>([])
  const [hasNextPage, setHasNextPage] = useState(false)

  const handleReplyAdd = (response: Reply): void => {
    if (response.parentId) {
      const newReplies = replies.map((reply) => addReply(response, reply))

      setReplies(newReplies)
    } else {
      setReplies((prev) => [...prev, response])
    }
  }

  const handleReplyDelete = (response: Reply): void => {
    const deletedReplies = replies
      .map((reply) => deleteReply(response, reply))
      .filter(Boolean) as Reply[]

    setReplies(deletedReplies)
  }

  const handleReplyEdit = (response: Reply): void => {
    const editedReplies = replies.map((reply) =>
      editReply(response, response, reply),
    )

    setReplies(editedReplies)
  }

  const fetchMoreReplies = useCallback(
    async (reply?: Reply) => {
      if (!size) {
        return
      }

      const actualTree =
        reply ||
        ({
          id: null,
          children: replies,
        } as unknown as Reply)

      const childrenCount = actualTree.children.length
      const pageNumber = Math.floor(Number(childrenCount / size))

      const repliesResponse: Reply[] = actualTree.id
        ? await fetchChildReplies({
            id: actualTree.id,
            size,
            page: pageNumber,
          })
        : await fetchReplies({
            resourceId,
            resourceType,
            size,
            page: pageNumber,
          })

      if (!actualTree.id) {
        const nextRepliesResponse: Reply[] = await fetchReplies({
          resourceId,
          resourceType,
          size,
          page: pageNumber + 1,
        })

        setHasNextPage(nextRepliesResponse.length > 0)
      }

      const sortedChildReplies = [
        ...new Map(
          (repliesResponse || []).map((reply) => [
            reply.id,
            {
              ...reply,
              children: checkUniqueReply(reply.children),
            },
          ]),
        ).values(),
      ]

      const { children: newReplies } = appendReplyChildren(
        actualTree,
        sortedChildReplies,
        {
          id: null,
          children: replies,
        } as unknown as Reply,
      )

      setReplies(newReplies)
    },
    [resourceId, resourceType, size, replies],
  )

  useEffect(() => {
    fetchMoreReplies()
  }, [resourceId, resourceType])

  const registerRef = useRef<TextAreaHandle>(null)

  const focusInput = () => {
    registerRef.current?.focusInput()
  }

  return (
    <RepliesProvider>
      <Container onClick={onClickCapture}>
        <ReplyList
          replies={replies}
          isMoreButtonActive={hasNextPage}
          fetchMoreReplies={fetchMoreReplies}
          focusInput={focusInput}
          onReplyDelete={handleReplyDelete}
          onReplyEdit={handleReplyEdit}
        />

        <GuideText />

        <Register
          ref={registerRef}
          resourceId={resourceId}
          resourceType={resourceType}
          placeholders={placeholders}
          onReplyAdd={handleReplyAdd}
          onReplyEdit={handleReplyEdit}
        />
      </Container>
    </RepliesProvider>
  )
}

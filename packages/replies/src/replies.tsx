import React, {
  useEffect,
  useState,
  useCallback,
  MouseEvent,
  useRef,
} from 'react'
import { Container } from '@titicaca/core-elements'

import { fetchReplies, fetchReplyBoard } from './replies-api-clients'
import { Reply, ResourceType } from './types'
import ReplyList from './list'
import GuideText from './guide-text'
import Register from './register'
import { checkUniqueReply } from './utils'
import { RepliesProvider } from './context'
import { TextAreaHandle } from './auto-resizing-textarea'
import { addReply, deleteReply, editReply } from './reply-tree-manipulators'

export default function Replies({
  resourceId,
  resourceType,
  registerPlaceholder,
  size,
  // FIXME: 개발 완료 후 onClickCapture props를 제거합니다.
  // 제공되는 댓글의 일부 기능을 노출하지 않기 위해서 추가한 임시 핸들러 props이며,
  // 개발이 완료되면 없어질 props입니다.
  onClickCapture,
}: {
  resourceId: string
  resourceType: ResourceType
  registerPlaceholder?: string
  size?: number
  onClickCapture?: (event: MouseEvent<HTMLDivElement>) => void
}) {
  const [totalRepliesCount, setTotalRepliesCount] = useState<
    number | undefined
  >(undefined)
  const [replies, setReplies] = useState<Reply[]>([])
  const [page, setPage] = useState(0)

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

  useEffect(() => {
    async function fetchRepliesAndSet() {
      const repliesResponse = await fetchReplies({
        resourceId,
        resourceType,
        size,
      })

      setReplies(checkUniqueReply(repliesResponse))
    }

    fetchRepliesAndSet()
  }, [resourceId, resourceType, size])

  useEffect(() => {
    async function fetchReplyBoardAndSet() {
      const replyBoardResponse = await fetchReplyBoard({
        resourceType,
        resourceId,
      })

      setTotalRepliesCount(replyBoardResponse.rootMessagesCount)
    }

    fetchReplyBoardAndSet()
  }, [resourceId, resourceType])

  const fetchMoreReplies = useCallback(async () => {
    const repliesResponse = await fetchReplies({
      resourceId,
      resourceType,
      size,
      page: page + 1,
    })

    setReplies((prev) => checkUniqueReply([...repliesResponse, ...prev]))
    setPage((prev) => prev + 1)
  }, [resourceId, resourceType, size, page, setPage])

  const registerRef = useRef<TextAreaHandle>(null)

  const focusInput = () => {
    registerRef.current?.focusInput()
  }

  return (
    <RepliesProvider>
      <Container onClick={onClickCapture}>
        <ReplyList
          replies={replies}
          totalRepliesCount={totalRepliesCount}
          fetchMoreReplies={fetchMoreReplies}
          focusInput={focusInput}
          onReplyDelete={handleReplyDelete}
        />

        <GuideText />

        <Register
          ref={registerRef}
          resourceId={resourceId}
          resourceType={resourceType}
          registerPlaceholder={registerPlaceholder}
          onReplyAdd={handleReplyAdd}
          onReplyEdit={handleReplyEdit}
        />
      </Container>
    </RepliesProvider>
  )
}

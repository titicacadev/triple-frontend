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
  const [{ replies, page }, setRepliesInfo] = useState<{
    replies: Reply[]
    page: number
  }>({
    replies: [],
    page: 0,
  })

  useEffect(() => {
    async function fetchRepliesAndSet() {
      const repliesResponse = await fetchReplies({
        resourceId,
        resourceType,
        size,
      })

      setRepliesInfo((prev) => ({
        ...prev,
        replies: checkUniqueReply(repliesResponse),
      }))
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

    setRepliesInfo((prev) => ({
      ...prev,
      replies: checkUniqueReply([...repliesResponse, ...prev.replies]),
      page: prev.page + 1,
    }))
  }, [resourceId, resourceType, size, page])

  const registerRef = useRef<TextAreaHandle>(null)

  const onFocusInput = () => {
    registerRef.current?.onFocusInput()
  }

  return (
    <RepliesProvider>
      <Container onClick={onClickCapture}>
        <ReplyList
          replies={replies}
          totalRepliesCount={totalRepliesCount}
          fetchMoreReplies={fetchMoreReplies}
          onFocusInput={onFocusInput}
        />

        <GuideText />

        <Register
          ref={registerRef}
          resourceId={resourceId}
          resourceType={resourceType}
          registerPlaceholder={registerPlaceholder}
        />
      </Container>
    </RepliesProvider>
  )
}

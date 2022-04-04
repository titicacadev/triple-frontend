import { useEffect, useState, useCallback, useRef } from 'react'
import { Container, MarginPadding } from '@titicaca/core-elements'
import styled from 'styled-components'

import { fetchReplies, fetchChildReplies } from './replies-api-client'
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

const FixedBottom = styled(Container).attrs({
  backgroundColor: 'white',
  position: 'fixed',
})`
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
`

export default function Replies({
  resourceId,
  resourceType,
  placeholders,
  isFixedBottomInput,
  listPadding,
  size = 10,
}: {
  resourceId: string
  resourceType: ResourceType
  placeholders?: Placeholders
  isFixedBottomInput?: boolean
  listPadding?: MarginPadding
  size?: number
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

      const { children: newReplies } = appendReplyChildren(
        actualTree,
        repliesResponse,
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
    // fetchMoreReplies deps의 replies가 계속 업데이트되므로 제거했습니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceId, resourceType, size])

  const registerRef = useRef<TextAreaHandle>(null)

  const focusInput = () => {
    registerRef.current?.focusInput()
  }

  const InputContainer = isFixedBottomInput ? FixedBottom : Container

  return (
    <RepliesProvider>
      <ReplyList
        replies={replies}
        isMoreButtonActive={hasNextPage}
        listPadding={listPadding}
        fetchMoreReplies={fetchMoreReplies}
        focusInput={focusInput}
        onReplyDelete={handleReplyDelete}
        onReplyEdit={handleReplyEdit}
      />

      <InputContainer>
        <GuideText />

        <Register
          ref={registerRef}
          resourceId={resourceId}
          resourceType={resourceType}
          placeholders={placeholders}
          onReplyAdd={handleReplyAdd}
          onReplyEdit={handleReplyEdit}
        />
      </InputContainer>
    </RepliesProvider>
  )
}

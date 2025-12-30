import { useEffect, useState, useCallback, useRef } from 'react'
import { Container, safeAreaInsetMixin } from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

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
import { checkUniqueReply } from './utils'

const FixedBottom = styled(Container).attrs({
  backgroundColor: 'white',
})`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;

  ${css`
    ${safeAreaInsetMixin}
  `}
`

/**
 * 댓글 컴포넌트
 */
function Replies({
  resourceId,
  resourceType,
  placeholders,
  isFormFixed,
  size = 10,
  initialSize,
  onCompleteReplyAdd,
  onCompleteReplyDelete,
  ...props
}: {
  /**
   * resourceId, resourceType: 아래 스웨거를 참고해주세요.
   *
   * https://reply.proxy.triple-dev.titicaca-corp.com/webjars/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config
   */
  resourceId: string
  resourceType: ResourceType
  /**
   * Register 컴포넌트 내부의 문구를 커스터마이징.
   */
  placeholders?: Placeholders
  /**
   * 화면 최하단에 댓글/답글 입력창을 고정할 지 선택.
   */
  isFormFixed?: boolean
  /**
   * api 호출 시 댓글을 가져오는 크기.
   */
  size?: number
  initialSize?: number
  onCompleteReplyAdd?: (reply: Reply) => void
  onCompleteReplyDelete?: (reply: Reply) => void
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
    onCompleteReplyDelete?.(response)
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

  const fetchInitialReplies = useCallback(
    async (initialSize: number) => {
      if (initialSize > size) {
        throw new Error('Failed to fetchInitialReplies')
      }

      const [initialReplies, nextReplies] = await Promise.all([
        fetchReplies({
          resourceId,
          resourceType,
          size: initialSize,
          page: 0,
        }),
        fetchReplies({
          resourceId,
          resourceType,
          size: initialSize,
          page: 1,
        }),
      ])

      const newReplies = checkUniqueReply(initialReplies)

      setReplies(newReplies)
      setHasNextPage(nextReplies.length > 0)
    },
    [resourceId, resourceType, size],
  )

  useEffect(() => {
    if (initialSize) {
      fetchInitialReplies(initialSize)
    } else {
      fetchMoreReplies()
    }

    // fetchInitialReplies, fetchMoreReplies deps의 replies가 계속 업데이트되므로 제거했습니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSize, resourceId, resourceType, size])

  const registerRef = useRef<TextAreaHandle>(null)

  const focusInput = () => {
    registerRef.current?.focusInput()
  }

  const InputContainer = isFormFixed ? FixedBottom : Container

  return (
    <RepliesProvider>
      <ReplyList
        replies={replies}
        isMoreButtonActive={hasNextPage}
        fetchMoreReplies={fetchMoreReplies}
        focusInput={focusInput}
        onReplyDelete={handleReplyDelete}
        onReplyEdit={handleReplyEdit}
        {...props}
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
          onCompleteReplyAdd={onCompleteReplyAdd}
        />
      </InputContainer>
    </RepliesProvider>
  )
}

export default Replies

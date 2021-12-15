import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Container, FlexBox, Text, Icon } from '@titicaca/core-elements'

import {
  fetchReplies,
  fetchReplyBoard,
  writeReply,
  writeChildReply,
} from './replies-api-clients'
import { Reply, ResourceType } from './types'
import ReplyList from './list'
import Register from './register'
import { checkUniqueReply } from './utils'

export default function Replies({
  resourceId,
  resourceType,
  registerPlaceholder,
  size,
  onClick,
}: {
  resourceId: string
  resourceType: ResourceType
  registerPlaceholder?: string
  size?: number
  onClick?: () => void
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

  const [
    { toMessageId, mentioningUserUid, mentioningUserName },
    setReplyActionSpecification,
  ] = useState<Partial<Reply['actionSpecifications']['reply']>>({
    toMessageId: null,
    mentioningUserUid: null,
    mentioningUserName: null,
  })

  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

  const changeReplyType = (baseReply: Reply) => {
    const { reply } = baseReply.actionSpecifications
    setReplyActionSpecification(reply)

    if (!!reply.toMessageId && textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const handleChildReplyContentClose = () => {
    setReplyActionSpecification({
      toMessageId: null,
      mentioningUserUid: null,
      mentioningUserName: null,
    })
  }

  const handleRegister = async (content: string) => {
    if (!content) {
      return
    }

    toMessageId
      ? await writeChildReply({
          messageId: toMessageId,
          content,
          mentionedUserUid: mentioningUserUid || '',
        })
      : await writeReply({
          resourceId,
          resourceType,
          content,
        })

    handleChildReplyContentClose()
  }

  return (
    <Container onClickCapture={onClick}>
      <ReplyList
        replies={replies}
        totalRepliesCount={totalRepliesCount}
        fetchMoreReplies={fetchMoreReplies}
        changeReplyType={changeReplyType}
      />

      {toMessageId ? (
        <FlexBox
          flex
          padding={{ top: 10, bottom: 10, left: 20, right: 20 }}
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="gray50"
        >
          <Text size={12} lineHeight="19px" bold color="gray700">
            {mentioningUserName}님께 답글 작성 중
          </Text>

          <Icon
            onClick={handleChildReplyContentClose}
            src="https://assets.triple.guide/images/btn-com-close@3x.png"
          />
        </FlexBox>
      ) : null}

      <Register
        registerPlaceholder={registerPlaceholder}
        textareaRef={textareaRef}
        onSubmit={handleRegister}
      />
    </Container>
  )
}

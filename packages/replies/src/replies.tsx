import React, { useCallback, useEffect, useState } from 'react'
import {
  Container,
  FlexBox,
  HR1,
  List,
  SquareImage,
  Text,
  Icon,
} from '@titicaca/core-elements'
import { findFoldedPosition, formatTimestamp } from '@titicaca/view-utilities'
import styled from 'styled-components'
import { ExternalLink } from '@titicaca/router'

import {
  fetchReplies,
  writeReply,
  fetchReplyBoard,
  fetchChildrenReplies,
  writeChildrenReply,
} from './replies-api-clients'
import { Reply, ResourceType, Writer, DataForGeneratingReply } from './types'
import AutoResizingTextarea from './auto-resizing-textarea'

const MoreButton = styled.button`
  width: 19px;
  height: 19px;
  padding-left: 3px;
  margin-top: -3px;
  border: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(https://assets.triple.guide/images/btn-review-more@4x.png);
`

const ReactionBox = styled(FlexBox)`
  div {
    ::before {
      font-size: 12px;
      padding: 0 3px 0 4px;
      content: '·';
    }
  }
`

const RegisterButton = styled.button`
  width: 26px;
  padding: 0;
  margin-left: 20px;
  line-height: 1.2;
  font-size: 15px;
  font-weight: bold;
  color: var(--color-blue);
  background: inherit;
  border: none;
  outline: none;
  cursor: pointer;
`

const ChildrenResourceListItem = styled(List.Item)`
  padding-left: 40px;
`

const MentionUser = styled.a`
  color: var(--color-blue);
  margin-right: 5px;
`

function checkUniqueReply(reply: Reply[]) {
  const result = [
    ...new Map(reply.map((item) => [item.id, item])).values(),
  ].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  return result
}

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

  const [replyContentMessage, setReplyContentMessage] = useState('')
  const [
    { toMessageId, mentioningUserUid, mentioningUserName },
    setDataForGeneratingReply,
  ] = useState<DataForGeneratingReply>({
    toMessageId: null,
    mentioningUserUid: null,
    mentioningUserName: null,
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
        replies: [...repliesResponse].reverse(),
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

  const handleReplyMoreClick = useCallback(async () => {
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

  const handleCloseChildrenReply = () => {
    setDataForGeneratingReply({
      toMessageId: null,
      mentioningUserUid: null,
      mentioningUserName: null,
    })
  }

  const handleRegister = async () => {
    if (!replyContentMessage) {
      return
    }

    toMessageId
      ? await writeChildrenReply({
          messageId: toMessageId,
          contentFormat: 'plaintext',
          content: replyContentMessage,
          mentionedUserUid: mentioningUserUid || '',
        })
      : await writeReply({
          resourceId,
          resourceType,
          content: replyContentMessage,
        })

    setReplyContentMessage('')

    handleCloseChildrenReply()
  }

  if (replies.length <= 0) {
    return (
      <NoReplyPlaceholder
        registerPlaceholder={registerPlaceholder}
        messages={replyContentMessage}
        onMessageChange={setReplyContentMessage}
        onClick={onClick}
      />
    )
  }

  return (
    <Container onClick={onClick}>
      <Container padding={{ bottom: 30, left: 30, right: 30 }}>
        {totalRepliesCount && totalRepliesCount > replies.length ? (
          <Text
            padding={{ top: 20 }}
            color="blue"
            size={14}
            bold
            cursor="pointer"
            inlineBlock
            onClick={handleReplyMoreClick}
          >
            이전 댓글 더보기
          </Text>
        ) : null}

        <List margin={{ top: 20 }}>
          {replies.map((reply) => (
            <List.Item key={reply.id}>
              <HR1 margin={{ bottom: 20 }} color="var(--color-gray50)" />
              <DetailReply
                reply={reply}
                onWriteChildrenReply={setDataForGeneratingReply}
              />
            </List.Item>
          ))}
        </List>
      </Container>

      <Container>
        {toMessageId ? (
          <FlexBox
            flex
            padding={{ top: 10, bottom: 10, left: 20, right: 20 }}
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="gray50"
          >
            <Text size={12} lineHeight="19px" bold color="gray700">
              {mentioningUserName}에게 답글 다는 중...
            </Text>
            <Icon
              onClick={handleCloseChildrenReply}
              src="https://assets.triple.guide/images/btn-com-close@3x.png"
            />
          </FlexBox>
        ) : null}

        <Register
          registerPlaceholder={registerPlaceholder}
          messages={replyContentMessage}
          isFocusing={Boolean(toMessageId)}
          onMessageChange={setReplyContentMessage}
          onClick={handleRegister}
        />
      </Container>
    </Container>
  )
}

function Register({
  registerPlaceholder,
  messages,
  isFocusing,
  onMessageChange,
  onClick,
}: {
  registerPlaceholder?: string
  messages: string
  isFocusing: boolean
  onMessageChange: (message: string) => void
  onClick?: () => void
}) {
  return (
    <Container cursor="pointer">
      <HR1 margin={{ top: 0 }} />
      <FlexBox
        flex
        alignItems="flex-end"
        padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <AutoResizingTextarea
          placeholder={
            registerPlaceholder || '이 일정에 궁금한 점은 댓글로 써주세요.'
          }
          minRows={1}
          maxRows={4}
          value={messages}
          onChange={onMessageChange}
          isFocusing={isFocusing}
        />
        <RegisterButton onClick={onClick}>등록</RegisterButton>
      </FlexBox>
      <HR1 margin={{ top: 0 }} />
    </Container>
  )
}

function NoReplyPlaceholder({
  registerPlaceholder,
  messages,
  onMessageChange,
  onClick,
}: {
  registerPlaceholder?: string
  messages: string
  onMessageChange: (message: string) => void
  onClick?: () => void
}) {
  return (
    <Container onClick={onClick}>
      <HR1
        margin={{ top: 20, left: 30, right: 30 }}
        color="var(--color-gray50)"
      />

      <Container padding={{ top: 40, bottom: 50 }} textAlign="center">
        <Text size={14} lineHeight={1.2} color="gray300">
          아직 댓글이 없어요. <br />
          가장 먼저 댓글을 작성해보세요!
        </Text>
      </Container>

      <Register
        registerPlaceholder={registerPlaceholder}
        messages={messages}
        onMessageChange={onMessageChange}
        isFocusing={false}
      />

      <HR1 margin={{ top: 0 }} color="var(--color-gray50)" />
    </Container>
  )
}

function Content({
  text,
  mentionedUser,
  blinded,
}: {
  text: string
  mentionedUser?: Writer
  blinded: boolean
}) {
  const [unfolded, setUnfolded] = useState(false)
  const foldedPosition = findFoldedPosition(5, text)

  return (
    <Container padding={{ top: 3 }}>
      <Text inline padding={{ top: 3, bottom: 5 }} size={15}>
        {blinded ? (
          '신고가 접수되어 블라인드 처리되었습니다.'
        ) : !unfolded && foldedPosition ? (
          text.slice(0, foldedPosition)
        ) : (
          <>
            {mentionedUser && (
              <ExternalLink
                href={mentionedUser?.href as string}
                target="new"
                allowSource="app"
              >
                <MentionUser>{mentionedUser?.name}</MentionUser>
              </ExternalLink>
            )}
            <span>{text}</span>
          </>
        )}
      </Text>

      {!blinded && !unfolded && foldedPosition ? (
        <Text
          inline
          color="blue"
          size={15}
          cursor="pointer"
          onClick={() => setUnfolded((prevState) => !prevState)}
        >
          …더보기
        </Text>
      ) : null}
    </Container>
  )
}

function DetailReply({
  reply: {
    writer: { profileImage, name },
    actionSpecifications: { reply: dataForGeneratingReply },
    blinded,
    createdAt,
    content: { mentionedUser, text, markdownText },
    reactions,
    childrenCount,
    children,
    id,
  },
  onWriteChildrenReply,
}: {
  reply: Reply
  onWriteChildrenReply: ({
    toMessageId,
    mentioningUserUid,
    mentioningUserName,
  }: DataForGeneratingReply) => void
}) {
  const [{ childrenReplies, childrenPage }, setChildrenRepliesInfo] = useState<{
    childrenReplies: Reply[]
    childrenPage: number
  }>({ childrenReplies: [...children].reverse(), childrenPage: 0 })

  const handleWriteChildrenReply = () => {
    onWriteChildrenReply({
      ...dataForGeneratingReply,
    })
  }

  useEffect(() => {
    async function fetchChildrenRepliesAndSet() {
      const response = await fetchChildrenReplies({
        id,
        size: 3,
      })

      setChildrenRepliesInfo((prev) => ({
        ...prev,
        childrenReplies: [...response].reverse(),
      }))
    }

    fetchChildrenRepliesAndSet()
  }, [id])

  const handleChildrenReplyMoreClick = useCallback(async () => {
    const response = await fetchChildrenReplies({
      id,
      size: 3,
      page: childrenPage + 1,
    })

    setChildrenRepliesInfo((prev) => ({
      ...prev,
      childrenReplies: checkUniqueReply([...response, ...prev.childrenReplies]),
      childrenPage: prev.childrenPage + 1,
    }))
  }, [id, childrenPage])

  return (
    <>
      <SquareImage
        floated="left"
        size="small"
        src={profileImage}
        borderRadius={20}
        alt={name || ''}
      />

      <Container padding={{ left: 50, bottom: 3 }} margin={{ bottom: 20 }}>
        <FlexBox flex justifyContent="space-between" alignItems="start">
          <Container minWidth={80}>
            <Text size={15} bold>
              {name}
            </Text>
          </Container>

          <FlexBox padding={{ top: 3, left: 5 }} flex alignItems="start">
            <Text size={12} padding={{ right: 5 }} bold color="gray300">
              {formatTimestamp(createdAt)}
            </Text>

            <MoreButton />
          </FlexBox>
        </FlexBox>

        <Content
          mentionedUser={mentionedUser}
          blinded={!!blinded}
          text={text || markdownText || ''}
        />

        <ReactionBox
          padding={{ top: 7 }}
          flex
          alignItems="center"
          cursor="pointer"
        >
          {reactions.like?.haveMine ? (
            <img
              width={14}
              height={14}
              src="https://assets.triple.guide/images/btn-lounge-thanks-on@3x.png"
            />
          ) : (
            <img
              width={14}
              height={14}
              src="https://assets.triple.guide/images/btn-lounge-thanks-off@3x.png"
            />
          )}

          {reactions.like && reactions.like?.count > 0 ? (
            <Text padding={{ left: 2 }} size={12} color="gray300" bold>
              좋아요 {reactions.like?.count}
            </Text>
          ) : null}

          <Text
            padding={{ left: 2 }}
            size={12}
            color="gray300"
            bold
            onClick={handleWriteChildrenReply}
          >
            답글달기
          </Text>
        </ReactionBox>
      </Container>

      {childrenCount > childrenReplies.length ? (
        <Text
          padding={{ left: 40 }}
          color="blue"
          size={14}
          bold
          cursor="pointer"
          inlineBlock
          onClick={handleChildrenReplyMoreClick}
        >
          이전 답글 더보기
        </Text>
      ) : null}

      {childrenReplies.length > 0 ? (
        <List margin={{ top: 20 }}>
          {childrenReplies.map((childrenReply) => (
            <ChildrenResourceListItem
              key={childrenReply.id}
              margin={{ bottom: 20 }}
            >
              <DetailReply
                reply={childrenReply}
                onWriteChildrenReply={onWriteChildrenReply}
              />
            </ChildrenResourceListItem>
          ))}
        </List>
      ) : null}
    </>
  )
}

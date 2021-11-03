import React, { useEffect, useState } from 'react'
import {
  Container,
  FlexBox,
  HR1,
  List,
  SquareImage,
  Text,
} from '@titicaca/core-elements'
import { findFoldedPosition, formatTimestamp } from '@titicaca/view-utilities'
import styled from 'styled-components'

import {
  fetchReplies,
  writeReply,
  fetchReplyBoard,
} from './replies-api-clients'
import { Reply, ResourceType, Writer } from './types'
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
    :before {
      font-size: 12px;
      padding: 0 3px 0 4px;
      content: '·';
    }
  }
`

const ResourceListItem = styled(List.Item)`
  min-height: 100%;
  margin-top: 20px;
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

const NestedResourceListItem = styled(List.Item)`
  margin-top: 20px;
  padding-left: 40px;
`

const MentionUserLink = styled.a`
  color: var(--color-blue);
  margin-right: 5px;
`

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
  onClick: () => void
}) {
  const [replies, setReplies] = useState<Reply[]>([])
  const [replyMoreOpen, setReplyMoreOpen] = useState(true)
  const [page, setPage] = useState(0)

  useEffect(() => {
    async function fetchAndSet() {
      const repliesResponse = await fetchReplies({
        resourceId,
        resourceType,
        size,
        page,
      })

      const replyBoardResponse = await fetchReplyBoard({
        resourceType,
        resourceId,
      })

      setReplies((prevReplies) => {
        const newReplies = [...(repliesResponse || []), ...prevReplies]

        if (newReplies.length === replyBoardResponse?.rootMessagesCount) {
          setReplyMoreOpen(false)
        }

        return newReplies
      })
    }

    fetchAndSet()
  }, [resourceId, resourceType, size, page])

  const handleReplyMoreClick = () => {
    setPage(page + 1)
  }

  if (replies.length <= 0) {
    return (
      <NoReplyPlaceholder
        resourceId={resourceId}
        resourceType={resourceType}
        registerPlaceholder={registerPlaceholder}
        onClick={onClick}
      />
    )
  }

  return (
    <>
      <Container padding={{ bottom: 30, left: 30, right: 30 }}>
        {replies.length >= 10 && replyMoreOpen ? (
          <Container cursor="pointer" onClick={handleReplyMoreClick}>
            <Text padding={{ top: 20 }} color="blue" size={14} bold>
              {replyMoreOpen ? '이전 댓글 더보기' : null}
            </Text>
          </Container>
        ) : null}

        {replies.map((reply) => (
          <>
            <HR1 margin={{ top: 20 }} color="var(--color-gray50)" />

            <ResourceListItem key={reply.id}>
              <DetailReply reply={reply} onClick={onClick} />
            </ResourceListItem>
          </>
        ))}
      </Container>

      <Register
        resourceId={resourceId}
        resourceType={resourceType}
        registerPlaceholder={registerPlaceholder}
        onClick={onClick}
      />
    </>
  )
}

function Register({
  resourceId,
  resourceType,
  registerPlaceholder,
  onClick,
}: {
  resourceId: string
  resourceType: string
  registerPlaceholder?: string
  onClick?: () => void
}) {
  const [message, setMessage] = useState('')

  const handleRegister = async () => {
    await writeReply({
      resourceId,
      resourceType,
      content: message,
    })
  }

  return (
    <Container cursor="pointer" onClick={onClick}>
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
          value={message}
          onChange={setMessage}
          readOnly={!!onClick}
        />
        <RegisterButton onClick={handleRegister}>등록</RegisterButton>
      </FlexBox>
      <HR1 margin={{ top: 0 }} />
    </Container>
  )
}

function NoReplyPlaceholder({
  resourceId,
  resourceType,
  registerPlaceholder,
  onClick,
}: {
  resourceId: string
  resourceType: string
  registerPlaceholder?: string
  onClick: () => void
}) {
  return (
    <>
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
        resourceId={resourceId}
        resourceType={resourceType}
        registerPlaceholder={registerPlaceholder}
        onClick={onClick}
      />

      <HR1 margin={{ top: 0 }} color="var(--color-gray50)" />
    </>
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
    <>
      <Text inline padding={{ top: 3, bottom: 5 }} size={15}>
        {blinded ? (
          '신고가 접수되어 블라인드 처리되었습니다.'
        ) : !unfolded && foldedPosition ? (
          text.slice(0, foldedPosition)
        ) : (
          <>
            {mentionedUser && (
              <MentionUserLink href={mentionedUser?.href as string}>
                {mentionedUser?.name}
              </MentionUserLink>
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
    </>
  )
}

function DetailReply({
  reply,
  onClick,
}: {
  reply: Reply
  onClick: () => void
}) {
  const { writer, blinded, createdAt, content, reactions } = reply

  const [nestedReplyMoreOpen, setNestedReplyMoreOpen] = useState(true)

  const handleNestedReplyMoreClick = () => {
    setNestedReplyMoreOpen(false)
  }

  return (
    <>
      <SquareImage
        floated="left"
        size="small"
        src={writer.profileImage}
        borderRadius={20}
        alt={writer.name || ''}
      />

      <Container padding={{ left: 50, bottom: 3 }}>
        <FlexBox flex justifyContent="space-between" alignItems="start">
          <Container minWidth={80}>
            <Text size={15} bold>
              {writer.name}
            </Text>
          </Container>

          <FlexBox padding={{ top: 3, left: 5 }} flex alignItems="start">
            <Text size={12} padding={{ right: 5 }} bold color="gray300">
              {formatTimestamp(createdAt)}
            </Text>

            <MoreButton onClick={onClick} />
          </FlexBox>
        </FlexBox>

        <Container padding={{ top: 3 }}>
          <Content
            mentionedUser={content.mentionedUser}
            blinded={!!blinded}
            text={content.text || content.markdownText || ''}
          />
        </Container>

        <ReactionBox
          padding={{ top: 7 }}
          flex
          alignItems="center"
          cursor="pointer"
          onClick={onClick}
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

          {reactions.like && reactions.like.count > 0 ? (
            <Text padding={{ left: 2 }} size={12} color="gray300" bold>
              좋아요 {reactions.like?.count}
            </Text>
          ) : null}

          <Text padding={{ left: 2 }} size={12} color="gray300" bold>
            답글달기
          </Text>
        </ReactionBox>
      </Container>

      {reply.children.length > 2 && nestedReplyMoreOpen ? (
        <Container cursor="pointer" onClick={handleNestedReplyMoreClick}>
          <Text padding={{ top: 20, left: 40 }} color="blue" size={14} bold>
            {nestedReplyMoreOpen ? '이전 답글 더보기' : null}
          </Text>
        </Container>
      ) : null}

      {(nestedReplyMoreOpen ? reply.children.slice(0, 2) : reply.children).map(
        (nestedReply) => (
          <NestedResourceListItem key={nestedReply.id}>
            <DetailReply reply={nestedReply} onClick={onClick} />
          </NestedResourceListItem>
        ),
      )}
    </>
  )
}

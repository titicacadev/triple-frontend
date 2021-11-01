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

import { fetchReplies, writeReply } from './replies-api-clients'
import { Reply, ResourceType } from './types'
import ResizableTextarea from './resizable-textarea'

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

const CountFlexBox = styled(FlexBox)`
  div:first-of-type {
    :after {
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

  useEffect(() => {
    async function fetchAndSet() {
      const response = await fetchReplies({ resourceId, resourceType, size })

      setReplies(response || [])
    }
    fetchAndSet()
  }, [resourceId, resourceType, size])

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

  const {
    writer,
    blinded,
    createdAt,
    reactions,
    childrenCount,
    content,
  } = replies[0]

  return (
    <>
      <Container padding={{ bottom: 30, left: 30, right: 30 }}>
        {replies.length > 1 ? (
          <Container cursor="pointer" onClick={onClick}>
            <Text padding={{ top: 20 }} color="blue" size={14} bold>
              이전 댓글 더보기
            </Text>
          </Container>
        ) : null}
        <HR1 margin={{ top: 20 }} color="var(--color-gray50)" />

        <ResourceListItem>
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
              <Content blinded={!!blinded} text={content.text} />
            </Container>

            <CountFlexBox
              padding={{ top: 7 }}
              flex
              alignItems="center"
              cursor="pointer"
              onClick={onClick}
            >
              <img
                width={14}
                height={14}
                src="https://assets.triple.guide/images/btn-lounge-thanks-off@3x.png"
              />
              <Text padding={{ left: 2 }} size={12} color="gray300" bold>
                {reactions?.like?.count || 0}
              </Text>

              {childrenCount ? (
                <img
                  width={15}
                  height={15}
                  src="https://assets.triple.guide/images/btn-lounge-comment-off@3x.png"
                />
              ) : null}
              <Text padding={{ left: 2 }} size={12} color="gray300" bold>
                {childrenCount || '답글달기'}
              </Text>
            </CountFlexBox>
          </Container>
        </ResourceListItem>
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
  onClick: () => void
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
    <Container cursor="pointer">
      <HR1 margin={{ top: 0 }} />
      <FlexBox
        flex
        alignItems="flex-end"
        justifyContent="space-between"
        padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <ResizableTextarea
          placeholder={
            registerPlaceholder || '이 일정에 궁금한 점은 댓글로 써주세요.'
          }
          minRows={1}
          maxRows={4}
          value={message}
          onChange={setMessage}
        />
        <Text size={15} color="blue" bold onClick={onClick || handleRegister}>
          등록
        </Text>
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

function Content({ text, blinded }: { text: string; blinded: boolean }) {
  const [unfolded, setUnfolded] = useState(false)

  const foldedPosition = findFoldedPosition(5, text)

  return (
    <>
      <Text inline padding={{ top: 3, bottom: 5 }} size={15}>
        {blinded
          ? '신고가 접수되어 블라인드 처리되었습니다.'
          : !unfolded && foldedPosition
          ? text.slice(0, foldedPosition)
          : text}
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

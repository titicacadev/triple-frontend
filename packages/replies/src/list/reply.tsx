import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import {
  Container,
  FlexBox,
  List,
  SquareImage,
  Text,
} from '@titicaca/core-elements'
import { formatTimestamp, findFoldedPosition } from '@titicaca/view-utilities'
import { ExternalLink } from '@titicaca/router'
import { useURIHash, useHistoryFunctions } from '@titicaca/react-contexts'
import ActionSheet from '@titicaca/action-sheet'

import { Reply as ReplyType, Writer } from '../types'
import { fetchChildReplies } from '../replies-api-clients'
import { checkUniqueReply } from '../utils'

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

const ChildResourceListItem = styled(List.Item)`
  padding-left: 40px;
`

const MentionUser = styled.a`
  color: var(--color-blue);
  margin-right: 5px;
`

const HASH_MORE_ACTION_SHEET = 'reply.more-action-sheet'

export default function Reply({
  reply: {
    writer: { profileImage, name },
    blinded,
    createdAt,
    content: { mentionedUser, text, markdownText },
    reactions,
    childrenCount,
    children,
    id,
    actionSpecifications: { delete: isMine, reply },
  },
  handleWriteReplyClick,
  handleModifyReplyClick,
}: {
  reply: ReplyType
  handleWriteReplyClick: (
    reply: Partial<ReplyType['actionSpecifications']['reply']>,
    type: 'writeReply' | 'writeChildReply',
  ) => void
  handleModifyReplyClick: (
    reply: Partial<ReplyType['actionSpecifications']['reply']>,
    type: 'modifyReply',
    text: string,
  ) => void
}) {
  const [{ childReplies, childPage }, setChildRepliesInfo] = useState<{
    childReplies: ReplyType[]
    childPage: number
  }>({ childReplies: checkUniqueReply(children), childPage: 0 })

  const { push } = useHistoryFunctions()

  // 로컬 테스트용 코드
  // const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    async function fetchChildRepliesAndSet() {
      const response = await fetchChildReplies({
        id,
        size: 3,
      })

      setChildRepliesInfo((prev) => ({
        ...prev,
        childReplies: checkUniqueReply(response),
      }))
    }

    fetchChildRepliesAndSet()
  }, [id])

  const fetchMoreChildReplies = useCallback(async () => {
    const response = await fetchChildReplies({
      id,
      size: 3,
      page: childPage + 1,
    })

    setChildRepliesInfo((prev) => ({
      ...prev,
      childReplies: checkUniqueReply([...response, ...prev.childReplies]),
      childPage: prev.childPage + 1,
    }))
  }, [id, childPage])

  const handleMoreClick = useCallback(
    (id) => {
      push(`${HASH_MORE_ACTION_SHEET}.${id}`)

      // 로컬 테스트용 코드
      // setModalOpen(true)
    },
    [push],
  )

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

            <MoreButton onClick={() => handleMoreClick(id)} />
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
            onClick={() => {
              handleWriteReplyClick(reply, 'writeChildReply')
            }}
          >
            답글달기
          </Text>
        </ReactionBox>
      </Container>

      {childrenCount > childReplies.length ? (
        <Text
          padding={{ left: 40 }}
          color="blue"
          size={14}
          bold
          cursor="pointer"
          inlineBlock
          onClick={fetchMoreChildReplies}
        >
          이전 답글 더보기
        </Text>
      ) : null}

      {childReplies.length > 0 ? (
        <List margin={{ top: 20 }}>
          {childReplies.map((childReply) => (
            <ChildResourceListItem key={childReply.id} margin={{ bottom: 20 }}>
              <Reply
                reply={childReply}
                handleWriteReplyClick={handleWriteReplyClick}
                handleModifyReplyClick={handleModifyReplyClick}
              />
            </ChildResourceListItem>
          ))}
        </List>
      ) : null}

      <FeatureActionSheet
        // 로컬 테스트용 코드
        // modalOpen={modalOpen}
        // onClose={() => setModalOpen(false)}
        isMine={isMine}
        actionSheetHash={`${HASH_MORE_ACTION_SHEET}.${id}`}
        onModifyClick={() =>
          handleModifyReplyClick(
            {
              toMessageId: id,
              mentioningUserName: reply.mentioningUserName,
              mentioningUserUid: mentionedUser ? reply.mentioningUserUid : '',
            },
            'modifyReply',
            text as string,
          )
        }
      />
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

function FeatureActionSheet({
  // 로컬 테스트용 코드
  // modalOpen,
  // onClose,
  isMine,
  actionSheetHash,
  onModifyClick,
}: {
  // 로컬 테스트용 코드
  // modalOpen: boolean
  // onClose: () => void
  isMine: boolean
  actionSheetHash: string
  onModifyClick: () => void
}) {
  const uriHash = useURIHash()
  const { back } = useHistoryFunctions()

  return (
    <ActionSheet
      // 로컬 테스트용 코드
      // open={modalOpen}
      // onClose={onClose}
      open={uriHash === actionSheetHash}
      onClose={back}
      title={isMine ? '내 댓글' : '댓글'}
    >
      {isMine ? (
        <>
          <ActionSheet.Item onClick={onModifyClick}>수정하기</ActionSheet.Item>
          <ActionSheet.Item>삭제하기</ActionSheet.Item>
        </>
      ) : (
        <ActionSheet.Item>신고하기</ActionSheet.Item>
      )}
    </ActionSheet>
  )
}

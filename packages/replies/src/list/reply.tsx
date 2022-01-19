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
import {
  useUriHash,
  useHistoryFunctions,
  useIsomorphicNavigation,
} from '@titicaca/react-contexts'
import ActionSheet from '@titicaca/action-sheet'

import { Reply as ReplyType, Writer } from '../types'
import {
  fetchChildReplies,
  likeReply,
  unlikeReply,
} from '../replies-api-clients'
import { checkUniqueReply } from '../utils'
import { useRepliesContext } from '../context'

const MoreActionsButton = styled.button`
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

const ThanksButton = styled.button`
  border: none;
  outline: none;
  background: white;
  width: 14px;
  height: 14px;
  padding: 0;
  cursor: pointer;
`

const HASH_MORE_ACTION_SHEET = 'reply.more-action-sheet'
export const HASH_DELETE_CLOSE_MODAL = 'reply.delete-close-modal'

const CONTENT_TEXT = {
  deleted: '작성자가 삭제한 댓글입니다.',
  blinded: '다른 사용자의 신고로 블라인드 되었습니다.',
}

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
    deleted,
    actionSpecifications: { delete: isMine, reply, edit },
  },
  focusInput,
}: {
  reply: ReplyType
  focusInput: () => void
}) {
  const [{ childReplies, childPage }, setChildRepliesInfo] = useState<{
    childReplies: ReplyType[]
    childPage: number
  }>({ childReplies: checkUniqueReply(children), childPage: 0 })
  const [likeReaction, setLikeReactions] = useState(reactions.like)

  const { setEditingMessage } = useRepliesContext()

  const { push, back } = useHistoryFunctions()

  const { asyncBack } = useIsomorphicNavigation()

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
    (id, deleted) => {
      !deleted && push(`${HASH_MORE_ACTION_SHEET}.${id}`, { useRouter: true })
    },
    [push],
  )

  const handleWriteReplyClick = ({
    toMessageId,
    mentioningUserUid,
    mentioningUserName,
  }: ReplyType['actionSpecifications']['reply']) => {
    setEditingMessage({
      parentMessageId: toMessageId,
      content: {
        mentioningUserUid,
        mentioningUserName,
      },
    })

    focusInput()
  }

  const handleEditReplyClick = ({
    mentionedUserName,
    mentionedUserUid,
    messageId,
    toMessageId,
    plaintext,
  }: ReplyType['actionSpecifications']['edit'] & {
    toMessageId?: string
    messageId?: string
  }) => {
    setEditingMessage({
      currentMessageId: messageId,
      parentMessageId: toMessageId,
      content: {
        plaintext,
        mentioningUserUid: mentionedUserUid,
        mentioningUserName: mentionedUserName,
      },
    })

    focusInput()
  }

  const handleDeleteReplyClick = useCallback(
    async ({
      mentionedUserName,
      mentionedUserUid,
      messageId,
    }: ReplyType['actionSpecifications']['edit'] & {
      messageId?: string
    }) => {
      setEditingMessage({
        currentMessageId: messageId,
        content: {
          mentioningUserUid: mentionedUserUid,
          mentioningUserName: mentionedUserName,
        },
      })

      await asyncBack(back)

      push(HASH_DELETE_CLOSE_MODAL)

      return true
    },
    [setEditingMessage, asyncBack, back, push],
  )

  const handleLikeReplyClick = async ({ messageId }: { messageId: string }) => {
    await likeReply({ messageId })

    setLikeReactions((prev) => ({
      count: (prev?.count || 0) + 1,
      haveMine: true,
    }))
  }

  const handleUnlikeReplyClick = async ({
    messageId,
  }: {
    messageId: string
  }) => {
    await unlikeReply({ messageId })

    setLikeReactions((prev) => ({
      count: Math.max(0, (prev?.count || 0) - 1),
      haveMine: false,
    }))
  }

  const derivedText = deriveContent({
    text: text || markdownText || '',
    deleted,
    blinded,
    childrenCount,
  })

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

            <MoreActionsButton onClick={() => handleMoreClick(id, deleted)} />
          </FlexBox>
        </FlexBox>

        <Content
          mentionedUser={mentionedUser}
          blinded={!!blinded}
          deleted={!!deleted}
          text={derivedText}
        />

        {!deleted ? (
          <ReactionBox
            padding={{ top: 7 }}
            flex
            alignItems="center"
            cursor="pointer"
          >
            {likeReaction?.haveMine ? (
              <ThanksButton
                onClick={() => handleUnlikeReplyClick({ messageId: id })}
                aria-label="unlike-button"
              >
                <img
                  width={14}
                  height={14}
                  src="https://assets.triple.guide/images/btn-lounge-thanks-on@3x.png"
                  alt="thanks on icon"
                />
              </ThanksButton>
            ) : (
              <ThanksButton
                onClick={() => handleLikeReplyClick({ messageId: id })}
                aria-label="like-button"
              >
                <img
                  width={14}
                  height={14}
                  src="https://assets.triple.guide/images/btn-lounge-thanks-off@3x.png"
                  alt="thanks off icon"
                />
              </ThanksButton>
            )}

            {likeReaction && likeReaction.count > 0 ? (
              <Text padding={{ left: 2 }} size={12} color="gray300" bold>
                좋아요 {likeReaction.count}
              </Text>
            ) : null}

            <Text
              padding={{ left: 2 }}
              size={12}
              color="gray300"
              bold
              onClick={() => {
                handleWriteReplyClick(reply)
              }}
            >
              답글달기
            </Text>
          </ReactionBox>
        ) : null}
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
              <Reply reply={childReply} focusInput={focusInput} />
            </ChildResourceListItem>
          ))}
        </List>
      ) : null}

      <FeatureActionSheet
        isMine={isMine}
        actionSheetHash={`${HASH_MORE_ACTION_SHEET}.${id}`}
        onEditClick={() =>
          handleEditReplyClick({
            ...edit,
            toMessageId: reply.toMessageId,
            messageId: id,
          })
        }
        onDeleteClick={() =>
          handleDeleteReplyClick({
            ...edit,
            messageId: id,
          })
        }
      />
    </>
  )
}

function Content({
  text,
  mentionedUser,
  blinded,
  deleted,
}: {
  text: string
  mentionedUser?: Writer
  blinded: boolean
  deleted: boolean
}) {
  const [unfolded, setUnfolded] = useState(false)
  const foldedPosition = findFoldedPosition(5, text)

  return (
    <Container padding={{ top: 3 }}>
      <Text inline padding={{ top: 3, bottom: 5 }} size={15}>
        {!unfolded && foldedPosition ? (
          text.slice(0, foldedPosition)
        ) : (
          <>
            {mentionedUser && !blinded && (
              <ExternalLink
                href={mentionedUser?.href as string}
                target="new"
                allowSource="app"
              >
                <MentionUser>{mentionedUser?.name}</MentionUser>
              </ExternalLink>
            )}
            <Text
              size={15}
              lineHeight="18px"
              inlineBlock
              color={blinded || deleted ? 'gray300' : 'gray'}
            >
              {text}
            </Text>
          </>
        )}
      </Text>

      {!unfolded && foldedPosition ? (
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
  isMine,
  actionSheetHash,
  onEditClick,
  onDeleteClick,
}: {
  isMine: boolean
  actionSheetHash: string
  onEditClick: () => void
  onDeleteClick: () => void
}) {
  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()

  return (
    <ActionSheet
      open={uriHash === actionSheetHash}
      onClose={back}
      title={isMine ? '내 댓글' : '댓글'}
    >
      {isMine ? (
        <>
          <ActionSheet.Item onClick={onEditClick}>수정하기</ActionSheet.Item>
          <ActionSheet.Item onClick={onDeleteClick}>삭제하기</ActionSheet.Item>
        </>
      ) : (
        <ActionSheet.Item>신고하기</ActionSheet.Item>
      )}
    </ActionSheet>
  )
}

function deriveContent({
  text,
  deleted,
  blinded,
  childrenCount,
}: {
  text: string
  deleted: boolean
  blinded: boolean
  childrenCount: number
}) {
  const type =
    deleted || blinded
      ? deleted && childrenCount > 0
        ? 'deleted'
        : 'blinded'
      : 'default'

  return type === 'default' ? text : CONTENT_TEXT[type]
}

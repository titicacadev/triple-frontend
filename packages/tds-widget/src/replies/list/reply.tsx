import { useState, useCallback } from 'react'
import {
  useTranslation,
  useHashRouter,
  useSessionCallback,
  useClientAppCallback,
} from '@titicaca/triple-web'
import { styled } from 'styled-components'
import {
  Container,
  FlexBox,
  List,
  SquareImage,
  Text,
  ActionSheet,
  ActionSheetItem,
} from '@titicaca/tds-ui'
import { formatTimestamp, findFoldedPosition } from '@titicaca/view-utilities'
import { useNavigate } from '@titicaca/router'

import { Reply as ReplyType, Writer } from '../types'
import { likeReply, unlikeReply } from '../replies-api-client'
import { useRepliesContext } from '../context'
import { useHttpResponseError } from '../hook'

const MoreActionsButton = styled.button`
  width: 19px;
  height: 19px;
  padding-left: 3px;
  margin-top: -3px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://assets.triple.guide/images/btn-review-more@4x.png');
`

const ReactionBox = styled(FlexBox)`
  div {
    &::before {
      font-size: 12px;
      padding: 0 3px 0 4px;
      content: '·';
    }
  }
`

const ChildResourceListItem = styled(List.Item)`
  padding-left: 40px;
`

const MentionUser = styled.span`
  color: var(--color-blue);
  margin-right: 5px;
`

const ThanksButton = styled.button`
  outline: none;
  background: white;
  width: 14px;
  height: 14px;
`

const ThanksIcon = styled.img`
  vertical-align: baseline;
  margin-bottom: 2px;
`

const HASH_MORE_ACTION_SHEET = 'reply.more-action-sheet'
export const HASH_DELETE_CLOSE_MODAL = 'reply.delete-close-modal'

export function Reply({
  reply,
  reply: {
    writer: { profileImage, name, href: writeHref },
    blinded,
    createdAt,
    content: { mentionedUser, text, markdownText },
    reactions,
    childrenCount,
    children,
    id,
    parentId,
    deleted,
    actionSpecifications: { delete: isMine, reply: actionReply, edit },
  },
  focusInput,
  fetchMoreReplies,
}: {
  reply: ReplyType
  focusInput: () => void
  fetchMoreReplies: (reply?: ReplyType) => void
}) {
  const t = useTranslation()

  const [likeReaction, setLikeReactions] = useState(reactions.like)
  const { setEditingMessage } = useRepliesContext()
  const { addUriHash, replaceUriHash, removeUriHash } = useHashRouter()
  const { navigate } = useNavigate()
  const likeReactionCount = likeReaction?.count

  const handleMoreClick = useCallback(
    (id: string) => {
      addUriHash(`${HASH_MORE_ACTION_SHEET}.${id}`)
    },
    [addUriHash],
  )

  const handleWriteReplyClick = useSessionCallback(
    (actionReply: ReplyType['actionSpecifications']['reply']) => {
      setEditingMessage({
        parentMessageId: actionReply?.toMessageId || '',
        content: {
          mentioningUserUid: actionReply?.mentioningUserUid || '',
          mentioningUserName: actionReply?.mentioningUserName || '',
        },
      })

      focusInput()
    },
  )

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

  const handleHttpResponseError = useHttpResponseError()

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

      replaceUriHash(
        `${HASH_MORE_ACTION_SHEET}.${messageId}`,
        HASH_DELETE_CLOSE_MODAL,
      )

      return true
    },
    [setEditingMessage, replaceUriHash],
  )

  const handleLikeReplyClick = useSessionCallback(
    async ({ messageId }: { messageId: string }) => {
      try {
        await likeReply({ messageId })
        setLikeReactions((prev) => ({
          count: (prev?.count || 0) + 1,
          haveMine: true,
        }))
      } catch (e) {
        if (e instanceof Error) {
          handleHttpResponseError(e)
        }
      }
    },
    false,
  )

  const handleUnlikeReplyClick = useSessionCallback(
    async ({ messageId }: { messageId: string }) => {
      try {
        await unlikeReply({ messageId })
        setLikeReactions((prev) => ({
          count: Math.max(0, (prev?.count || 0) - 1),
          haveMine: false,
        }))
      } catch (e) {
        if (e instanceof Error) {
          handleHttpResponseError(e)
        }
      }
    },
    false,
  )

  const handleReportReplyClick = useClientAppCallback(
    useCallback(
      (id: string) => {
        navigate(`/reply/${id}/report`)
      },
      [navigate],
    ),
  )

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
    const contentText = {
      deleted: t('작성자가 삭제한 댓글입니다.'),
      blinded: t('다른 사용자의 신고로 블라인드 되었습니다.'),
    }

    const type =
      deleted || blinded
        ? deleted && childrenCount >= 0
          ? 'deleted'
          : 'blinded'
        : 'default'

    return type === 'default' ? text : contentText[type]
  }

  const derivedText = deriveContent({
    text: text || markdownText || '',
    deleted,
    blinded,
    childrenCount,
  })

  const handleUserClick = useClientAppCallback(
    useSessionCallback(
      useCallback(
        (href: string) => {
          navigate(href)
        },
        [navigate],
      ),
    ),
  )

  return (
    <>
      <SquareImage
        floated="left"
        size="small"
        src={profileImage}
        borderRadius={20}
        alt={name || ''}
        onClick={() => handleUserClick(writeHref)}
      />

      <Container
        css={{
          padding: '0 0 3px 50px',
          margin: '0 0 20px',
        }}
      >
        <FlexBox flex justifyContent="space-between" alignItems="start">
          <Container
            css={{
              minWidth: 80,
              maxWidth: 135,
            }}
          >
            <Text
              size={15}
              bold
              ellipsis
              onClick={() => handleUserClick(writeHref)}
            >
              {name}
            </Text>
          </Container>

          <FlexBox
            flex
            alignItems="start"
            css={{
              padding: '3px 0 0 5px',
            }}
          >
            <Text size={12} padding={{ right: 5 }} bold color="gray300">
              {formatTimestamp(createdAt)}
            </Text>

            <MoreActionsButton
              onClick={actionReply ? () => handleMoreClick(id) : undefined}
            />
          </FlexBox>
        </FlexBox>

        <Content
          mentionedUser={mentionedUser}
          blinded={!!blinded}
          deleted={!!deleted}
          text={derivedText}
        />

        {!deleted && !blinded ? (
          <ReactionBox
            flex
            alignItems="center"
            css={{
              padding: '7px 0 0',
              cursor: 'pointer',
            }}
          >
            {likeReaction?.haveMine ? (
              <ThanksButton
                onClick={() => handleUnlikeReplyClick({ messageId: id })}
                aria-label="unlike-button"
              >
                <ThanksIcon
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
                <ThanksIcon
                  width={14}
                  height={14}
                  src="https://assets.triple.guide/images/btn-lounge-thanks-off@3x.png"
                  alt="thanks off icon"
                />
              </ThanksButton>
            )}

            {likeReactionCount && likeReactionCount > 0 ? (
              <Text padding={{ left: 2 }} size={12} color="gray300" bold>
                {t('좋아요 {{likeReactionCount}}', { likeReactionCount })}
              </Text>
            ) : null}

            <Text
              padding={{ left: 2 }}
              size={12}
              color="gray300"
              bold
              onClick={() => handleWriteReplyClick(actionReply)}
            >
              {t('답글달기')}
            </Text>
          </ReactionBox>
        ) : null}
      </Container>

      {childrenCount > children.length ? (
        <Text
          padding={{ left: 40 }}
          color="blue"
          size={14}
          bold
          cursor="pointer"
          inlineBlock
          onClick={() => fetchMoreReplies(reply)}
        >
          {t('이전 답글 더보기')}
        </Text>
      ) : null}

      {childrenCount > 0 ? (
        <List margin={{ top: 20 }}>
          {children.map((childReply) => (
            <ChildResourceListItem key={childReply.id} margin={{ bottom: 20 }}>
              <Reply
                reply={childReply}
                focusInput={focusInput}
                fetchMoreReplies={fetchMoreReplies}
              />
            </ChildResourceListItem>
          ))}
        </List>
      ) : null}

      <FeatureActionSheet
        isMine={isMine}
        title={
          isMine
            ? parentId
              ? t('내 답글')
              : t('내 댓글')
            : parentId
              ? t('답글')
              : t('댓글')
        }
        actionSheetHash={`${HASH_MORE_ACTION_SHEET}.${id}`}
        onEditClick={() =>
          handleEditReplyClick({
            ...edit,
            toMessageId: actionReply ? actionReply.toMessageId : '',
            messageId: id,
          })
        }
        onDeleteClick={() =>
          handleDeleteReplyClick({
            ...edit,
            messageId: id,
          })
        }
        onReportClick={() => {
          removeUriHash()
          handleReportReplyClick(id)
        }}
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
  const t = useTranslation()

  const [unfolded, setUnfolded] = useState(false)
  const foldedPosition = findFoldedPosition(5, text)
  const { navigate } = useNavigate()

  const handleMentionedUserNameClick = useClientAppCallback(
    useCallback(
      (href: string) => {
        navigate(href)
      },
      [navigate],
    ),
  )

  return (
    <Container
      css={{
        padding: '3px 0 0',
      }}
    >
      <Text inline padding={{ top: 3, bottom: 5 }} size={15}>
        {!unfolded && foldedPosition ? (
          text.slice(0, foldedPosition)
        ) : (
          <>
            {mentionedUser && !blinded && (
              <MentionUser
                onClick={() => handleMentionedUserNameClick(mentionedUser.href)}
              >
                {mentionedUser?.name}
              </MentionUser>
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
          {t('...더보기')}
        </Text>
      ) : null}
    </Container>
  )
}

function FeatureActionSheet({
  isMine,
  title,
  actionSheetHash,
  onEditClick,
  onDeleteClick,
  onReportClick,
}: {
  isMine: boolean
  title: string
  actionSheetHash: string
  onEditClick: () => void
  onDeleteClick: () => void
  onReportClick: () => void
}) {
  const t = useTranslation()
  const { uriHash, removeUriHash } = useHashRouter()

  return (
    <ActionSheet
      open={uriHash === actionSheetHash}
      onClose={removeUriHash}
      title={title}
    >
      {isMine ? (
        <>
          <ActionSheetItem onClick={onEditClick}>
            {t('수정하기')}
          </ActionSheetItem>
          <ActionSheetItem onClick={onDeleteClick}>
            {t('삭제하기')}
          </ActionSheetItem>
        </>
      ) : (
        <ActionSheetItem onClick={onReportClick}>
          {t('신고하기')}
        </ActionSheetItem>
      )}
    </ActionSheet>
  )
}

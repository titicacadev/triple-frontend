import { Container, HR1, List, Text, Confirm } from '@titicaca/tds-ui'
import {
  useTranslation,
  useHashRouter,
  useClientAppActions,
} from '@titicaca/triple-web'

import { Reply as ReplyType } from '../types'
import { useRepliesContext } from '../context'
import { deleteReply } from '../replies-api-client'

import { NotExistReplies } from './not-exist-replies'
import { HASH_DELETE_CLOSE_MODAL, Reply } from './reply'

const HASH_EDIT_CLOSE_MODAL = 'reply.edit-close-modal'

export function ReplyList({
  replies,
  isMoreButtonActive,
  fetchMoreReplies,
  focusInput,
  onReplyDelete,
  onReplyEdit,
  ...props
}: {
  replies: ReplyType[]
  isMoreButtonActive: boolean
  fetchMoreReplies: (reply?: ReplyType) => void
  focusInput: () => void
  onReplyDelete: (response: ReplyType) => void
  onReplyEdit: (response: ReplyType) => void
}) {
  const t = useTranslation()

  const {
    currentMessageId,
    content: { mentioningUserName },
    initializeEditingMessage,
  } = useRepliesContext()

  const { showToast } = useClientAppActions()

  const description = mentioningUserName
    ? t('답글을 삭제하시겠습니까?')
    : t('댓글을 삭제하시겠습니까?')

  const handleReplyDelete = async () => {
    const response = await deleteReply({
      currentMessageId,
    })

    if (response) {
      if (response.childrenCount > 0) {
        onReplyEdit(response)
      } else {
        onReplyDelete(response)
      }

      if (showToast) {
        showToast(t('삭제되었습니다.'))
      } else {
        alert(t('삭제되었습니다.'))
      }
    }
  }

  return (
    <>
      {replies.length <= 0 ? (
        <NotExistReplies />
      ) : (
        <Container
          css={{
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 30,
          }}
          {...props}
        >
          {isMoreButtonActive ? (
            <Text
              padding={{ top: 20 }}
              color="blue"
              size={14}
              bold
              cursor="pointer"
              inlineBlock
              onClick={() => fetchMoreReplies()}
            >
              {t('이전 댓글 더보기')}
            </Text>
          ) : null}

          <List margin={{ top: 20 }}>
            {replies.map((reply) => (
              <List.Item key={reply.id}>
                <HR1
                  color="var(--color-gray50)"
                  compact
                  css={{ marginBottom: 20 }}
                />
                <Reply
                  reply={reply}
                  focusInput={focusInput}
                  fetchMoreReplies={fetchMoreReplies}
                />
              </List.Item>
            ))}
          </List>

          <ConfirmEditModal
            onConfirm={() => {
              initializeEditingMessage()
            }}
          />

          <ConfirmDeleteModal
            onConfirm={() => {
              handleReplyDelete()
            }}
            description={description}
          />
        </Container>
      )}
    </>
  )
}

function ConfirmEditModal({ onConfirm }: { onConfirm: () => void }) {
  const t = useTranslation()

  const { hasUriHash, removeUriHash } = useHashRouter()

  return (
    <Confirm
      open={hasUriHash(HASH_EDIT_CLOSE_MODAL)}
      onClose={removeUriHash}
      onConfirm={onConfirm}
    >
      {t('수정을 취소하시겠습니까? 수정한 내용은 저장되지 않습니다.')}
    </Confirm>
  )
}

function ConfirmDeleteModal({
  description,
  onConfirm,
}: {
  description: string
  onConfirm: () => void
}) {
  const { hasUriHash, removeUriHash } = useHashRouter()

  return (
    <Confirm
      open={hasUriHash(HASH_DELETE_CLOSE_MODAL)}
      onClose={removeUriHash}
      onConfirm={onConfirm}
    >
      {description}
    </Confirm>
  )
}

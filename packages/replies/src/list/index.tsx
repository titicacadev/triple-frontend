import { Container, HR1, List, Text } from '@titicaca/core-elements'
import { Confirm, Alert } from '@titicaca/modals'
import { useHistoryFunctions, useUriHash } from '@titicaca/react-contexts'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'

import { Reply as ReplyType } from '../types'
import { useRepliesContext } from '../context'
import { deleteReply } from '../replies-api-clients'

import NotExistReplies from './not-exist-replies'
import Reply, { HASH_DELETE_CLOSE_MODAL } from './reply'

const HASH_EDIT_CLOSE_MODAL = 'reply.edit-close-modal'
const HASH_DELETE_ALERT_CLOSE_MODAL = 'reply.delete-alert-close-modal'

export default function ReplyList({
  replies,
  totalRepliesCount,
  fetchMoreReplies,
  focusInput,
  onReplyDelete,
}: {
  replies: ReplyType[]
  totalRepliesCount?: number
  fetchMoreReplies: (reply?: ReplyType) => void
  focusInput: () => void
  onReplyDelete: (response: ReplyType) => void
}) {
  const {
    currentMessageId,

    content: { mentioningUserName },
    initializeEditingMessage,
  } = useRepliesContext()

  const { showToast } = useTripleClientActions()

  const description = mentioningUserName
    ? '답글을 삭제하시겠습니까?'
    : '댓글을 삭제하시겠습니까?'

  const handleReplyDelete = async () => {
    const response = await deleteReply({
      currentMessageId,
    })

    if (response) {
      onReplyDelete(response)

      if (showToast) {
        showToast('삭제되었습니다.')
      } else {
        alert('삭제되었습니다.')
      }
    }
  }

  return (
    <>
      {replies.length <= 0 ? (
        <NotExistReplies />
      ) : (
        <Container padding={{ bottom: 30, left: 30, right: 30 }}>
          {totalRepliesCount && totalRepliesCount > replies.length ? (
            <Text
              padding={{ top: 20 }}
              color="blue"
              size={14}
              bold
              cursor="pointer"
              inlineBlock
              onClick={() => fetchMoreReplies()}
            >
              이전 댓글 더보기
            </Text>
          ) : null}

          <List margin={{ top: 20 }}>
            {replies.map((reply) => (
              <List.Item key={reply.id}>
                <HR1 margin={{ bottom: 20 }} color="var(--color-gray50)" />
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

          <AlertDeleteModal />
        </Container>
      )}
    </>
  )
}

function ConfirmEditModal({ onConfirm }: { onConfirm: () => void }) {
  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()

  return (
    <Confirm
      open={uriHash === HASH_EDIT_CLOSE_MODAL}
      onClose={back}
      onConfirm={onConfirm}
    >
      {`수정을 취소하시겠습니까? \n 수정한 내용은 저장되지 않습니다.`}
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
  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()

  return (
    <Confirm
      open={uriHash === HASH_DELETE_CLOSE_MODAL}
      onClose={back}
      onConfirm={onConfirm}
    >
      {description}
    </Confirm>
  )
}

function AlertDeleteModal() {
  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()

  return (
    <Alert open={uriHash === HASH_DELETE_ALERT_CLOSE_MODAL} onClose={back}>
      삭제되었습니다.
    </Alert>
  )
}

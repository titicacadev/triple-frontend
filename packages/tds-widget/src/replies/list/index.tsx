import { Container, HR1, List, Text } from '@titicaca/core-elements'
import { useTranslation } from '@titicaca/next-i18next'
import { Confirm } from '@titicaca/modals'
import { useHistoryFunctions, useUriHash } from '@titicaca/react-contexts'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'

import { Reply as ReplyType } from '../types'
import { useRepliesContext } from '../context'
import { deleteReply } from '../replies-api-client'

import NotExistReplies from './not-exist-replies'
import Reply, { HASH_DELETE_CLOSE_MODAL } from './reply'

const HASH_EDIT_CLOSE_MODAL = 'reply.edit-close-modal'

export default function ReplyList({
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
  const { t } = useTranslation('common-web')

  const {
    currentMessageId,
    content: { mentioningUserName },
    initializeEditingMessage,
  } = useRepliesContext()

  const { showToast } = useTripleClientActions()

  const description = mentioningUserName
    ? t(['dabgeuleul-sagjehasigessseubnigga', '답글을 삭제하시겠습니까?'])
    : t(['daesgeuleul-sagjehasigessseubnigga', '댓글을 삭제하시겠습니까?'])

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
        showToast(t(['sagjedoeeossseubnida.', '삭제되었습니다.']))
      } else {
        alert(t(['sagjedoeeossseubnida.', '삭제되었습니다.']))
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
              {t(['ijeon-daesgeul-deobogi', '이전 댓글 더보기'])}
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
  const { t } = useTranslation('common-web')

  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()

  return (
    <Confirm
      open={uriHash === HASH_EDIT_CLOSE_MODAL}
      onClose={back}
      onConfirm={onConfirm}
    >
      {t([
        'sujeongeul-cwisohasigessseubnigga-n-sujeonghan-naeyongeun-jeojangdoeji-anhseubnida.',
        '수정을 취소하시겠습니까?\n수정한 내용은 저장되지 않습니다.',
      ])}
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

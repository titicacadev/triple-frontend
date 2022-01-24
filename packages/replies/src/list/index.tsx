import React, { Dispatch, SetStateAction, useState } from 'react'
import { Container, HR1, List, Text } from '@titicaca/core-elements'
import { Confirm } from '@titicaca/modals'
import { useHistoryFunctions, useUriHash } from '@titicaca/react-contexts'

import { Reply as ReplyType } from '../types'
import { useRepliesContext } from '../context'
import { deleteReply } from '../replies-api-clients'
import { checkUniqueReply } from '../utils'

import NotExistReplies from './not-exist-replies'
import Reply, { HASH_DELETE_CLOSE_MODAL } from './reply'

const HASH_EDIT_CLOSE_MODAL = 'reply.edit-close-modal'

export default function ReplyList({
  replies,
  totalRepliesCount,
  fetchMoreReplies,
  focusInput,
  onChangeReplies,
}: {
  replies: ReplyType[]
  totalRepliesCount?: number
  fetchMoreReplies: () => void
  focusInput: () => void
  onChangeReplies: Dispatch<
    SetStateAction<{ replies: ReplyType[]; page: number }>
  >
}) {
  const {
    parentMessageId,
    currentMessageId,
    content: { mentioningUserName, mentioningUserUid },
    initializeEditingMessage,
  } = useRepliesContext()

  const description = mentioningUserName
    ? '답글을 삭제하시겠습니까?'
    : '댓글을 삭제하시겠습니까?'

  const [modeDelete, setModeDelete] = useState(false)

  const handleReplyDelete = async () => {
    const response = (await deleteReply({ currentMessageId })) as ReplyType

    if (mentioningUserUid) {
      onChangeReplies((prev) => {
        const parentReply = prev.replies.filter(
          (reply) => reply.id === parentMessageId,
        )
        const deleteId = (parentReply[0].children || []).filter(
          (reply) => reply.id === response.id,
        )

        const deleteIndex = parentReply[0].children.indexOf(deleteId[0])

        let newChildReply = null

        if (deleteIndex === 0) {
          newChildReply = [...parentReply[0].children.slice(1)]
        } else if (deleteIndex > 0) {
          newChildReply = [
            ...parentReply[0].children.slice(0, deleteIndex),
            ...parentReply[0].children.slice(deleteIndex + 1),
          ]
        }

        parentReply[0].children = newChildReply || []
        parentReply[0].childrenCount -= 1

        return {
          ...prev,
          replies: checkUniqueReply([...prev.replies, ...parentReply]),
        }
      })
    } else {
      onChangeReplies((prev) => {
        const deleteId = prev.replies.filter(
          (reply) => reply.id === response.id,
        )
        const deleteIndex = prev.replies.indexOf(deleteId[0])
        const children = deleteId[0].children || []
        let deletedReply = null

        if (deleteIndex === 0) {
          if (children.length === 0) {
            deletedReply = [...prev.replies.slice(1)]
          }

          deleteId[0].deleted = true
        } else if (deleteIndex > 0) {
          if (children.length === 0) {
            deletedReply = [
              ...prev.replies.slice(0, deleteIndex),
              ...prev.replies.slice(deleteIndex + 1),
            ]
          } else {
            deleteId[0].deleted = true
            deleteId[0].content = {}
          }
        }

        return {
          ...prev,
          replies: checkUniqueReply([...(deletedReply || prev.replies)]),
        }
      })
    }

    setModeDelete(true)
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
              onClick={fetchMoreReplies}
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
                  modeDelete={modeDelete}
                  focusInput={focusInput}
                  onModeDelete={() => setModeDelete(false)}
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

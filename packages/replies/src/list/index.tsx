import React from 'react'
import { Container, HR1, List, Text } from '@titicaca/core-elements'
import { Confirm } from '@titicaca/modals'
import { useURIHash, useHistoryFunctions } from '@titicaca/react-contexts'

import { Reply as ReplyType } from '../types'
import { useRepliesContext } from '../context'

import NotExistReplies from './not-exist-replies'
import Reply from './reply'

const HASH_MODIFY_CLOSE_MODAL = 'reply.modify-close-modal'

export default function ReplyList({
  replies,
  totalRepliesCount,
  fetchMoreReplies,
  onFocusInput,
}: {
  replies: ReplyType[]
  totalRepliesCount?: number
  fetchMoreReplies: () => void
  onFocusInput: () => void
}) {
  const { initializeActionReplyData } = useRepliesContext()
  const { back } = useHistoryFunctions()

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
                <Reply reply={reply} onFocusInput={onFocusInput} />
              </List.Item>
            ))}
          </List>

          <ConfirmModal
            onConfirm={() => {
              initializeActionReplyData()
              back()
            }}
            onCancel={() => {
              back()
            }}
          />
        </Container>
      )}
    </>
  )
}

function ConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void
  onCancel: () => void
}) {
  const uriHash = useURIHash()
  const { back } = useHistoryFunctions()

  return (
    <Confirm
      open={uriHash === HASH_MODIFY_CLOSE_MODAL}
      onClose={back}
      // eslint-disable-next-line react/no-children-prop
      children={
        <div>
          수정을 취소하시겠습니까? <br /> 수정한 내용은 저장되지 않습니다.
        </div>
      }
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  )
}

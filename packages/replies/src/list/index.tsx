import React, { useCallback, useState } from 'react'
import { Container, HR1, List, Text } from '@titicaca/core-elements'
import { useURIHash, useHistoryFunctions } from '@titicaca/react-contexts'
import ActionSheet from '@titicaca/action-sheet'

import { Reply as ReplyType } from '../types'

import NotExistReplies from './not-exist-replies'
import Reply from './reply'

const HASH_MORE_ACTION_SHEET = 'reply.more-action-sheet'

export default function ReplyList({
  replies,
  totalRepliesCount,
  toMessageId,
  mentioningUserUid,
  mentioningUserName,
  content,
  fetchMoreReplies,
  handleWriteReplyClick,
  handleModifyReplyClick,
}: {
  replies: ReplyType[]
  totalRepliesCount?: number
  toMessageId?: string | null
  mentioningUserUid?: string | null
  mentioningUserName?: string | null
  content: string
  fetchMoreReplies: () => void
  handleWriteReplyClick: (
    reply: Partial<ReplyType['actionSpecifications']['reply']>,
    type: string,
  ) => void
  handleModifyReplyClick: (
    reply: Partial<ReplyType['actionSpecifications']['reply']>,
    text: string,
    type?: string,
  ) => void
}) {
  const [isMine, setIsMine] = useState<boolean>(false)
  const { push } = useHistoryFunctions()

  const actionSheetOpen = useCallback(() => {
    push(HASH_MORE_ACTION_SHEET)
  }, [push])

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
                  handleWriteReplyClick={handleWriteReplyClick}
                  handleModifyReplyClick={handleModifyReplyClick}
                  setIsMine={setIsMine}
                  actionSheetOpen={actionSheetOpen}
                />
              </List.Item>
            ))}
          </List>

          <FeatureActionSheet
            isMine={isMine}
            onModifyClick={() =>
              handleModifyReplyClick(
                {
                  toMessageId,
                  mentioningUserName,
                  mentioningUserUid: mentioningUserUid || '',
                },
                content,
                'modifyReply',
              )
            }
          />
        </Container>
      )}
    </>
  )
}

function FeatureActionSheet({
  isMine,
  onModifyClick,
}: {
  isMine?: boolean
  onModifyClick?: () => void
}) {
  const uriHash = useURIHash()
  const { back } = useHistoryFunctions()

  return (
    <ActionSheet
      open={uriHash === HASH_MORE_ACTION_SHEET}
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

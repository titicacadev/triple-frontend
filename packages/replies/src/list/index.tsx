import React from 'react'
import { Container, HR1, List, Text } from '@titicaca/core-elements'

import { Reply as ReplyType } from '../types'

import NotExistReplies from './not-exist-replies'
import Reply from './reply'

export default function ReplyList({
  replies,
  totalRepliesCount,
  fetchMoreReplies,
  changeReplyType,
}: {
  replies: ReplyType[]
  totalRepliesCount?: number
  fetchMoreReplies: () => void
  changeReplyType: (baseReply: ReplyType) => void
}) {
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
                  onReplyTypeChange={() => changeReplyType(reply)}
                />
              </List.Item>
            ))}
          </List>
        </Container>
      )}
    </>
  )
}

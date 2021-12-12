import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent,
} from 'react'
import { Container, FlexBox, Text, Icon } from '@titicaca/core-elements'
import { Confirm } from '@titicaca/modals'
import { useURIHash, useHistoryFunctions } from '@titicaca/react-contexts'

import {
  fetchReplies,
  fetchReplyBoard,
  registerReply,
} from './replies-api-clients'
import { Reply, ResourceType } from './types'
import ReplyList from './list'
import Register from './register'
import { checkUniqueReply } from './utils'

const HASH_MODIFY_CLOSE_MODAL = 'reply.modify-close-modal'

export default function Replies({
  resourceId,
  resourceType,
  registerPlaceholder,
  size,
  // FIXME: 개발 완료 후 onClickCapture props를 제거합니다.
  // 제공되는 댓글의 일부 기능을 노출하지 않기 위해서 추가한 임시 핸들러 props이며,
  // 개발이 완료되면 없어질 props입니다.
  onClickCapture,
}: {
  resourceId: string
  resourceType: ResourceType
  registerPlaceholder?: string
  size?: number
  onClickCapture?: (event: MouseEvent<HTMLDivElement>) => void
}) {
  const [totalRepliesCount, setTotalRepliesCount] = useState<
    number | undefined
  >(undefined)
  const [{ replies, page }, setRepliesInfo] = useState<{
    replies: Reply[]
    page: number
  }>({
    replies: [],
    page: 0,
  })

  const [
    { toMessageId, mentioningUserUid, mentioningUserName },
    setReplyActionSpecification,
  ] = useState<Partial<Reply['actionSpecifications']['reply']>>({
    toMessageId: null,
    mentioningUserUid: null,
    mentioningUserName: null,
  })
  const [registerType, setRegisterType] = useState<
    'writeReply' | 'writeChildReply' | 'modifyReply'
  >('writeReply')

  const [content, setContent] = useState('')
  const { push, back } = useHistoryFunctions()

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    async function fetchRepliesAndSet() {
      const repliesResponse = await fetchReplies({
        resourceId,
        resourceType,
        size,
      })

      setRepliesInfo((prev) => ({
        ...prev,
        replies: checkUniqueReply(repliesResponse),
      }))
    }

    fetchRepliesAndSet()
  }, [resourceId, resourceType, size])

  useEffect(() => {
    async function fetchReplyBoardAndSet() {
      const replyBoardResponse = await fetchReplyBoard({
        resourceType,
        resourceId,
      })

      setTotalRepliesCount(replyBoardResponse.rootMessagesCount)
    }

    fetchReplyBoardAndSet()
  }, [resourceId, resourceType])

  const fetchMoreReplies = useCallback(async () => {
    const repliesResponse = await fetchReplies({
      resourceId,
      resourceType,
      size,
      page: page + 1,
    })

    setRepliesInfo((prev) => ({
      ...prev,
      replies: checkUniqueReply([...repliesResponse, ...prev.replies]),
      page: prev.page + 1,
    }))
  }, [resourceId, resourceType, size, page])

  const focusing = () => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const handleWriteReplyClick = (
    reply: Partial<Reply['actionSpecifications']['reply']>,
    type: 'writeReply' | 'writeChildReply',
  ) => {
    setReplyActionSpecification(reply)
    setRegisterType(type)
    focusing()
  }

  const handleWriteCancel = () => {
    setReplyActionSpecification({
      toMessageId: null,
      mentioningUserUid: null,
      mentioningUserName: null,
    })
    setRegisterType('writeReply')
  }

  const handleModifyReplyClick = (
    reply: Partial<Reply['actionSpecifications']['reply']>,
    type: 'modifyReply',
    text: string,
  ) => {
    setRegisterType(type)
    setReplyActionSpecification(reply)
    setContent(text)
    focusing()
  }

  const handleModifyCancel = () => {
    back()
    setReplyActionSpecification({
      toMessageId: null,
      mentioningUserUid: null,
      mentioningUserName: null,
    })
    setContent('')
    setRegisterType('writeReply')
  }

  const handleRegister = (content: string) => {
    if (!content) {
      return
    }

    registerReply({
      resourceId,
      resourceType,
      messageId: toMessageId || '',
      content,
      mentionedUserUid: mentioningUserUid || '',
      registerType,
    })

    handleWriteCancel()
  }

  const handleClose =
    registerType === 'modifyReply'
      ? () => push(HASH_MODIFY_CLOSE_MODAL)
      : handleWriteCancel

  return (
    <Container onClickCapture={onClickCapture}>
      <ReplyList
        replies={replies}
        totalRepliesCount={totalRepliesCount}
        fetchMoreReplies={fetchMoreReplies}
        handleWriteReplyClick={handleWriteReplyClick}
        handleModifyReplyClick={handleModifyReplyClick}
      />

      {registerType === 'writeChildReply' || registerType === 'modifyReply' ? (
        <FlexBox
          flex
          padding={{ top: 10, bottom: 10, left: 20, right: 20 }}
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="gray50"
        >
          <Text size={12} lineHeight="19px" bold color="gray700">
            {registerType === 'modifyReply'
              ? mentioningUserUid
                ? `${mentioningUserName}님에게 작성한 답글 수정 중`
                : '댓글 수정 중'
              : `${mentioningUserName}님께 답글 작성 중`}
          </Text>

          <Icon
            onClick={handleClose}
            src="https://assets.triple.guide/images/btn-com-close@3x.png"
          />
        </FlexBox>
      ) : null}

      <Register
        content={content}
        registerPlaceholder={registerPlaceholder}
        textareaRef={textareaRef}
        onSubmit={handleRegister}
      />

      <ConfirmModal
        onConfirm={handleModifyCancel}
        onCancel={() => {
          back()
          setRegisterType('modifyReply')
        }}
      />
    </Container>
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

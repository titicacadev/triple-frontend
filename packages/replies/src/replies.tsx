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
  replyActions,
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
    {
      currentMessageId,
      parentMessageId,
      content: { plaintext, mentioningUserUid, mentioningUserName },
    },
    setReplyActionSpecification,
  ] = useState<{
    currentMessageId?: string | null
    parentMessageId?: string | null
    content: {
      plaintext?: string
      mentioningUserUid?: string | null
      mentioningUserName?: string | null
    }
  }>({
    currentMessageId: null,
    parentMessageId: null,
    content: {
      plaintext: '',
      mentioningUserUid: null,
      mentioningUserName: null,
    },
  })

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

  const handleWriteReplyClick = ({
    toMessageId,
    mentioningUserUid,
    mentioningUserName,
  }: Reply['actionSpecifications']['reply']) => {
    const convertReply = {
      parentMessageId: toMessageId,
      content: {
        mentioningUserUid,
        mentioningUserName,
      },
    }
    setReplyActionSpecification(convertReply)
    focusing()
  }

  const handleWriteCancel = () => {
    setReplyActionSpecification({
      currentMessageId: null,
      parentMessageId: null,
      content: {
        plaintext: '',
        mentioningUserUid: null,
        mentioningUserName: null,
      },
    })
  }

  const handleModifyReplyClick = ({
    mentionedUserName,
    mentionedUserUid,
    messageId,
    toMessageId,
    plaintext,
  }: Partial<
    Reply['actionSpecifications']['edit'] & {
      toMessageId?: string | null
      messageId?: string | null
    }
  >) => {
    setReplyActionSpecification({
      currentMessageId: messageId,
      parentMessageId: toMessageId,
      content: {
        plaintext,
        mentioningUserUid: mentionedUserUid,
        mentioningUserName: mentionedUserName,
      },
    })

    focusing()
  }

  const handleModifyCancel = () => {
    back()

    setReplyActionSpecification({
      currentMessageId: null,
      parentMessageId: null,
      content: {
        plaintext: '',
        mentioningUserUid: null,
        mentioningUserName: null,
      },
    })
  }

  const handleContentChange = (content: string) => {
    setReplyActionSpecification((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        plaintext: content,
      },
    }))
  }

  const handleRegister = (content: string) => {
    if (!content) {
      return
    }

    replyActions({
      resourceId,
      resourceType,
      parentMessageId: parentMessageId || '',
      currentMessageId: currentMessageId || '',
      content: plaintext || '',
      mentionedUserUid: mentioningUserUid || '',
    })

    handleWriteCancel()

    handleContentChange('')
  }

  const handleClose =
    currentMessageId && parentMessageId
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

      {parentMessageId ? (
        <FlexBox
          flex
          padding={{ top: 10, bottom: 10, left: 20, right: 20 }}
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="gray50"
        >
          <Text size={12} lineHeight="19px" bold color="gray700">
            {mentioningUserUid && !currentMessageId
              ? `${mentioningUserName}님께 답글 작성 중`
              : currentMessageId === parentMessageId
              ? '댓글 수정 중'
              : `${mentioningUserName}님에게 작성한 답글 수정 중`}
          </Text>

          <Icon
            onClick={handleClose}
            src="https://assets.triple.guide/images/btn-com-close@3x.png"
          />
        </FlexBox>
      ) : null}

      <Register
        content={plaintext || ''}
        registerPlaceholder={registerPlaceholder}
        textareaRef={textareaRef}
        handleContentChange={handleContentChange}
        onSubmit={handleRegister}
      />

      <ConfirmModal
        onConfirm={handleModifyCancel}
        onCancel={() => {
          back()
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

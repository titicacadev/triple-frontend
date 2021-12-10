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
  writeReply,
  writeChildReply,
  modifyReply,
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
  const [actionType, setActionType] = useState<
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

  // 댓글 더보기
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
    setActionType(type)
    focusing()
  }

  const handleWriteCancel = () => {
    setReplyActionSpecification({
      toMessageId: null,
      mentioningUserUid: null,
      mentioningUserName: null,
    })
    setActionType('writeReply')
  }

  // 로컬 테스트용 코드
  // const [modalOpen, setModalOpen] = useState(false)

  const handleModifyReplyClick = (
    reply: Partial<Reply['actionSpecifications']['reply']>,
    type: 'modifyReply',
    text: string,
  ) => {
    setActionType(type)
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
    setActionType('writeReply')

    // 로컬 테스트용 코드
    // setModalOpen(true)
  }

  const wrtieReplyFunc = async (content: string) => {
    await writeReply({
      resourceId,
      resourceType,
      content,
    })
  }

  const writeChildReplyFunc = async (content: string) => {
    await writeChildReply({
      messageId: toMessageId || '',
      content,
      mentionedUserUid: mentioningUserUid || '',
    })
  }

  const modifyReplyFunc = async (content: string) => {
    await modifyReply({
      messageId: toMessageId || '',
      content,
      mentionedUserUid: mentioningUserUid || '',
    })
  }

  const REGISTER_ACTIONS: { [key: string]: (content: string) => void } = {
    writeReply: wrtieReplyFunc,
    writeChildReply: writeChildReplyFunc,
    modifyReply: modifyReplyFunc,
  }

  const handleRegister = (content: string) => {
    if (!content) {
      return
    }

    REGISTER_ACTIONS[actionType](content)

    handleWriteCancel()
  }

  const handleClose =
    actionType === 'modifyReply'
      ? () => push(HASH_MODIFY_CLOSE_MODAL)
      : // () => setModalOpen(true) // 로컬 테스트용 코드
        handleWriteCancel

  return (
    <Container onClickCapture={onClickCapture}>
      <ReplyList
        replies={replies}
        totalRepliesCount={totalRepliesCount}
        fetchMoreReplies={fetchMoreReplies}
        handleWriteReplyClick={handleWriteReplyClick}
        handleModifyReplyClick={handleModifyReplyClick}
      />

      {actionType === 'writeChildReply' || actionType === 'modifyReply' ? (
        <FlexBox
          flex
          padding={{ top: 10, bottom: 10, left: 20, right: 20 }}
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="gray50"
        >
          <Text size={12} lineHeight="19px" bold color="gray700">
            {actionType === 'modifyReply'
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
        // 로컬 테스트용 코드
        // open={modalOpen}
        // onClose={() => setModalOpen(false)}
        onConfirm={handleModifyCancel}
        onCancel={() => {
          back()
          setActionType('modifyReply')
        }}
      />
    </Container>
  )
}

function ConfirmModal({
  // 로컬 테스트용 코드
  // open,
  // onClose,
  onConfirm,
  onCancel,
}: {
  // 로컬 테스트용 코드
  // open: boolean
  // onClose: () => void
  onConfirm: () => void
  onCancel: () => void
}) {
  const uriHash = useURIHash()
  const { back } = useHistoryFunctions()

  return (
    <Confirm
      // 로컬 테스트용 코드
      // open={open}
      // onClose={onClose}
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

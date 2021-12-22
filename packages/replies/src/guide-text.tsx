import React from 'react'
import { FlexBox, Text, Icon } from '@titicaca/core-elements'
import { useHistoryFunctions } from '@titicaca/react-contexts'

import { useRepliesContext } from './context'

const HASH_MODIFY_CLOSE_MODAL = 'reply.modify-close-modal'

export default function GuideText() {
  const {
    currentMessageId,
    parentMessageId,
    content: { mentioningUserUid, mentioningUserName },
    initializeEditingMessage,
  } = useRepliesContext()

  const { push } = useHistoryFunctions()

  const handleClose =
    currentMessageId && parentMessageId
      ? () => push(HASH_MODIFY_CLOSE_MODAL)
      : () => initializeEditingMessage()

  return (
    <>
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
    </>
  )
}

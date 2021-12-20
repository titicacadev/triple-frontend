import React from 'react'
import styled from 'styled-components'
import { Container, FlexBox, HR1 } from '@titicaca/core-elements'

import { actionReply } from './replies-api-clients'
import AutoResizingTextarea from './auto-resizing-textarea'
import { useRepliesContext } from './context'
import { ResourceType } from './types'

const RegisterButton = styled.button`
  width: 26px;
  padding: 0;
  margin-left: 20px;
  line-height: 1.2;
  font-size: 15px;
  font-weight: bold;
  color: ${(props) =>
    props.disabled ? 'var(--color-blue500)' : 'var(--color-blue)'};
  background: inherit;
  border: none;
  outline: none;
  cursor: pointer;
`

export default function Register({
  resourceId,
  resourceType,
  registerPlaceholder,
}: {
  resourceId: string
  resourceType: ResourceType
  registerPlaceholder?: string
}) {
  const {
    parentMessageId,
    currentMessageId,
    content: { plaintext, mentioningUserUid },
    textareaRef,
    initializeActionReplyData,
    handleContentChange,
  } = useRepliesContext()

  const handleRegister = () => {
    if (!plaintext) {
      return
    }

    actionReply({
      resourceId,
      resourceType,
      currentMessageId,
      parentMessageId,
      content: plaintext,
      mentionedUserUid: mentioningUserUid,
    })

    initializeActionReplyData()

    handleContentChange('')
  }

  return (
    <Container cursor="pointer">
      <HR1 margin={{ top: 0 }} />

      <FlexBox
        flex
        alignItems="flex-end"
        padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <AutoResizingTextarea
          placeholder={
            registerPlaceholder || '이 일정에 궁금한 점은 댓글로 써주세요.'
          }
          minRows={1}
          maxRows={4}
          value={plaintext || ''}
          onChange={handleContentChange}
          ref={textareaRef}
        />

        <RegisterButton
          onClick={() => {
            handleRegister()
          }}
          disabled={!plaintext}
        >
          등록
        </RegisterButton>
      </FlexBox>

      <HR1 margin={{ top: 0 }} />
    </Container>
  )
}

import { ForwardedRef, forwardRef } from 'react'
import styled from 'styled-components'
import { Container, FlexBox, HR1 } from '@titicaca/core-elements'
import { useLoginCtaModal } from '@titicaca/modals'
import { useSessionAvailability } from '@titicaca/react-contexts'
import { useSessionCallback } from '@titicaca/ui-flow'

import { authorMessage } from './replies-api-clients'
import AutoResizingTextarea, { TextAreaHandle } from './auto-resizing-textarea'
import { useRepliesContext } from './context'
import { ResourceType, Reply } from './types'

const RegisterButton = styled.button<{ active: boolean }>`
  width: 26px;
  padding: 0;
  margin-left: 20px;
  line-height: 1.2;
  font-size: 15px;
  font-weight: bold;
  color: ${(props) =>
    props.active ? 'var(--color-blue)' : 'var(--color-blue500)'};
  background: inherit;
  border: none;
  outline: none;
  cursor: pointer;
`

function Register(
  {
    resourceId,
    resourceType,
    registerPlaceholder,
    onReplyAdd,
    onReplyEdit,
  }: {
    resourceId: string
    resourceType: ResourceType
    registerPlaceholder?: string
    onReplyAdd: (response: Reply) => void
    onReplyEdit: (response: Reply) => void
  },
  ref: ForwardedRef<TextAreaHandle>,
) {
  const {
    parentMessageId,
    currentMessageId,
    content: { plaintext, mentioningUserUid },
    initializeEditingMessage,
    handleContentChange,
  } = useRepliesContext()

  const sessionAvailable = useSessionAvailability()
  const { show: showLoginCta } = useLoginCtaModal()

  const handleRegister = useSessionCallback(async () => {
    if (!plaintext) {
      return
    }

    const { response, authoringRequestType } = (await authorMessage({
      resourceId,
      resourceType,
      currentMessageId,
      parentMessageId,
      content: plaintext,
      mentionedUserUid: mentioningUserUid,
    })) as { response: Reply; authoringRequestType: string }

    if (authoringRequestType === 'editReply') {
      onReplyEdit(response)
    } else {
      onReplyAdd(response)
    }

    initializeEditingMessage()

    handleContentChange('')
  })

  return (
    <Container
      cursor="pointer"
      onClick={!sessionAvailable ? () => showLoginCta() : undefined}
    >
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
          ref={ref}
          readOnly={!sessionAvailable}
        />

        <RegisterButton
          onClick={() => {
            handleRegister()
          }}
          active={!!plaintext}
        >
          등록
        </RegisterButton>
      </FlexBox>

      <HR1 margin={{ top: 0 }} />
    </Container>
  )
}

export default forwardRef(Register)

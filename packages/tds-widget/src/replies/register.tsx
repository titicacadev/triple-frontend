import { ForwardedRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Container, FlexBox, HR1 } from '@titicaca/tds-ui'
import { useSessionAvailability, useLoginCtaModal } from '@titicaca/triple-web'
import { useSessionCallback } from '@titicaca/ui-flow'

import { authorMessage } from './replies-api-client'
import AutoResizingTextarea, { TextAreaHandle } from './auto-resizing-textarea'
import { useRepliesContext } from './context'
import { ResourceType, Reply, Placeholders } from './types'

const RegisterButton = styled.button<{ active: boolean }>`
  width: 26px;
  white-space: nowrap;
  padding: 0;
  font-size: 15px;
  font-weight: bold;
  color: ${(props) =>
    props.active ? 'var(--color-blue)' : 'var(--color-blue500)'};
  outline: none;
`

function Register(
  {
    resourceId,
    resourceType,
    placeholders,
    onReplyAdd,
    onReplyEdit,
  }: {
    resourceId: string
    resourceType: ResourceType
    placeholders?: Placeholders
    onReplyAdd: (response: Reply) => void
    onReplyEdit: (response: Reply) => void
  },
  ref: ForwardedRef<TextAreaHandle>,
) {
  const { t } = useTranslation('triple-frontend')

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

  const placeholder = parentMessageId
    ? placeholders?.childReply || t('답글을 입력하세요.')
    : placeholders?.reply || t('댓글을 입력하세요.')

  return (
    <Container
      onClick={!sessionAvailable ? () => showLoginCta() : undefined}
      css={{
        cursor: 'pointer',
      }}
    >
      <HR1 compact />

      <FlexBox
        flex
        justifyContent="space-between"
        css={{
          padding: '20px',
        }}
      >
        <AutoResizingTextarea
          placeholder={placeholder ?? ''}
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
          {t('등록')}
        </RegisterButton>
      </FlexBox>

      <HR1 compact />
    </Container>
  )
}

export default forwardRef(Register)

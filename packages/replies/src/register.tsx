import React, { Ref, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container, FlexBox, HR1 } from '@titicaca/core-elements'

import AutoResizingTextarea from './auto-resizing-textarea'

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
  registerPlaceholder,
  textareaRef,
  content,
  onSubmit,
}: {
  registerPlaceholder?: string
  textareaRef?: Ref<HTMLTextAreaElement>
  content: string
  onSubmit: (replyContent: string) => void
}) {
  const [replyContent, setReplyContent] = useState('')

  useEffect(() => {
    setReplyContent(content)
  }, [content])

  const disabled = replyContent === content

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
          value={replyContent}
          onChange={setReplyContent}
          ref={textareaRef}
        />

        <RegisterButton
          onClick={() => {
            onSubmit(replyContent)
            setReplyContent('')
          }}
          disabled={disabled}
        >
          등록
        </RegisterButton>
      </FlexBox>

      <HR1 margin={{ top: 0 }} />
    </Container>
  )
}

import { Container, Text, FlexBox } from '@titicaca/core-elements'
import { MouseEventHandler } from 'react'
import styled, { CSSProp } from 'styled-components'

import { useScroll } from '../../chat/scroll-context'

const PreviewImage = styled.img`
  margin-right: 10px;
  width: 34px;
  height: 34px;
  object-fit: 'cover';
`

interface ParentMessageType {
  id: string
  senderName: string
  previewImageUrl?: string
  text: string
  titleColor?: string
  previewTextColor?: string
  onClick?: MouseEventHandler
  css?: CSSProp
}

export default function ParentMessage({
  id,
  senderName,
  previewImageUrl,
  text,
  titleColor,
  previewTextColor,
  onClick,
  ...props
}: ParentMessageType) {
  const { scrollToMessage } = useScroll()

  return (
    <FlexBox
      onClick={(e) => {
        scrollToMessage(id)
        onClick?.(e)
      }}
      flex
      borderRadius={13}
      css={{
        padding: '8px 11px',
        marginBottom: 11,
        alignItems: 'center',
        backgroundColor: 'var(--color-white)',
      }}
      {...props}
    >
      {previewImageUrl ? <PreviewImage src={previewImageUrl} /> : null}
      <Container>
        <Text
          css={{
            color: titleColor,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {senderName}님에게 답장
        </Text>
        <Text
          margin={{ top: 2, bottom: 1 }}
          color={previewTextColor}
          size={12}
          css={{
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            opacity: '0.7',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': '1',
          }}
        >
          {text}
        </Text>
      </Container>
    </FlexBox>
  )
}
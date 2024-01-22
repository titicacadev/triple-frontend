import { Container, Text, FlexBox } from '@titicaca/core-elements'
import { MouseEventHandler } from 'react'
import styled from 'styled-components'

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
  backgroundColor?: string
  titleColor?: string
  previewTextColor?: string
  onClick?: MouseEventHandler
}

export default function ParentMessage({
  id,
  senderName,
  previewImageUrl,
  text,
  backgroundColor,
  titleColor,
  previewTextColor,
  onClick,
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
        paddingLeft: 11,
        paddingRight: 11,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 11,
        backgroundColor: backgroundColor || 'var(--color-white)',
        alignItems: 'center',
      }}
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

import { Container, Text, FlexBox } from '@titicaca/tds-ui'
import { styled, CSSProp } from 'styled-components'

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
  onClick?: (id: string) => void
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
  return (
    <FlexBox
      onClick={() => onClick?.(id)}
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

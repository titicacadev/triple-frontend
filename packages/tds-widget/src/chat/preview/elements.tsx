import { Container, List, Text } from '@titicaca/tds-ui'
import { css, styled } from 'styled-components'

import { convertDateTime as defaultConvertDateTime } from './utils'

export const PreviewListItem = styled(List.Item)<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 0 20px;
  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: var(--color-mint100);
        `
      : null};
  border-bottom: 1px solid #f5f5f5;
`

export const ChatRoomThumbnail = styled.img`
  position: absolute;
  top: 20px;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`

export const ChatRoomTitle = styled(Text).attrs({
  size: 'medium',
  bold: true,
  ellipsis: true,
})``

export const ChatRoomMessage = styled(Text).attrs({
  size: 'small',
  ellipsis: true,
  color: 'gray600',
  maxLines: 2,
  lineHeight: '16px',
  margin: { top: 3 },
})``

export const ChatRoomCreatedAt = ({
  createdAt,
  convertDateTime = defaultConvertDateTime,
  ...props
}: {
  createdAt: string
  convertDateTime?: (createdAt: string, formatType?: string) => string
}) => {
  return (
    <Container
      position="absolute"
      css={{
        top: '20px',
        right: 0,
      }}
      {...props}
    >
      <Text size={12} color="gray500" inlineBlock lineHeight="21px">
        {convertDateTime(createdAt)}
      </Text>
    </Container>
  )
}

export const ChatRoomUnread = ({
  unreadCount,
  ...props
}: {
  unreadCount: number
}) => {
  return (
    <Container
      position="absolute"
      backgroundColor="red"
      borderRadius={20}
      css={{
        width: 20,
        height: 20,
        top: '44px',
        right: 0,
      }}
      {...props}
    >
      <Text color="white" lineHeight="20px" textAlign="center">
        {unreadCount}
      </Text>
    </Container>
  )
}

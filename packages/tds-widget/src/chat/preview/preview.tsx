import { Container, TextProps } from '@titicaca/tds-ui'
import { CSSProp } from 'styled-components'
import { ComponentType, ImgHTMLAttributes, ReactNode } from 'react'

import { ChatUser } from '../types'
import { ChatRoom } from '../types/list'
import { getProfileImageUrl } from '../utils'

import { convertDateTime, getTextMessage } from './utils'
import {
  ChatRoomCreatedAt,
  ChatRoomMessage,
  ChatRoomThumbnail,
  ChatRoomTitle,
  ChatRoomUnread,
  PreviewListItem,
} from './elements'

export function Preview({
  chatRoom,
  me,
  handleRoomClick,
  containerStyle,
  titleMessageContainerStyle,
  Thumbnail = ChatRoomThumbnail,
  Title = ChatRoomTitle,
  Message = ChatRoomMessage,
  CreatedAt = ChatRoomCreatedAt,
  Unread = ChatRoomUnread,
  badge,
}: {
  chatRoom: ChatRoom
  me: ChatUser
  handleRoomClick: (roomId: string) => void

  containerStyle?: { css?: CSSProp }
  titleMessageContainerStyle?: { css?: CSSProp }
  Thumbnail?: ComponentType<ImgHTMLAttributes<HTMLImageElement>>
  Title?: ComponentType<TextProps>
  Message?: ComponentType<TextProps>
  CreatedAt?: ComponentType<{
    createdAt: string
    convertDateTime?: (createdAt: string, formatType?: string) => string
  }>
  Unread?: ComponentType<{ unreadCount: number }>
  badge?: ReactNode
}) {
  const { lastMessage, unreadCount, members, id } = chatRoom
  const { payload, createdAt } = lastMessage || {}

  const others = members?.filter(({ id }) => me && id !== me.id) ?? []
  const title = others.map(({ profile: { name } }) => name).join(',')
  const profileImageUrl = getProfileImageUrl(others[0])

  return (
    <PreviewListItem>
      <Container
        position="relative"
        onClick={() => handleRoomClick(id)}
        css={{
          padding: '20px 0 20px 0',
          height: 130,
        }}
        {...containerStyle}
      >
        <Thumbnail src={profileImageUrl} role="presentation none" alt="" />

        <Container
          css={{
            margin: '0 80px 0 65px',
            minHeight: 50,
          }}
          {...titleMessageContainerStyle}
        >
          <Title>{title}</Title>

          {payload && Message ? (
            <Message>{getTextMessage(payload)}</Message>
          ) : null}

          {createdAt && CreatedAt ? (
            <CreatedAt
              createdAt={createdAt}
              convertDateTime={convertDateTime}
            />
          ) : null}
        </Container>

        {unreadCount && Unread ? <Unread unreadCount={unreadCount} /> : null}

        {badge}
      </Container>
    </PreviewListItem>
  )
}

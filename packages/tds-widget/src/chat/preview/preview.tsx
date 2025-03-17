import { Container, TextProps } from '@titicaca/tds-ui'
import { CSSProp } from 'styled-components'
import { ComponentType, ImgHTMLAttributes, ReactNode } from 'react'

import { getProfileImageUrl } from '../utils'
import {
  ChatRoomListItemInterface,
  RoomType,
  UserInterface,
  UserType,
} from '../types'

import { convertDateTime, getTextMessage } from './utils'
import { ChatRoomMessage, ChatRoomThumbnail, ChatRoomTitle } from './elements'

export interface PreviewProps<T, U> {
  chatRoom: ChatRoomListItemInterface<T, U>
  me: UserInterface
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
  customTitle?: ReactNode
  customElement?: ReactNode
}

export function Preview<T = RoomType, U = UserType>({
  chatRoom,
  me,
  handleRoomClick,
  containerStyle,
  titleMessageContainerStyle,
  Thumbnail = ChatRoomThumbnail,
  Title = ChatRoomTitle,
  Message = ChatRoomMessage,
  CreatedAt,
  Unread,
  customTitle,
  customElement,
}: PreviewProps<T, U>) {
  const { lastMessage, unreadCount, members, id } = chatRoom
  const { payload, createdAt } = lastMessage || {}

  const others = members?.filter(({ id }) => me && id !== me.id) ?? []
  const title = others.map(({ profile: { name } }) => name).join(',')
  const profileImageUrl = getProfileImageUrl(others[0])

  return (
    <Container
      position="relative"
      onClick={() => handleRoomClick(id)}
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
        {customTitle}

        {payload && Message ? (
          <Message>{getTextMessage(payload)}</Message>
        ) : null}

        {createdAt && CreatedAt ? (
          <CreatedAt createdAt={createdAt} convertDateTime={convertDateTime} />
        ) : null}
      </Container>

      {unreadCount && Unread ? <Unread unreadCount={unreadCount} /> : null}

      {customElement}
    </Container>
  )
}

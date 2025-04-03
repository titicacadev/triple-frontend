import { Container, TextProps } from '@titicaca/tds-ui'
import { CSSProp } from 'styled-components'
import { ComponentType, ImgHTMLAttributes, ReactNode } from 'react'

import { getProfileImageUrl } from '../utils'
import {
  ChatRoomListItemInterface,
  ChatUserInterface,
  RoomInterface,
  RoomType,
  UserType,
} from '../types'

import { getTextMessage } from './utils'
import { ChatRoomMessage, ChatRoomTitle } from './elements'

export interface PreviewProps<T, U> {
  chatRoom: RoomInterface<T, U> | ChatRoomListItemInterface<T, U>
  me: ChatUserInterface<U>
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
  Thumbnail,
  Title = ChatRoomTitle,
  Message = ChatRoomMessage,
  CreatedAt,
  Unread,
  customTitle,
  customElement,
}: PreviewProps<T, U>) {
  const { lastMessage, unreadCount, members, id } = chatRoom
  const { payload, createdAt } = lastMessage || {}

  const others = members.filter(
    ({ type, profile }) => type !== me.type || profile.name !== me.profile.name,
  )
  const title = others.map(({ profile: { name } }) => name).join(',')
  const profileImageUrl = getProfileImageUrl(others[0])

  return (
    <Container
      position="relative"
      onClick={() => handleRoomClick(id)}
      {...containerStyle}
    >
      {Thumbnail ? (
        <Thumbnail src={profileImageUrl} role="presentation none" alt="" />
      ) : null}

      <Container
        css={
          titleMessageContainerStyle?.css ?? {
            margin: '0 80px 0 65px',
            minHeight: 50,
          }
        }
      >
        <Title>{title}</Title>
        {customTitle}

        {payload && Message ? (
          <Message>{getTextMessage(payload)}</Message>
        ) : null}

        {createdAt && CreatedAt ? <CreatedAt createdAt={createdAt} /> : null}
      </Container>

      {unreadCount && Unread ? <Unread unreadCount={unreadCount} /> : null}

      {customElement}
    </Container>
  )
}

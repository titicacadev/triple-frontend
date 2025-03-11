import { Container, List, Text } from '@titicaca/tds-ui'
import { styled } from 'styled-components'
import { ReactNode } from 'react'

import { ChatUser } from '../types'
import { ChatRoom } from '../types/list'
import { getProfileImageUrl } from '../utils'

import { convertDateTime, getTextMessage } from './utils'

const PreviewListItem = styled(List.Item)`
  cursor: pointer;
  padding: 0 20px;
  border-bottom: 1px solid #f5f5f5;
`

const ChatRoomThumbnail = styled.img`
  position: absolute;
  top: 20px;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`

export default function Preview({
  chatRoom,
  me,
  handleSelectRoom,
  badge,
  ...props
}: {
  chatRoom: ChatRoom
  me: ChatUser
  handleSelectRoom: (roomId: string) => void
  badge?: ReactNode
}) {
  const { lastMessage, unreadCount, members, id } = chatRoom
  const { payload, createdAt } = lastMessage || {}

  const others = members?.filter(({ id }) => me && id !== me.id) ?? []
  const title = others.map(({ profile: { name } }) => name).join(',')
  const profileImageUrl = getProfileImageUrl(others[0])

  return (
    <PreviewListItem {...props}>
      <Container
        position="relative"
        onClick={() => handleSelectRoom(id)}
        css={{
          padding: '20px 0 20px 0',
          height: 130,
        }}
      >
        <ChatRoomThumbnail
          src={profileImageUrl}
          role="presentation none"
          alt=""
        />

        <Container
          css={{
            margin: '0 80px 0 65px',
            minHeight: 50,
          }}
        >
          <Text bold size="medium" ellipsis>
            {title}
          </Text>
          {payload ? (
            <Text
              color="gray600"
              size="small"
              maxLines={2}
              lineHeight="16px"
              margin={{ top: 3 }}
            >
              {getTextMessage(payload)}
            </Text>
          ) : null}
          {createdAt ? (
            <Container
              position="absolute"
              css={{
                top: '20px',
                right: 0,
              }}
            >
              <Text size={12} color="gray500" inlineBlock lineHeight="21px">
                {convertDateTime(createdAt)}
              </Text>
            </Container>
          ) : null}
        </Container>

        {unreadCount ? (
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
          >
            <Text color="white" lineHeight="20px" textAlign="center">
              {unreadCount}
            </Text>
          </Container>
        ) : null}

        {badge}
      </Container>
    </PreviewListItem>
  )
}

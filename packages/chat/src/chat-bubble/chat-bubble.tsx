import React, { memo, useMemo } from 'react'

import {
  MessageInterface,
  UserInfoInterface,
  OtherUnreadInterface,
  UserType,
} from '../types'
import { getProfileImageUrl } from '../utils/image'

import { ChatBubbleUI } from './chat-bubble-ui'

interface ChatBubbleProps {
  userInfo: UserInfoInterface
  message: MessageInterface
  otherReadInfo?: OtherUnreadInterface[]
  displayTarget: UserType
  postMessage?: () => Promise<boolean>
}

const ChatBubble = ({
  message,
  message: { senderId, createdAt },
  userInfo: { others },
  otherReadInfo,
  displayTarget: componentDisplayTarget,
  postMessage,
}: ChatBubbleProps) => {
  const otherUserInfo = useMemo(
    () => others.find((other) => other.id === senderId),
    [senderId, others],
  )

  const unreadCount = otherReadInfo
    ? otherReadInfo.reduce(
        (prev, info) =>
          Number(info.lastSeenMessageId) < Number(message.id) &&
          info.memberId !== message.senderId
            ? prev + 1
            : prev,
        0,
      )
    : null

  const payload = useMemo(() => {
    if (!message.displayTarget || message.displayTarget === 'all') {
      return message.payload
    }
    if (message.displayTarget.includes(componentDisplayTarget)) {
      return message.payload
    }
    return message.alternative ?? message.payload
  }, [
    componentDisplayTarget,
    message.alternative,
    message.displayTarget,
    message.payload,
  ])

  return (
    <ChatBubbleUI
      type={otherUserInfo ? 'received' : 'sent'}
      profileImageUrl={
        otherUserInfo ? getProfileImageUrl(otherUserInfo) : undefined
      }
      profileName={otherUserInfo?.profile.name}
      unreadCount={unreadCount}
      createdAt={createdAt}
      payload={payload}
      onRetry={postMessage}
    />
  )
}

export default memo(ChatBubble)

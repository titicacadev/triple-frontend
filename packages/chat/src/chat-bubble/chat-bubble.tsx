import { memo, useMemo } from 'react'

import {
  ImagePayload,
  MessageInterface,
  MessageType,
  OtherUnreadInterface,
  PostMessageActionType,
  TextPayload,
  UserInfoInterface,
  UserType,
} from '../types'
import { getProfileImageUrl } from '../utils'
import { ChatBubbleStyle } from '../types/ui'

import { ChatBubbleUI } from './chat-bubble-ui'

interface ChatBubbleProps {
  userInfo: UserInfoInterface
  message: MessageInterface
  otherReadInfo?: OtherUnreadInterface[]
  displayTarget: UserType
  postMessageAction?: PostMessageActionType
  disableUnreadCount?: boolean
  onRetryButtonClick?: (message: MessageInterface) => void
  onRetryCancelButtonClick?: (message: MessageInterface) => void
  blindedText?: string
  bubbleStyle?: ChatBubbleStyle
}

const ChatBubble = ({
  message,
  message: { senderId, createdAt },
  userInfo: { others },
  otherReadInfo,
  displayTarget: componentDisplayTarget,
  postMessageAction,
  onRetryButtonClick,
  onRetryCancelButtonClick,
  disableUnreadCount = false,
  blindedText,
  bubbleStyle,
}: ChatBubbleProps) => {
  const otherUserInfo = useMemo(
    () => others.find((other) => other.id === senderId),
    [senderId, others],
  )

  const unreadCount =
    !disableUnreadCount && otherReadInfo
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

  const couldRetry =
    !message.createdAt &&
    message.payload.type !== MessageType.RICH &&
    !!postMessageAction

  const onRetry = () => {
    onRetryButtonClick?.(message)
    return postMessageAction?.(
      message.payload as TextPayload | ImagePayload,
      true,
    )
  }

  const onCancel = () => {
    onRetryCancelButtonClick?.(message)
  }

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
      onRetry={couldRetry ? onRetry : undefined}
      onCancel={onCancel}
      blindedAt={message.blindedAt}
      blindedText={blindedText}
      bubbleStyle={bubbleStyle}
    />
  )
}

export default memo(ChatBubble)

import { memo, useMemo } from 'react'

import {
  ImagePayload,
  MessageInterface,
  MessageType,
  OtherUnreadInterface,
  PostMessageActionType,
  TextPayload,
  UserType,
} from '../types'
import { getProfileImageUrl } from '../utils'
import { ChatBubbleStyle } from '../types/ui'

import { ChatBubbleUI } from './bubble-container'

interface ChatBubbleProps {
  my: boolean
  message: MessageInterface
  otherReadInfo?: OtherUnreadInterface[]
  displayTarget: UserType
  postMessageAction?: PostMessageActionType
  disableUnreadCount?: boolean
  onRetryButtonClick?: (message: MessageInterface) => void
  onRetryCancelButtonClick?: (message: MessageInterface) => void
  onThanksClick?: (id: number, haveMyThanks: boolean) => void
  blindedText?: string
  bubbleStyle?: ChatBubbleStyle
}

const ChatBubble = ({
  my,
  message,
  message: { sender, createdAt },
  otherReadInfo,
  displayTarget: componentDisplayTarget,
  postMessageAction,
  onRetryButtonClick,
  onRetryCancelButtonClick,
  onThanksClick,
  disableUnreadCount = false,
  blindedText,
}: ChatBubbleProps) => {
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
      id={message.id.toString()}
      type={my ? 'sent' : 'received'}
      profileImageUrl={my ? undefined : getProfileImageUrl(sender)}
      profileName={sender.profile.name}
      unreadCount={unreadCount}
      createdAt={createdAt}
      payload={payload}
      onRetry={couldRetry ? onRetry : undefined}
      onCancel={onCancel}
      blindedAt={message.blindedAt}
      blindedText={blindedText}
      thanks={message.reactions?.thanks}
      onThanksClick={
        onThanksClick
          ? () => {
              if (message.reactions?.thanks) {
                onThanksClick?.(message.id, message.reactions.thanks.haveMine)
              }
            }
          : undefined
      }
      // bubbleStyle={bubbleStyle}
    />
  )
}

export default memo(ChatBubble)

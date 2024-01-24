import { isSameDay, isSameMinute } from 'date-fns'

import { BubbleType, BubbleTypeArray } from '../bubble/bubble-ui'
import { UserInterface } from '../types'

import { MessageBase } from './type'

export function isBubbleType(type: string): type is BubbleType {
  return BubbleTypeArray.includes(type as BubbleType)
}

export function isSameSender<
  Message extends MessageBase<User>,
  User extends UserInterface,
>(
  prevMessage: Message | null,
  currentMessage: Message,
  nextMessage: Message | null,
) {
  return {
    isSameSenderAsPrevMessage:
      prevMessage?.sender.id === currentMessage.sender.id,
    isSameSenderAsNextMessage:
      nextMessage?.sender.id === currentMessage.sender.id,
  }
}

export function isSameDate<
  Message extends MessageBase<User>,
  User extends UserInterface,
>(
  prevMessage: Message | null,
  currentMessage: Message,
  nextMessage: Message | null,
) {
  const prevMessageCreatedAt = prevMessage?.createdAt
    ? new Date(prevMessage?.createdAt)
    : null
  const currentMessageCreatedAt = currentMessage.createdAt
    ? new Date(currentMessage.createdAt)
    : null
  const nextMessageCreatedAt = nextMessage?.createdAt
    ? new Date(nextMessage?.createdAt)
    : null

  const isSameDateAsPrevMessage = !!(
    prevMessageCreatedAt &&
    currentMessageCreatedAt &&
    isSameDay(prevMessageCreatedAt, currentMessageCreatedAt)
  )
  const isSameMinuteAsPrevMessage = !!(
    prevMessageCreatedAt &&
    currentMessageCreatedAt &&
    isSameMinute(prevMessageCreatedAt, currentMessageCreatedAt)
  )

  const isSameMinuteAsNextMessage = !!(
    nextMessageCreatedAt &&
    currentMessageCreatedAt &&
    isSameMinute(nextMessageCreatedAt, currentMessageCreatedAt)
  )

  const isFirstMessageOfDate =
    !!currentMessage.createdAt && (!prevMessage || !isSameDateAsPrevMessage)

  return {
    isSameMinuteAsPrevMessage,
    isSameMinuteAsNextMessage,
    isFirstMessageOfDate,
  }
}

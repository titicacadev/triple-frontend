import { isSameDay, isSameMinute } from 'date-fns'

import {
  BubbleType,
  BubbleTypeArray,
  CompositeBubbleType,
  CompositeBubbleTypeArray,
} from '../bubble/bubble-ui'
import { UserInterface } from '../types'

import { MessageBase } from './type'

export function isBubbleType(type: string): type is BubbleType {
  return BubbleTypeArray.includes(type as BubbleType)
}

export function isCompositeBubbleType(
  type: string,
): type is CompositeBubbleType {
  return CompositeBubbleTypeArray.includes(type as CompositeBubbleType)
}

export function compareSender<
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

export function compareDate<
  Message extends MessageBase<User>,
  User extends UserInterface,
>(
  prevMessage: Message | null,
  currentMessage: Message,
  nextMessage: Message | null,
) {
  /** createdAt이 없는 경우는 pending, failed 메세지임을 가정합니다. */
  const prevMessageCreatedAt = prevMessage
    ? prevMessage.createdAt
      ? new Date(prevMessage?.createdAt)
      : new Date()
    : null

  const currentMessageCreatedAt = currentMessage.createdAt
    ? new Date(currentMessage.createdAt)
    : new Date()

  const nextMessageCreatedAt = nextMessage
    ? nextMessage.createdAt
      ? new Date(nextMessage?.createdAt)
      : new Date()
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

  const isFirstMessageOfDate = !prevMessage || !isSameDateAsPrevMessage

  return {
    isSameMinuteAsPrevMessage,
    isSameMinuteAsNextMessage,
    isFirstMessageOfDate,
  }
}

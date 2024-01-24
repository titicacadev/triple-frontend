import { ComponentType } from 'react'
import { CSSProp } from 'styled-components'
import { isSameDay, isSameMinute } from 'date-fns'

import BubbleContainer from './bubble-container/bubble-container'
import BubbleUI, {
  BubbleType,
  BubbleTypeArray,
  BubbleUIProps,
  ImageBubbleUIProp,
  ProductBubbleUIProp,
  RichBubbleUIProp,
  TextBubbleUIProp,
} from './bubble/bubble-ui'
import { UserInterface } from './types'
import AlteredBubble from './bubble/altered'
import { ALTERNATIVE_TEXT_MESSAGE } from './bubble/constants'

interface MessageBase<User extends UserInterface> {
  id: string | number
  sender: User
  createdAt?: string
  blinded?: boolean
  deleted?: boolean
  thanks?: { count: number; haveMine: boolean }
}

type MessageInterface<
  Message extends MessageBase<User>,
  User extends UserInterface,
> = Message &
  (
    | TextBubbleUIProp
    | ImageBubbleUIProp
    | RichBubbleUIProp
    | ProductBubbleUIProp
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { type: string; value?: any }
  )

interface MessagesProp<
  Message extends MessageBase<User>,
  User extends UserInterface,
> {
  messages: MessageInterface<Message, User>[]
  pendingMessages: MessageInterface<Message, User>[]
  failedMessages: MessageInterface<Message, User>[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customBubble?: { [key: string]: ComponentType<any> }
  me: UserInterface
  onRetry?: (message: MessageInterface<Message, User>) => void
  onRetryCancel?: (message: MessageInterface<Message, User>) => void
  onThanksClick?: (message: MessageInterface<Message, User>) => void
  calculateUnreadCount?: (
    message: MessageInterface<Message, User>,
  ) => number | null
  bubbleStyle?: {
    received?: { css?: CSSProp; alteredTextColor?: string }
    sent?: { css?: CSSProp; alteredTextColor?: string }
  }
  hasDateDivider?: boolean
}

export default function Messages<
  Message extends MessageBase<User>,
  User extends UserInterface,
>({
  messages,
  pendingMessages,
  failedMessages,
  me,
  onRetry,
  onRetryCancel,
  onThanksClick,
  calculateUnreadCount,
  customBubble,
  bubbleStyle,
  hasDateDivider,
  ...bubbleProps
}: MessagesProp<Message, User> &
  Omit<
    BubbleUIProps,
    | 'id'
    | 'my'
    | 'blinded'
    | 'deleted'
    | 'unfriended'
    | 'type'
    | 'value'
    | 'css'
  >) {
  function getBubble({
    message,
    my,
  }: {
    message: MessageInterface<Message, User>
    my: boolean
  }) {
    const { id, sender, type, value, blinded, deleted, ...rest } = message

    const CustomBubble = customBubble?.[type]
    if (CustomBubble) {
      if (blinded || deleted || sender.unfriended) {
        return (
          <AlteredBubble
            key={id}
            id={id.toString()}
            my={my}
            alternativeText={
              sender.unfriended
                ? ALTERNATIVE_TEXT_MESSAGE.unfriended
                : blinded
                ? ALTERNATIVE_TEXT_MESSAGE.blinded
                : ALTERNATIVE_TEXT_MESSAGE.deleted
            }
            textColor={
              my
                ? bubbleStyle?.sent?.alteredTextColor
                : bubbleStyle?.received?.alteredTextColor
            }
          />
        )
      }
      return <CustomBubble {...message} />
    }

    if (!isBubbleType(type)) {
      throw new Error(`${type}에 해당하는 Bubble이 존재하지 않습니다.`)
    }

    return (
      <BubbleUI
        key={id}
        id={id.toString()}
        my={my}
        blinded={blinded}
        deleted={deleted}
        unfriended={sender.unfriended}
        type={type}
        value={value}
        alteredTextColor={
          my
            ? bubbleStyle?.sent?.alteredTextColor
            : bubbleStyle?.received?.alteredTextColor
        }
        css={my ? bubbleStyle?.sent?.css : bubbleStyle?.received?.css}
        {...rest}
        {...bubbleProps}
      />
    )
  }

  function renderMessages({
    listType,
    messages,
    lastMessageOfPrevList,
  }: {
    listType: 'normal' | 'failed' | 'pending'
    messages: MessageInterface<Message, User>[]
    lastMessageOfPrevList: MessageInterface<Message, User> | null
  }) {
    return messages.map((message, index) => {
      const { id, sender, createdAt, type, thanks } = message
      const my = sender.id === me.id

      const prevMessage =
        index === 0 ? lastMessageOfPrevList : messages[index - 1]
      const nextMessage = messages[index + 1] || null

      const { isSameSenderAsPrevMessage } = isSameSender(
        prevMessage,
        message,
        nextMessage,
      )
      const { isFirstMessageOfDate, isSameMinuteAsNextMessage } = isSameDate(
        prevMessage,
        message,
        nextMessage,
      )

      const showTimeInfo =
        listType === 'normal' &&
        isSameSenderAsPrevMessage &&
        !isSameMinuteAsNextMessage
      // && (isSameSenderAsNextMessage ? nextMessage?.type !== 'product' : true)

      return (
        <BubbleContainer
          key={id}
          id={id.toString()}
          my={my}
          unreadCount={
            calculateUnreadCount ? calculateUnreadCount(message) : null
          }
          createdAt={createdAt}
          user={{
            photo: sender.profile.photo,
            name: sender.profile.name,
            userId: sender.id,
            unregistered: sender.unregistered,
          }}
          showInfo={type !== 'product'}
          showProfile={isFirstMessageOfDate || !isSameSenderAsPrevMessage}
          // showDateInfo={!hasDateDivider}
          showTimeInfo={showTimeInfo}
          {...(listType === 'failed' && {
            onRetry: () => {
              onRetry?.(message)
            },
            onRetryCancel: () => {
              onRetryCancel?.(message)
            },
          })}
          thanks={thanks}
          onThanksClick={
            thanks && onThanksClick ? () => onThanksClick(message) : undefined
          }
        >
          {getBubble({ message, my })}
        </BubbleContainer>
      )
    })
  }

  return (
    <>
      <div id="messages_list">
        {renderMessages({
          listType: 'normal',
          messages,
          lastMessageOfPrevList: null,
        })}
      </div>
      <div id="pending_messages_list">
        {renderMessages({
          listType: 'pending',
          messages: pendingMessages,
          lastMessageOfPrevList: messages[messages.length - 1],
        })}
      </div>
      <div id="failed_messages_list">
        {renderMessages({
          listType: 'failed',
          messages: failedMessages,
          lastMessageOfPrevList:
            pendingMessages.length > 0
              ? pendingMessages[pendingMessages.length - 1]
              : messages[messages.length - 1],
        })}
      </div>
    </>
  )
}

function isBubbleType(type: string): type is BubbleType {
  return BubbleTypeArray.includes(type as BubbleType)
}

function isSameSender<
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

function isSameDate<
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

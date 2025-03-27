import { ComponentType, Fragment } from 'react'
import { CSSProp } from 'styled-components'
import { InView } from 'react-intersection-observer'

import BubbleContainer, {
  BubbleContainerProp,
} from '../bubble-container/bubble-container'
import BubbleUI, { BubbleUIProps } from '../bubble/bubble-ui'
import { UserInterface } from '../types'
import AlteredBubble from '../bubble/altered'
import { ALTERNATIVE_TEXT_MESSAGE } from '../bubble/constants'

import { MessageBase, MessageInterface } from './type'
import { isBubbleType, compareSender, compareDate } from './utils'
import { DateDivider } from './date-divider'

interface MessagesProp<
  Message extends MessageBase<User>,
  User extends UserInterface,
> extends Pick<BubbleContainerProp, 'bubbleInfoStyle'> {
  messages: MessageInterface<Message, User>[]
  pendingMessages: MessageInterface<Message, User>[]
  failedMessages: MessageInterface<Message, User>[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customBubble?: { [key: string]: ComponentType<any> }
  me: UserInterface
  onRetry?: (message: MessageInterface<Message, User>) => void
  onRetryCancel?: (message: MessageInterface<Message, User>) => void
  onThanksClick?: (message: MessageInterface<Message, User>) => void
  onReplyClick?: (message: MessageInterface<Message, User>) => void
  onMessageIntersecting?: (
    entry: IntersectionObserverEntry,
    id: MessageInterface<Message, User>['id'],
    my: boolean,
  ) => void
  calculateUnreadCount?: (
    message: MessageInterface<Message, User>,
  ) => number | null
  bubbleStyle?: {
    borderRadius?: number
    arrowRadius?: number
    received?: {
      css?: CSSProp
      alteredTextColor?: string
    }
    sent?: { css?: CSSProp; alteredTextColor?: string }
  }
  spacing?: {
    message?: number
    messageGroup?: number
    bubbleInfo?: number
    failureHandler?: number
    dateDivider?: number
  }
  hasDateDivider?: boolean
  messageRefCallback?: (id: MessageInterface<Message, User>['id']) => void
  fullTextViewAvailable?: boolean
  onOpenMenu?: (message: MessageInterface<Message, User>) => void
  onParentMessageClick?: (id: MessageInterface<Message, User>['id']) => void
  onUserClick?: (userId: string, unregistered: boolean) => void
  showProfilePhoto?: boolean
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
  onReplyClick,
  onMessageIntersecting,
  calculateUnreadCount,
  customBubble,
  bubbleStyle,
  hasDateDivider = true,
  hasArrow,
  messageRefCallback,
  fullTextViewAvailable,
  onOpenMenu,
  onParentMessageClick,
  onUserClick,
  bubbleInfoStyle,
  spacing,
  showProfilePhoto = true,
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
    | 'onOpenMenu'
    | 'css'
  >) {
  function getBubble({
    message,
    my,
    hasArrow = true,
  }: {
    message: MessageInterface<Message, User>
    my: boolean
    hasArrow?: boolean
  }) {
    const { id, sender, type, value, blinded, deleted, createdAt, ...rest } =
      message

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
            hasArrow={hasArrow}
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
        created={!!createdAt}
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
        hasArrow={hasArrow}
        onOpenMenu={() => onOpenMenu?.(message)}
        onParentMessageClick={onParentMessageClick}
        fullTextViewAvailable={fullTextViewAvailable}
        css={my ? bubbleStyle?.sent?.css : bubbleStyle?.received?.css}
        arrowRadius={bubbleStyle?.arrowRadius}
        borderRadius={bubbleStyle?.borderRadius}
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
      const nextMessage =
        index < messages.length - 1 ? messages[index + 1] : null

      const { isSameSenderAsPrevMessage, isSameSenderAsNextMessage } =
        compareSender(prevMessage, message, nextMessage)

      const { isFirstMessageOfDate, isSameMinuteAsNextMessage } = compareDate(
        prevMessage,
        message,
        nextMessage,
      )

      const showTimeInfo =
        !isSameSenderAsNextMessage ||
        !isSameMinuteAsNextMessage ||
        !nextMessage?.createdAt ||
        nextMessage?.type === 'product'

      const showProfile = isFirstMessageOfDate || !isSameSenderAsPrevMessage
      const isFirstPendingOrFailedMessageOfDate =
        listType !== 'normal' && isFirstMessageOfDate

      const IntersectionObserver = onMessageIntersecting ? InView : Fragment

      return (
        <Fragment key={id}>
          {hasDateDivider && isFirstMessageOfDate ? (
            <DateDivider
              date={
                isFirstPendingOrFailedMessageOfDate || !message.createdAt
                  ? new Date()
                  : new Date(message.createdAt)
              }
              css={bubbleInfoStyle?.dateDivider?.css}
            />
          ) : null}

          <IntersectionObserver
            onChange={
              onMessageIntersecting
                ? (_inView, entry) => onMessageIntersecting(entry, id, my)
                : undefined
            }
          >
            <BubbleContainer
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
              showProfile={showProfile}
              showDateInfo={!hasDateDivider}
              showTimeInfo={listType === 'normal' && showTimeInfo}
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
                thanks && onThanksClick
                  ? () => onThanksClick(message)
                  : undefined
              }
              onReplyClick={
                onReplyClick ? () => onReplyClick(message) : undefined
              }
              messageRefCallback={messageRefCallback}
              css={{
                marginTop: isFirstMessageOfDate
                  ? spacing?.dateDivider || 20
                  : showProfile
                    ? spacing?.messageGroup || 16
                    : spacing?.message || 5,
              }}
              bubbleInfoGap={spacing?.bubbleInfo || 4}
              failureHandlerGap={spacing?.failureHandler || 6}
              onUserClick={onUserClick}
              bubbleInfoStyle={bubbleInfoStyle}
              showProfilePhoto={showProfilePhoto}
            >
              {getBubble({ message, my, hasArrow: showProfile })}
            </BubbleContainer>
          </IntersectionObserver>
        </Fragment>
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

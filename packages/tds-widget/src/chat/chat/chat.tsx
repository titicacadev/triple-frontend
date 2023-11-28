import { IncomingMessage } from 'http'

import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { useUserAgent } from '@titicaca/triple-web'
import { closeKeyboard } from '@titicaca/triple-web-to-native-interfaces'
import { Container } from '@titicaca/tds-ui'

import {
  HasUnreadOfRoomInterface,
  ImagePayload,
  MessageInterface,
  PostMessageType,
  ReactionType,
  RoomInterface,
  RoomType,
  TextPayload,
  UpdateChatData,
  UserInterface,
  UserType,
} from '../types'
import ChatBubble from '../chat-bubble'
import { HiddenElement } from '../chat-bubble/elements'
import { ChatBubbleStyle } from '../types/ui'

import { ChatActions, ChatReducer, initialChatState } from './reducer'
import { useChat } from './chat-context'
import { useChatMessage } from './use-chat-message'
import { getChatListHeight, useScrollContext } from './scroll-context'

export const CHAT_CONTAINER_ID = 'chat-inner-container'

export interface ChatProps {
  displayTarget: UserType
  me: UserInterface
  /**
   * 초기 메시지들
   */
  messages?: MessageInterface[]
  /**
   * 보내기 전 메시지들
   */
  beforeSentMessages?: MessageInterface[]
  postMessage?: PostMessageType
  getMessages: (option: {
    roomId: string
    backward?: boolean
    lastMessageId: number | string | null
    req?: IncomingMessage
  }) => Promise<MessageInterface[]>
  getUnreadRoom?: (option: {
    roomId: string
    lastSeenMessageId: number
  }) => Promise<HasUnreadOfRoomInterface>
  room: RoomInterface
  notifyNewMessage?: (lastMessage: MessageInterface) => void
  showFailToast?: (message: string) => void
  onRetryButtonClick?: () => void
  onRetryCancelButtonClick?: () => void
  addReactions?: (
    messageId: number,
    reaction: ReactionType,
  ) => Promise<{ success: boolean }>
  removeReactions?: (
    messageId: number,
    reaction: ReactionType,
  ) => Promise<{ success: boolean }>
  updateChatData?: UpdateChatData
  disableUnreadCount?: boolean
  blindedText?: string
  bubbleStyle?: ChatBubbleStyle
}

/**
 * ChatBubble을 map으로 리스팅하고 있는 컴포넌트
 *
 * ChatContainer로 감싸서 함께 사용해야 합니다.
 */
export const Chat = ({
  displayTarget,
  me,
  room,
  messages: initMessages,
  beforeSentMessages = [],
  postMessage,
  getMessages,
  getUnreadRoom,
  notifyNewMessage,
  showFailToast,
  onRetryButtonClick,
  onRetryCancelButtonClick,
  addReactions,
  removeReactions,
  updateChatData,
  disableUnreadCount = false,
  blindedText,
  bubbleStyle,
  ...props
}: ChatProps) => {
  const { chatRoomRef, bottomRef, setScrollY, scrollToBottom } =
    useScrollContext()

  const { setPostMessage } = useChat()
  const [
    {
      messages,
      failedMessages,
      hasPrevMessage,
      otherUnreadInfo,
      lastMessageId,
      firstMessageId,
    },
    dispatch,
  ] = useReducer(ChatReducer, initialChatState)

  const isScrollReady = useRef(false)

  const { os } = useUserAgent()
  const isIos = useMemo(() => os.name === 'iOS', [os.name])
  const updateUnread = useCallback(async () => {
    if (!lastMessageId) {
      return
    }

    const unreadRoomResult = await getUnreadRoom?.({
      roomId: room.id,
      lastSeenMessageId: lastMessageId,
    })
    const { hasUnread = false, others = [] } = unreadRoomResult || {}

    const otherUnreadInfo = others.map(({ memberId, lastSeenMessageId }) => ({
      memberId,
      lastSeenMessageId: Number(lastSeenMessageId),
    }))
    dispatch({
      action: ChatActions.UPDATE,
      otherUnreadInfo,
    })

    return hasUnread
  }, [lastMessageId, getUnreadRoom, room.id])

  useChatMessage({
    roomId: room.id,
    userMeId: me.id,
    notifyNewMessage,
    dispatch,
    updateChatData,
  })

  useEffect(() => {
    const chatListDiv = chatRoomRef.current
    const hideKeyboard = () => closeKeyboard()
    if (chatListDiv && isIos) {
      chatListDiv.addEventListener('touchmove', hideKeyboard)
      return () => {
        chatListDiv.removeEventListener('touchmove', hideKeyboard)
      }
    }
  }, [isIos])

  useEffect(() => {
    ;(async function () {
      if (!room.id) {
        return
      }

      if (!initMessages) {
        const result = await getMessages({
          roomId: room.id,
          backward: true,
          lastMessageId: Number(room.lastMessageId) + 1,
        })

        result &&
          dispatch({
            action: ChatActions.INIT,
            messages: result,
            lastMessageId: room.lastMessageId,
          })
      } else {
        initMessages.length > 0 &&
          dispatch({
            action: ChatActions.INIT,
            messages: initMessages,
            lastMessageId: room.lastMessageId,
          })
      }
    })()
  }, [room, initMessages]) // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchPastMessages(): Promise<MessageInterface[]> {
    if (messages.length) {
      return getMessages({
        roomId: room.id,
        lastMessageId: firstMessageId,
        backward: true,
      })
    } else {
      return []
    }
  }

  const postMessageAction = async (
    payload: TextPayload | ImagePayload,
    retry = false,
  ): Promise<boolean> => {
    const result = await postMessage?.(payload)
    const { success, newMessages } = result || {
      success: false,
      newMessages: [],
    }

    if (success) {
      dispatch({
        action: ChatActions.POST,
        messages: newMessages,
      })

      const lastMessage = newMessages[newMessages.length - 1]
      notifyNewMessage?.({ ...lastMessage })
    } else if (!retry) {
      dispatch({
        action: ChatActions.FAILED_TO_POST,
        message: {
          id: new Date().getTime(),
          roomId: room.id,
          senderId: me.id,
          payload,
          displayTarget: 'all',
          sender: me,
        },
      })

      showFailToast?.('메시지 발송에 실패했습니다.')
    }

    return success
  }

  const handleChangeLastMessageId = async () => {
    !disableUnreadCount && (await updateUnread())
    scrollToBottom()

    if (!isScrollReady.current) {
      isScrollReady.current = true
    }
  }

  useEffect(() => {
    if (lastMessageId) {
      void handleChangeLastMessageId()
    }
  }, [lastMessageId])

  useEffect(() => {
    postMessage && setPostMessage?.(() => postMessageAction)
  }, [postMessage, setPostMessage]) // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeScroll = async ({
    isIntersecting,
  }: IntersectionObserverEntry) => {
    if (isIntersecting) {
      const prevScrollY = getChatListHeight()

      if (isScrollReady.current && hasPrevMessage) {
        const pastMessages = await fetchPastMessages()

        dispatch({
          action: ChatActions.PAST,
          messages: pastMessages,
        })
        setScrollY(prevScrollY)
      }
    }
  }

  function removeFromFailedMessages(message: MessageInterface) {
    dispatch({
      action: ChatActions.REMOVE_FROM_FAILED,
      message,
    })
  }

  function onRetry(message: MessageInterface) {
    removeFromFailedMessages(message)
    onRetryButtonClick?.()
  }

  function onRetryCancel(message: MessageInterface) {
    removeFromFailedMessages(message)
    onRetryButtonClick?.()
  }

  async function onThanksClick(messageId: number, haveMyThanks: boolean) {
    if (!haveMyThanks && addReactions) {
      const { success } = await addReactions(messageId, 'thanks')
      const message = messages.find((message) => message.id === messageId)
      if (success && message) {
        dispatch({
          action: ChatActions.UPDATE_MESSAGE,
          message: {
            ...message,
            reactions: {
              thanks: {
                count: (message.reactions?.thanks?.count || 0) + 1,
                haveMine: true,
              },
            },
          },
        })
      }
    }
    if (haveMyThanks && removeReactions) {
      const { success } = await removeReactions(messageId, 'thanks')
      const message = messages.find((message) => message.id === messageId)
      if (success && message) {
        const thanksCount = message.reactions?.thanks?.count
        dispatch({
          action: ChatActions.UPDATE_MESSAGE,
          message: {
            ...message,
            reactions: {
              thanks: {
                count: thanksCount ? thanksCount - 1 : 0,
                haveMine: false,
              },
            },
          },
        })
      }
    }
  }

  return (
    <>
      <IntersectionObserver onChange={onChangeScroll}>
        <HiddenElement />
      </IntersectionObserver>
      <Container ref={chatRoomRef} id={CHAT_CONTAINER_ID} {...props}>
        <ul id="messages_list">
          {[...messages, ...beforeSentMessages].map(
            (message: MessageInterface) => (
              <li key={message.id}>
                <ChatBubble
                  my={me.id === message.sender.id}
                  displayTarget={displayTarget}
                  message={message}
                  postMessageAction={
                    postMessage ? postMessageAction : undefined
                  }
                  otherReadInfo={otherUnreadInfo}
                  onRetryButtonClick={onRetry}
                  onRetryCancelButtonClick={onRetryCancel}
                  disableUnreadCount={disableUnreadCount}
                  blindedText={blindedText}
                  onThanksClick={
                    room.type === RoomType.EVENT ? onThanksClick : undefined
                  }
                  bubbleStyle={bubbleStyle}
                />
              </li>
            ),
          )}
        </ul>
        <ul id="failed_messages_list">
          {failedMessages.map((message: MessageInterface) => (
            <li key={message.id}>
              <ChatBubble
                my
                displayTarget={displayTarget}
                message={message}
                postMessageAction={postMessage ? postMessageAction : undefined}
                otherReadInfo={otherUnreadInfo}
                onRetryButtonClick={onRetry}
                onRetryCancelButtonClick={onRetryCancel}
                disableUnreadCount={disableUnreadCount}
                blindedText={blindedText}
                onThanksClick={
                  room.type === RoomType.EVENT ? onThanksClick : undefined
                }
                bubbleStyle={bubbleStyle}
              />
            </li>
          ))}
        </ul>
      </Container>
      <HiddenElement ref={bottomRef} />
    </>
  )
}

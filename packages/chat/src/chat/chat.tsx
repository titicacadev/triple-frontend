import { IncomingMessage } from 'http'

import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { closeKeyboard } from '@titicaca/triple-web-to-native-interfaces'
import { Container } from '@titicaca/core-elements'

import {
  HasUnreadOfRoomInterface,
  ImagePayload,
  MessageInterface,
  PostMessageType,
  RoomInterface,
  TextPayload,
  UserInfoInterface,
  UserType,
} from '../types'
import ChatBubble from '../chat-bubble'
import { HiddenElement } from '../chat-bubble/elements'

import { ChatActions, ChatReducer, initialChatState } from './reducer'
import { useChat } from './chat-context'
import { useChatMessage } from './use-chat-message'
import { getChatListHeight, useScrollContext } from './scroll-context'

const MINIMUM_INTERSECTING_TIME = 3000
export const CHAT_CONTAINER_ID = 'chat-inner-container'

export interface ChatProps {
  pusherKey: string
  displayTarget: UserType
  /**
   * me(sender), others(receiver)에 대한 기본 정보
   */
  userInfo: UserInfoInterface
  /**
   * 초기 메시지들
   */
  messages?: MessageInterface[]
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
}

/**
 * ChatBubble을 map으로 리스팅하고 있는 컴포넌트
 *
 * ChatContainer로 감싸서 함께 사용해야 합니다.
 */
export const Chat = ({
  pusherKey,
  displayTarget,
  userInfo,
  room,
  messages: initMessages,

  postMessage,
  getMessages,
  getUnreadRoom,
  notifyNewMessage,
  showFailToast,
  ...props
}: ChatProps) => {
  const { chatRoomRef, bottomRef, setScrollY, scrollToBottom } =
    useScrollContext()

  const { setPostMessage } = useChat()
  const [
    {
      messages,
      hasPrevMessage,
      otherUnreadInfo,
      lastMessageId,
      firstMessageId,
    },
    dispatch,
  ] = useReducer(ChatReducer, initialChatState)

  const { os } = useUserAgentContext()
  const isIos = useMemo(() => os.name === 'iOS', [os.name])
  const updateUnread = useCallback(async () => {
    if (!lastMessageId) {
      return
    }

    const unreadRoomResult = await getUnreadRoom?.({
      roomId: room.id,
      lastSeenMessageId: Number(lastMessageId),
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
    pusherKey,
    roomId: room.id,
    notifyNewMessage,
    dispatch,
    updateUnread,
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
            lastMessageId: Number(room.lastMessageId),
          })
      } else {
        initMessages.length > 0 &&
          dispatch({
            action: ChatActions.INIT,
            messages: initMessages,
            lastMessageId: Number(room.lastMessageId),
          })
      }

      await updateUnread()

      window.setTimeout(() => {
        scrollToBottom()
      }, 0)
    })()
  }, [room, initMessages]) // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchPastMessages(): Promise<MessageInterface[]> {
    if (messages.length) {
      return getMessages({
        roomId: room.id,
        lastMessageId: Number(firstMessageId),
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
        payload,
      })

      const lastMessage = newMessages[newMessages.length - 1]
      notifyNewMessage?.({ ...lastMessage })
    } else if (!retry) {
      dispatch({
        action: ChatActions.FAILED_TO_POST,
        message: {
          id: NaN,
          roomId: room.id,
          senderId: userInfo.me.id,
          payload,
          displayTarget: 'all',
        },
      })

      showFailToast?.('메시지 발송에 실패했습니다.')
    }

    scrollToBottom()

    return success
  }

  useEffect(() => {
    postMessage && setPostMessage?.(() => postMessageAction)
  }, [postMessage, setPostMessage]) // eslint-disable-line react-hooks/exhaustive-deps

  /** 채팅창 메시지(lastMessageId)가 업데이트 될 경우 채팅창 스크롤을 맨 아래로 이동 */
  const chatRoomResizeObserver = useMemo(
    () => new ResizeObserver(scrollToBottom),
    [],
  )

  useEffect(() => {
    if (!chatRoomRef?.current) {
      return
    }

    chatRoomResizeObserver.observe(chatRoomRef.current)

    return () => {
      chatRoomResizeObserver.disconnect()
    }
  }, [lastMessageId, chatRoomResizeObserver])

  const onChangeScroll = async ({
    isIntersecting,
    time,
  }: IntersectionObserverEntry) => {
    const prevScrollY = getChatListHeight()
    if (isIntersecting && time >= MINIMUM_INTERSECTING_TIME && hasPrevMessage) {
      const pastMessages = await fetchPastMessages()

      await dispatch({
        action: ChatActions.PAST,
        messages: pastMessages,
      })
      setScrollY(prevScrollY)
    }
  }

  return (
    <>
      <IntersectionObserver onChange={onChangeScroll}>
        <HiddenElement />
      </IntersectionObserver>
      <Container ref={chatRoomRef} id={CHAT_CONTAINER_ID} {...props}>
        <ul>
          {messages.map((message: MessageInterface, index) => (
            <li key={index}>
              {userInfo ? (
                <ChatBubble
                  displayTarget={displayTarget}
                  message={message}
                  userInfo={userInfo}
                  postMessageAction={
                    postMessage ? postMessageAction : undefined
                  }
                  otherReadInfo={otherUnreadInfo}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
      <HiddenElement ref={bottomRef} />
    </>
  )
}

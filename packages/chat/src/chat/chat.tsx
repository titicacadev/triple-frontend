import { IncomingMessage } from 'http'

import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
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
  UpdateChatData,
  UserInfoInterface,
  UserType,
} from '../types'
import ChatBubble from '../chat-bubble'
import { HiddenElement } from '../chat-bubble/elements'
import { ChatBubbleColor } from '../types/ui'

import { ChatActions, ChatReducer, initialChatState } from './reducer'
import { useChat } from './chat-context'
import { useChatMessage } from './use-chat-message'
import { getChatListHeight, useScrollContext } from './scroll-context'

export const CHAT_CONTAINER_ID = 'chat-inner-container'

export interface ChatProps {
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
  onRetryButtonClick?: () => void
  onRetryCancelButtonClick?: () => void

  updateChatData?: UpdateChatData
  disableUnreadCount?: boolean
  blindedText?: string
  bubbleColor?: ChatBubbleColor
}

/**
 * ChatBubble을 map으로 리스팅하고 있는 컴포넌트
 *
 * ChatContainer로 감싸서 함께 사용해야 합니다.
 */
export const Chat = ({
  displayTarget,
  userInfo,
  room,
  messages: initMessages,

  postMessage,
  getMessages,
  getUnreadRoom,
  notifyNewMessage,
  showFailToast,
  onRetryButtonClick,
  onRetryCancelButtonClick,
  updateChatData,
  disableUnreadCount = false,
  blindedText,
  bubbleColor,
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

  const isScrollReady = useRef(false)

  const { os } = useUserAgentContext()
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
    userMeId: userInfo.me.id,
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

        await dispatch({
          action: ChatActions.PAST,
          messages: pastMessages,
        })
        setScrollY(prevScrollY)
      }
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
                  onRetryButtonClick={onRetryButtonClick}
                  onRetryCancelButtonClick={onRetryCancelButtonClick}
                  disableUnreadCount={disableUnreadCount}
                  blindedText={blindedText}
                  bubbleColor={bubbleColor}
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

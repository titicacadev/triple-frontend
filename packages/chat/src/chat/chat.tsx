import { IncomingMessage } from 'http'

import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { closeKeyboard } from '@titicaca/triple-web-to-native-interfaces'
import { Container, CSSProps } from '@titicaca/core-elements'

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
import { Polling } from '../utils'

import { ChatActions, ChatReducer, initialChatState } from './reducer'
import { useChat } from './chat-context'

const FETCH_INTERVAL_SECS = 5
const MINIMUM_INTERSECTING_TIME = 3000

export interface ChatProps {
  displayTarget: UserType
  userInfo: UserInfoInterface
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

const Chat = ({
  displayTarget,
  userInfo,
  room,

  postMessage,
  getMessages,
  getUnreadRoom,
  notifyNewMessage,
  showFailToast,
  css,
}: ChatProps & CSSProps) => {
  const chatRoomRef = useRef<HTMLDivElement>(null)

  const { setPostMessage } = useChat()
  const [
    {
      messages,
      hasPrevMessage,
      scrollY,
      otherUnreadInfo,
      lastMessageId,
      firstMessageId,
    },
    dispatch,
  ] = useReducer(ChatReducer, initialChatState)

  const fetchJob = useMemo(() => new Polling(FETCH_INTERVAL_SECS * 1000), [])
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

    dispatch({
      action: ChatActions.UPDATE,
      otherUnreadInfo: others,
    })

    return hasUnread
  }, [lastMessageId, getUnreadRoom, room.id])

  const scrollDown = useCallback(() => {
    if (chatRoomRef.current && chatRoomRef.current.parentElement) {
      const height = chatRoomRef.current.getBoundingClientRect().height

      chatRoomRef.current.parentElement.scrollTo(0, height)
    }
  }, [])

  useEffect(() => {
    if (scrollY && chatRoomRef.current && chatRoomRef.current.parentElement) {
      chatRoomRef.current.parentElement.scrollTo(
        0,
        chatRoomRef.current.getBoundingClientRect().height - scrollY,
      )
    }
  }, [scrollY])

  useEffect(() => {
    const chatListDiv = chatRoomRef.current
    if (chatListDiv && isIos) {
      chatListDiv.addEventListener('touchmove', () => closeKeyboard())
      return () => {
        chatListDiv.removeEventListener('touchmove', () => closeKeyboard())
      }
    }
  }, [isIos])

  useEffect(() => {
    ;(async function () {
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

      await updateUnread()

      window.setTimeout(() => {
        scrollDown()
      }, 0)
    })()
  }, [room.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchJob.add('refreshChatRoom', () => pollingFetchJob())
    return () => fetchJob.remove('refreshChatRoom')
  }, [lastMessageId]) // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchNewMessages(): Promise<MessageInterface[]> {
    if (lastMessageId !== null && room.id) {
      return getMessages({
        roomId: room.id,
        lastMessageId,
      })
    } else {
      return []
    }
  }

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

  async function pollingFetchJob() {
    if (lastMessageId === null || !room.id || !getUnreadRoom) {
      return
    }
    const { hasUnread, others } = await getUnreadRoom({
      roomId: room.id,
      lastSeenMessageId: lastMessageId,
    })

    dispatch({
      action: ChatActions.UPDATE,
      otherUnreadInfo: others,
    })

    if (!hasUnread) {
      return
    }
    const newMessages = await fetchNewMessages()
    if (!newMessages?.length) {
      return
    }

    dispatch({
      action: ChatActions.NEW,
      messages: newMessages,
    })
    notifyNewMessage?.({ ...newMessages[notifyNewMessage.length - 1] })
    scrollDown()
  }

  const postMessageAction = async (
    payload: TextPayload | ImagePayload,
    retry = false,
  ): Promise<boolean> => {
    fetchJob.pause()
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

    scrollDown()

    await fetchJob.resume()

    return success
  }

  useEffect(() => {
    postMessage && setPostMessage?.(() => postMessageAction)
  }, [postMessage, setPostMessage]) // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeScroll = async ({
    isIntersecting,
    time,
  }: IntersectionObserverEntry) => {
    if (isIntersecting && time >= MINIMUM_INTERSECTING_TIME && hasPrevMessage) {
      const pastMessages = await fetchPastMessages()

      const prevScrollY = chatRoomRef.current
        ? chatRoomRef.current.getBoundingClientRect().height
        : 0

      await dispatch({
        action: ChatActions.PAST,
        messages: pastMessages,
        scrollY: prevScrollY,
      })
    }
  }

  return (
    <>
      <IntersectionObserver onChange={onChangeScroll}>
        <HiddenElement />
      </IntersectionObserver>
      <Container css={css} ref={chatRoomRef}>
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
    </>
  )
}

export default Chat

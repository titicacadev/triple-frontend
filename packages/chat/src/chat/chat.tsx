import { IncomingMessage } from 'http'

import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'

import {
  HasUnreadOfRoomInterface,
  MessageInterface,
  MetaDataInterface,
  UserInfoInterface,
  UserType,
} from '../types'
import ChatBubble from '../chat-bubble'
import { HiddenElement } from '../chat-bubble/elements'
import { Polling } from '../utils'

import { ChatActions, ChatReducer, initialChatState } from './reducer'
import { ChatContext, ChatContextValue } from './chat-context'

const FETCH_INTERVAL_SECS = 5
const MINIMUM_INTERSECTING_TIME = 3000

interface ChatProps extends ChatContextValue {
  fetchPastMessages: (firstMessageId?: number) => Promise<MessageInterface[]>
  displayTarget: UserType
  userInfo: UserInfoInterface
  postMessage?: () => Promise<boolean>
  getMessages: (option: {
    roomId: string
    backward?: boolean
    lastMessageId: number | string
    req?: IncomingMessage
  }) => Promise<MessageInterface[]>
  getUnreadRoom?: (option: {
    roomId: string
    lastSeenMessageId: number
  }) => Promise<HasUnreadOfRoomInterface>
  roomId: string
}

const defaultOnImageBubbleClick = (imageInfos: MetaDataInterface[]) => {
  window.open(imageInfos[0].originalUrl, '_blank')
}

const Chat = ({
  fetchPastMessages,
  displayTarget,
  userInfo,
  postMessage,
  getMessages,
  getUnreadRoom,
  roomId,

  textBubbleFontSize,
  textBubbleMaxWidthOffset,
  mediaUrlBase,
  cloudinaryName,
  onRichBubbleButtonBeforeRouting,
  onImageBubbleClick = defaultOnImageBubbleClick,
  onTextBubbleClick,
}: ChatProps) => {
  const chatRoomRef = useRef<HTMLDivElement>(null)

  const [
    { messages, hasPrevMessage, scrollY, otherUnreadInfo, lastMessageId },
    dispatch,
  ] = useReducer(ChatReducer, initialChatState)

  const fetchJob = useMemo(() => new Polling(FETCH_INTERVAL_SECS * 1000), [])

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
    fetchJob.run(() => pollingFetchJob())
    return () => {
      fetchJob.stop()
    }
  }, [lastMessageId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch({
      action: ChatActions.INIT,
      messages,
      lastMessageId: lastMessageId as number,
    })

    window.setTimeout(() => {
      scrollDown()
    }, 0)
  }, [messages, lastMessageId, scrollDown]) // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchNewMessages(): Promise<MessageInterface[]> {
    if (lastMessageId !== null && roomId) {
      return getMessages({
        roomId,
        lastMessageId,
      })
    } else {
      return []
    }
  }

  async function pollingFetchJob() {
    if (lastMessageId !== null && roomId && getUnreadRoom) {
      const { hasUnread, others } = await getUnreadRoom({
        roomId,
        lastSeenMessageId: lastMessageId,
      })

      dispatch({
        action: ChatActions.UPDATE,
        otherUnreadInfo: others,
      })

      if (hasUnread) {
        const newMessages = await fetchNewMessages()
        dispatch({
          action: ChatActions.NEW,
          messages: newMessages,
        })
        scrollDown()
      }
    }
  }

  return (
    <ChatContext.Provider
      value={{
        textBubbleFontSize,
        textBubbleMaxWidthOffset,
        mediaUrlBase,
        cloudinaryName,
        onRichBubbleButtonBeforeRouting,
        onImageBubbleClick,
        onTextBubbleClick,
      }}
    >
      <IntersectionObserver
        onChange={async ({ isIntersecting, time }) => {
          if (
            isIntersecting &&
            time >= MINIMUM_INTERSECTING_TIME &&
            hasPrevMessage
          ) {
            const pastMessages = await fetchPastMessages(messages[0].id)

            const prevScrollY = chatRoomRef.current
              ? chatRoomRef.current.getBoundingClientRect().height
              : 0

            await dispatch({
              action: ChatActions.PAST,
              messages: pastMessages,
              scrollY: prevScrollY,
            })
          }
        }}
      >
        <HiddenElement />
      </IntersectionObserver>
      <div ref={chatRoomRef}>
        <ul>
          {messages.map((message: MessageInterface, index) => (
            <li key={index}>
              {userInfo ? (
                <ChatBubble
                  displayTarget={displayTarget}
                  message={message}
                  userInfo={userInfo}
                  postMessage={postMessage}
                  otherReadInfo={otherUnreadInfo}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </ChatContext.Provider>
  )
}

export default Chat

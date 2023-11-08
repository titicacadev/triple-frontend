import { IncomingMessage } from 'http'

import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { closeKeyboard } from '@titicaca/triple-web-to-native-interfaces'
import { Container } from '@titicaca/core-elements'

import {
  HasUnreadOfRoomInterface,
  MessageInterface,
  PostMessageType,
  ReactionType,
  RoomInterface,
  RoomType,
  UpdateChatData,
  UserInterface,
  UserType,
} from '../types'
import BubbleContainer from '../bubble-container'
import { HiddenElement } from '../bubble-container/elements'
import { ChatBubbleStyle } from '../types/ui'
import BubbleUI from '../bubble/bubble-ui'
import { RichItemImages, RichItemText } from '../bubble/type'

import { ChatActions, ChatReducer, initialChatState } from './reducer'
import { useChat } from './chat-context'
import { useChatMessage } from './use-chat-message'
import { useScroll } from './scroll-context'

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
  const {
    chatContainerRef,
    bottomRef,
    setScrollY,
    scrollToBottom,
    getScrollContainerHeight,
  } = useScroll()

  const { setPostMessage } = useChat()
  const [
    {
      messages,
      failedMessages,
      hasPrevMessage,
      // otherUnreadInfo,
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
    userMeId: me.id,
    notifyNewMessage,
    dispatch,
    updateChatData,
  })

  useEffect(() => {
    const chatListDiv = chatContainerRef.current
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
    payload: RichItemText | RichItemImages,
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
      const prevScrollY = getScrollContainerHeight()

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
      <Container ref={chatContainerRef} id={CHAT_CONTAINER_ID} {...props}>
        <ul id="messages_list">
          {[...messages, ...beforeSentMessages].map(
            (message: MessageInterface) => {
              const my = message.senderId === me.id
              const senderInfo = my
                ? me
                : room.members.find((member) => member.id === message.senderId)
              const payload = (function getDisplayedPayload() {
                if (!message.displayTarget || message.displayTarget === 'all') {
                  return message.payload
                }
                if (message.displayTarget.includes(displayTarget)) {
                  return message.payload
                }
                return message.alternative ?? message.payload
              })()
              const bubbleProp = getBubbleProp({
                messageId: message.id.toString(),
                messagePayload: payload,
                my,
                blinded: !!message.blindedAt,
              })
              return (
                <BubbleContainer
                  key={message.id}
                  my={message.senderId === me.id}
                  createdAt={message.createdAt}
                  unreadCount={0}
                  profile={
                    senderInfo && {
                      thumbnailUrl: senderInfo.profile.thumbnail,
                      userId: senderInfo.id,
                      unregister: false, // TODO
                      name: senderInfo.profile.name,
                    }
                  }
                  onRetryButtonClick={onRetry}
                  onRetryCancelButtonClick={onRetryCancel}
                  disableUnreadCount={disableUnreadCount}
                  blindedText={blindedText}
                  onThanksClick={
                    room.type === RoomType.EVENT ? onThanksClick : undefined
                  }
                  bubbleStyle={bubbleStyle}
                  // disableUnreadCount={disableUnreadCount}
                  // unreadCount={}
                >
                  <BubbleUI {...bubbleProp} />
                </BubbleContainer>
              )
            },
          )}
        </ul>
        <ul id="failed_messages_list">
          {failedMessages.map((message: MessageInterface) => {
            const bubbleProp = getBubbleProp({
              messageId: message.id.toString(),
              messagePayload: message.payload,
              my: true,
              blinded: false,
            })

            return (
              <BubbleContainer
                key={message.id}
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
                unreadCount={null}
                onRetry={() => {
                  onRetry(message)
                }}
                onRetryCancel={() => onRetryCancel(message)}
              >
                <BubbleUI {...bubbleProp} />
              </BubbleContainer>
            )
          })}
        </ul>
      </Container>
      <HiddenElement ref={bottomRef} />
    </>
  )
}

function getBubbleProp({
  messageId,
  messagePayload,
  my,
  blinded,
}: {
  messageId: string
  messagePayload: MessageInterface['payload']
  my: boolean
  blinded: boolean
}): ComponentProps<typeof BubbleUI> {
  if (blinded) {
    return {
      type: 'blinded',
      id: messageId,
      my,
    }
  }
  switch (messagePayload.type) {
    case 'text':
      return {
        type: 'text',
        id: messageId,
        my,
        maxWidthOffset: 100,
        message: messagePayload.message,
      }
    case 'images':
      return {
        type: 'images',
        images: messagePayload.images,
      }
    case 'rich':
      return {
        type: 'rich',
        id: messageId,
        my,
        maxWidthOffset: 100,
        items: messagePayload.items,
        mediaUrlBase:
          process.env.NEXT_PUBLIC_MEDIA_URL_BASE ||
          'https://media.triple.guide',
        cloudinaryName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME || 'triple-cms',
      }
    case 'product':
      return {
        type: 'product',
        id: messageId,
        my,
        product: messagePayload.product,
      }
  }
}

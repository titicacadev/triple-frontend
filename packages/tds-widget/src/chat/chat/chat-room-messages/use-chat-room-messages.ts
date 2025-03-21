import { useCallback, useEffect, useRef } from 'react'

import {
  ChatMessageInterface,
  ChatRoomInterface,
  ChatUserInterface,
  CreatedChatRoomInterface,
  isCreatedChatRoom,
  ReactionType,
  UpdatedChatData,
  UserType,
} from '../../types'
import { useRoom } from '../room-context'
import { MessagesActions } from '../messages-reducer'

import { useScroll } from './use-scroll'
import { DEFAULT_MESSAGE_PROPERTIES } from './constants'
import {
  useChatApiService,
  useChatMessagesContext,
} from './chat-message-context'
import { ChatRoomMessageInterface } from './messages'

interface ChatMessagesProps<T = UserType> {
  defaultMessageProperties?: Partial<ChatMessageInterface<T>>
  createRoom?: () => Promise<CreatedChatRoomInterface | undefined>
}

export function useChatMessages<T = UserType>({
  defaultMessageProperties = DEFAULT_MESSAGE_PROPERTIES as Partial<
    ChatMessageInterface<T>
  >,
  createRoom,
}: ChatMessagesProps<T> = {}) {
  const { room, me, updateRoom } = useRoom<
    ChatRoomInterface,
    ChatUserInterface<T>
  >()

  const { setScrollY, getScrollContainerHeight, triggerScrollToBottom } =
    useScroll()

  const firstRenderForPrevScrollRef = useRef(true)
  const isWelcomeMessagePendingRef = useRef(false)

  const {
    messages,
    pendingMessages,
    failedMessages,
    hasPrevMessage,
    dispatch,
    initMessages,
    welcomeMessages,
  } = useChatMessagesContext<T>()
  const api = useChatApiService<T>()

  useEffect(() => {
    ;(async function () {
      await initMessages()

      if (welcomeMessages.length > 0) {
        welcomeMessages.forEach((welcomeMessage) => {
          dispatch({
            action: MessagesActions.PENDING,
            message: welcomeMessage as unknown as ChatMessageInterface<T>, // TODO: TF 내 Pending message 타입 수정 (펜딩 메시지는 id가 옵셔널 할 수 있음)
          })
        })
        isWelcomeMessagePendingRef.current = true
      }

      setScrollY(0)
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSendMessageAction({
    roomId,
    payload,
    sender,
    tempMessageId,
    skipPending = false,
    skipFailed = false,
    onError,
  }: {
    roomId: string
    payload: ChatMessageInterface<T>['payload']
    sender: ChatMessageInterface<T>['sender']
    tempMessageId?: number
    skipPending?: boolean
    skipFailed?: boolean
    onError?: () => void
  }) {
    const tempMessage: ChatMessageInterface<T> = {
      id: tempMessageId || new Date().getTime(),
      roomId,
      senderId: sender.id,
      sender,
      payload,
      ...defaultMessageProperties,
    }

    if (!skipPending) {
      dispatch({
        action: MessagesActions.PENDING,
        message: tempMessage,
      })
      triggerScrollToBottom()
    }

    try {
      const messagesFromResponse = (await api.sendMessage({
        roomId,
        payload,
        ...(sender && { sender }),
      })) || [{ roomId, payload }]

      const updatedMessage =
        messagesFromResponse[messagesFromResponse.length - 1]
      const success = !!updatedMessage.createdAt

      if (success) {
        removeUnsentMessages({ id: tempMessage.id })
        dispatch({
          action: MessagesActions.NEW,
          messages: [updatedMessage],
        })
        return { success }
      }

      throw new Error('Failed to send message')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (!skipFailed) {
        onMessageFailed(tempMessage, { onError })
      }
      return { success: false }
    }
  }

  async function handleSendWelcomeMessage({
    roomId,
    onError,
  }: {
    roomId: string
    onError?: () => void
  }) {
    const welcomeMessagesInPending = pendingMessages.filter(
      (message) => message.sender.id !== me.id,
    )

    let allSuccess = true
    for (const { id: tempId, payload, sender } of welcomeMessagesInPending) {
      const { success } = await handleSendMessageAction({
        roomId,
        tempMessageId: tempId,
        payload,
        sender,
        skipPending: true,
        skipFailed: true,
        onError,
      })

      if (!success) {
        allSuccess = false
      }
    }

    if (allSuccess) {
      isWelcomeMessagePendingRef.current = false
    }
  }

  const getOrCreateRoom = async () => {
    if (!isCreatedChatRoom(room) && createRoom) {
      const newRoom = await createRoom()

      if (newRoom) {
        updateRoom(newRoom)
        return newRoom
      }
    }
    return room
  }

  async function onSendMessage(
    payload: ChatMessageInterface<T>['payload'],
    { onError }: { onError?: () => void } = {},
  ) {
    /** roomId 생성 이전에 보낸 메세지는 pusher 이벤트로 받을 수 없기 때문에,
          roomId가 없는 경우에는 먼저 room을 생성하는 과정을 거칩니다.
      */
    const currentRoom = await getOrCreateRoom()
    const currentRoomId = 'id' in currentRoom ? currentRoom.id : ''

    if (!currentRoomId) {
      const tempMessage: ChatMessageInterface<T> = {
        id: new Date().getTime(),
        roomId: '',
        senderId: me.id,
        sender: me,
        payload,
        displayTarget: 'all',
      }
      onMessageFailed(tempMessage)
      return
    }

    /** 첫 렌더링 시에만 자동 메세지를 보내도록 합니다. */
    if (isWelcomeMessagePendingRef.current) {
      await handleSendWelcomeMessage({ roomId: currentRoomId, onError })
    }

    const { success } = await handleSendMessageAction({
      roomId: currentRoomId,
      sender: me,
      payload,
    })

    if (!success) {
      onError?.()
    }
  }

  const onPrevScroll = async ({
    isIntersecting,
  }: IntersectionObserverEntry) => {
    const scrollable =
      isCreatedChatRoom(room) &&
      isIntersecting &&
      !firstRenderForPrevScrollRef.current &&
      hasPrevMessage &&
      messages.length > 0

    if (scrollable) {
      const prevScrollY = getScrollContainerHeight()
      let pastMessages: ChatMessageInterface<T>[] = []

      try {
        pastMessages = await api.getMessages({
          roomId: room.id,
          lastMessageId: messages[0].id,
          backward: true,
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}

      dispatch({
        action: MessagesActions.PAST,
        messages: pastMessages,
      })
      setScrollY(prevScrollY)
    } else if (isIntersecting && firstRenderForPrevScrollRef.current) {
      firstRenderForPrevScrollRef.current = false
    }
  }

  function onMessageFailed(
    tempMessage: ChatMessageInterface<T>,
    { onError }: { onError?: () => void } = {},
  ) {
    onError?.()
    dispatch({
      action: MessagesActions.FAIL,
      message: tempMessage,
    })
  }

  function removeUnsentMessages(
    message: Pick<ChatRoomMessageInterface<T>, 'id'>,
  ) {
    dispatch({
      action: MessagesActions.REMOVE,
      message,
    })
  }

  function onRetry(
    message: ChatRoomMessageInterface<T>,
    {
      onComplete,
    }: {
      onComplete?: () => void
    } = {},
  ) {
    removeUnsentMessages(message)

    if (message.payload.type !== 'rich') {
      onSendMessage?.(message.payload)
      onComplete?.()
    }
  }

  function onRetryCancel(
    message: ChatRoomMessageInterface<T>,
    {
      onComplete,
    }: {
      onComplete?: () => void
    } = {},
  ) {
    removeUnsentMessages(message)
    onComplete?.()
  }

  const onSendMessageEvent = useCallback(
    (
      { message }: UpdatedChatData<T>,
      {
        onComplete,
      }: { onComplete?: (message: ChatMessageInterface<T>) => void } = {},
    ) => {
      if (message && message.payload) {
        /** 
            pendingMessage와 messages 간의 부드러운 UI 전환을 위해
            me의 메세지일 경우 handleSendMessageAction 함수 내에서 dispatch합니다.
          */
        if (message.sender.id !== me.id) {
          dispatch({
            action: MessagesActions.NEW,
            messages: [message],
          })
        }
        onComplete?.(message)
        triggerScrollToBottom()
      }
    },
    [dispatch, me.id],
  )

  /**
   * 리액션이 있을때만 사용합니다.
   */
  async function addReactionToMessage(
    messageId: number,
    reactionType: ReactionType,
    onSuccess?: () => void,
  ) {
    try {
      await api.addReaction({ messageId, reactionType })
      onSuccess?.()
      return { success: true }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { success: false }
    }
  }

  async function removeReactionToMessage(
    messageId: number,
    reactionType: ReactionType,
    onSuccess?: () => void,
  ) {
    try {
      await api.removeReaction({ messageId, reactionType })
      onSuccess?.()
      return { success: true }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { success: false }
    }
  }

  async function onThanksClick(
    message: ChatRoomMessageInterface<T>,
    {
      onAddSuccess,
      onRemoveSuccess,
    }: {
      onAddSuccess?: () => void
      onRemoveSuccess?: () => void
    },
  ) {
    const haveMyThanks = !!message.reactions?.thanks?.haveMine

    if (!haveMyThanks) {
      const { success } = await addReactionToMessage(
        message.id,
        'thanks',
        onAddSuccess,
      )
      if (success) {
        updateMessageReaction(message.id)
      }
    } else {
      const { success } = await removeReactionToMessage(
        message.id,
        'thanks',
        onRemoveSuccess,
      )
      if (success) {
        updateMessageReaction(message.id, false)
      }
    }
  }

  function updateMessageReaction(
    messageId: ChatMessageInterface<T>['id'],
    add: boolean = true,
  ) {
    const updatedMessage = messages.find((msg) => msg.id === messageId)

    if (updatedMessage) {
      dispatch({
        action: MessagesActions.UPDATE,
        message: {
          ...updatedMessage,
          reactions: {
            thanks: {
              count: Math.max(
                (updatedMessage.reactions?.thanks?.count || 0) + (add ? 1 : -1),
                0,
              ),
              haveMine: add,
            },
          },
        },
      })
    }
  }

  return {
    messages,
    pendingMessages,
    failedMessages,
    onSendMessage,
    onPrevScroll,
    onRetry,
    onRetryCancel,
    onThanksClick,
    onSendMessageEvent,
  }
}

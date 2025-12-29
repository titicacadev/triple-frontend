import { useCallback, useEffect, useRef } from 'react'
import DOMPurify from 'dompurify'

import {
  ChatMessageData,
  ChatMessageInterface,
  ChatMessagePayloadType,
  ChatRoomDetailInterface,
  ChatRoomInterface,
  ChatRoomMemberInterface,
  ChatRoomUser,
  isChatRoomMember,
  isCreatedChatRoom,
  ReactionType,
  RoomType,
  UserType,
} from '../../types'
import { useRoom } from '../room-context'
import { MessagesActions, UnsentMessage } from '../messages-reducer'
import { getUserIdentifier } from '../../utils'

import { useScroll } from './use-scroll'
import { DEFAULT_MESSAGE_PROPERTIES } from './constants'
import {
  useChatApiService,
  useChatMessagesContext,
} from './chat-message-context'
import { ChatRoomMessageInterface } from './messages'

interface ChatMessagesProps<
  T = RoomType,
  U = UserType,
  V extends ChatRoomDetailInterface<T, U> = ChatRoomDetailInterface<T, U>,
> {
  scrollToBottomOnNewMessage?: boolean
  defaultMessageProperties?: Partial<ChatMessageInterface<U>>
  createRoom?: () => Promise<V | undefined>
}

export function useChatMessages<
  T = RoomType,
  U = UserType,
  V extends ChatRoomDetailInterface<T, U> = ChatRoomDetailInterface<T, U>,
>(
  {
    scrollToBottomOnNewMessage = true,
    defaultMessageProperties = DEFAULT_MESSAGE_PROPERTIES as Partial<
      ChatMessageInterface<U>
    >,
    createRoom,
  }: ChatMessagesProps<T, U, V> = {
    scrollToBottomOnNewMessage: true,
    defaultMessageProperties: DEFAULT_MESSAGE_PROPERTIES as Partial<
      ChatMessageInterface<U>
    >,
  },
) {
  const { room, me, updateRoom, updateMe } = useRoom<
    ChatRoomInterface<T, U>,
    ChatRoomUser<U>
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
    prevToken,
    dispatch,
    initMessages,
    welcomeMessages,
    useTripleChat,
  } = useChatMessagesContext<U>()
  const api = useChatApiService<U>()

  useEffect(() => {
    ;(async function () {
      await initMessages()

      if (welcomeMessages.length > 0) {
        welcomeMessages.forEach((welcomeMessage) => {
          dispatch({
            action: MessagesActions.PENDING,
            message: welcomeMessage as unknown as ChatMessageInterface<U>, // TODO: TF 내 Pending message 타입 수정 (펜딩 메시지는 id가 옵셔널 할 수 있음)
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
    payload: UnsentMessage<ChatMessageInterface<U>>['payload']
    sender?: UnsentMessage<ChatMessageInterface<U>>['sender']
    tempMessageId?: number
    skipPending?: boolean
    skipFailed?: boolean
    onError?: () => void
  }) {
    const tempMessage: UnsentMessage<ChatMessageInterface<U>> = {
      id: tempMessageId || new Date().getTime(),
      roomId,
      sender,
      payload,
      ...defaultMessageProperties,
    }

    if (!skipPending) {
      dispatch({
        action: MessagesActions.PENDING,
        message: tempMessage,
      })
      setTimeout(() => {
        triggerScrollToBottom()
      }, 100)
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
    room,
    me,
    onError,
  }: {
    room: ChatRoomDetailInterface<T, U>
    me: ChatRoomUser<U>
    onError?: () => void
  }) {
    const welcomeMessagesInPending = pendingMessages.filter(
      (message) =>
        message.sender &&
        getUserIdentifier(message.sender) !== getUserIdentifier(me),
    )

    if (!welcomeMessagesInPending.length) {
      return
    }

    let allSuccess = true
    for (const {
      id: tempId,
      payload,
      sender,
      roomId,
    } of welcomeMessagesInPending) {
      /**
       * 룸이 생성되기 전 생성된 welcomeMessage의 sender 정보는 임시 정보(roomMemberId)를 가지므로 업데이트된 룸의 정보에서 sender를 찾아서 사용합니다.
       */
      const messageSender = roomId
        ? sender
        : findSenderFromRoomMembers(room, me, sender)

      const { success } = messageSender
        ? await handleSendMessageAction({
            roomId: room.id,
            tempMessageId: tempId,
            payload,
            sender: messageSender,
            skipPending: true,
            skipFailed: true,
            onError,
          })
        : { success: false }

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

  async function getChatRoomMemberId({ roomId }: { roomId: string }) {
    if (isChatRoomMember(me)) {
      return me
    }

    try {
      const memberMe = await api.getRoomMemberMe({ roomId })
      updateMe(memberMe)
      return memberMe
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  }

  async function initializeRoomAndMember(): Promise<
    | {
        currentRoom: V
        roomMemberMe: ChatRoomUser<U>
        isValid: true
      }
    | {
        currentRoom: ChatRoomInterface<T, U> | V
        roomMemberMe: ChatRoomUser<U> | undefined
        isValid: false
      }
  > {
    /** roomId 생성 이전에 보낸 메세지는 pusher 이벤트로 받을 수 없기 때문에,
          roomId가 없는 경우에는 먼저 room을 생성하는 과정을 거칩니다.
      */
    const currentRoom = await getOrCreateRoom()
    const currentRoomId = 'id' in currentRoom ? currentRoom.id : ''

    const skipRoomMemberMe = 'identifier' in me && 'id' in me

    const roomMemberMe =
      currentRoomId && !skipRoomMemberMe
        ? await getChatRoomMemberId({ roomId: currentRoomId })
        : me

    /**
     * room과 member 초기화가 성공적으로 완료되었는지 검증합니다.
     * - currentRoom이 생성된 ChatRoom인지 (isCreatedChatRoom)
     * - roomMemberMe가 존재하는지
     * - member 정보가 유효한지
     */
    const isValid =
      isCreatedChatRoom(currentRoom) &&
      !!roomMemberMe &&
      (skipRoomMemberMe || isChatRoomMember(roomMemberMe))

    return isValid
      ? {
          currentRoom: currentRoom as V,
          roomMemberMe,
          isValid: true as const,
        }
      : {
          currentRoom,
          roomMemberMe,
          isValid: false as const,
        }
  }

  async function onSendMessage(
    payload: ChatMessageInterface<U>['payload'],
    {
      onError,
      onRoomAndMemberInitialized,
    }: { onError?: () => void; onRoomAndMemberInitialized?: () => void } = {},
  ) {
    const tempMessage: UnsentMessage<ChatMessageInterface<U>> = {
      id: new Date().getTime(),
      roomId: '',
      payload:
        payload.type === ChatMessagePayloadType.TEXT
          ? { ...payload, message: DOMPurify.sanitize(payload.message) }
          : payload,
      ...defaultMessageProperties,
    }

    let skipPending = false

    if (!isCreatedChatRoom(room)) {
      dispatch({
        action: MessagesActions.PENDING,
        message: tempMessage,
      })
      setTimeout(() => {
        triggerScrollToBottom()
      }, 100)
      skipPending = true
    }

    const result = await initializeRoomAndMember()

    onRoomAndMemberInitialized?.()

    if (!result.isValid) {
      onMessageFailed(tempMessage)
      return
    }

    const { currentRoom, roomMemberMe } = result

    /** 첫 렌더링 시에만 자동 메세지를 보내도록 합니다. */
    if (isWelcomeMessagePendingRef.current) {
      dispatch({
        action: MessagesActions.PENDING,
        message: tempMessage,
      })
      setTimeout(() => {
        triggerScrollToBottom()
      }, 100)
      skipPending = true

      await handleSendWelcomeMessage({
        room: currentRoom,
        me: roomMemberMe,
        onError,
      })
    }

    const { success } = await handleSendMessageAction({
      roomId: currentRoom.id,
      tempMessageId: tempMessage.id,
      payload: tempMessage.payload,
      skipPending,
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
      (hasPrevMessage || !!prevToken) &&
      messages.length > 0

    if (scrollable) {
      const prevScrollY = getScrollContainerHeight()
      let pastMessages: ChatMessageInterface<U>[] = []
      let prevToken: number | undefined | null

      try {
        const result = await api.getMessages({
          roomId: room.id,
          lastMessageId: prevToken ?? messages[0].id,
          backward: true,
        })

        if ('messages' in result) {
          pastMessages = result.messages
          prevToken = result.nextToken
        } else {
          pastMessages = result
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}

      dispatch({
        action: MessagesActions.PAST,
        messages: pastMessages,
        ...(prevToken !== null && {
          prevToken,
        }),
      })
      setScrollY(prevScrollY)
    } else if (isIntersecting && firstRenderForPrevScrollRef.current) {
      firstRenderForPrevScrollRef.current = false
    }
  }

  function onMessageFailed(
    tempMessage: UnsentMessage<ChatMessageInterface<U>>,
    { onError }: { onError?: () => void } = {},
  ) {
    onError?.()
    dispatch({
      action: MessagesActions.FAIL,
      message: tempMessage,
    })
  }

  function removeUnsentMessages(
    message: Pick<ChatRoomMessageInterface<U>, 'id'>,
  ) {
    dispatch({
      action: MessagesActions.REMOVE,
      message,
    })
  }

  function onRetry(
    { id, payload }: UnsentMessage<ChatRoomMessageInterface<U>>,
    {
      onComplete,
    }: {
      onComplete?: () => void
    } = {},
  ) {
    removeUnsentMessages({ id })

    if (payload.type !== 'rich') {
      onSendMessage?.(payload)
      onComplete?.()
    }
  }

  function onRetryCancel(
    { id }: UnsentMessage<ChatRoomMessageInterface<U>>,
    {
      onComplete,
    }: {
      onComplete?: () => void
    } = {},
  ) {
    removeUnsentMessages({ id })
    onComplete?.()
  }

  const onSendMessageEvent = useCallback(
    (
      { message }: Pick<ChatMessageData<U>, 'message'>,
      {
        onComplete,
      }: {
        onComplete?: (message: ChatMessageInterface<U>, my: boolean) => void
      } = {},
    ) => {
      if (message && message.payload) {
        const typeEnsuredMessage = useTripleChat
          ? message
          : ensureMessageWithNumberId(message)
        /**
            pendingMessage와 messages 간의 부드러운 UI 전환을 위해
            me의 메세지일 경우 handleSendMessageAction 함수 내에서 dispatch합니다.
            coupon 메세지는 서버에서 직접 전송되므로 항상 푸셔 이벤트로 dispatch합니다.
          */
        const myMessage =
          getUserIdentifier(me) === getUserIdentifier(typeEnsuredMessage.sender)
        if (!myMessage || typeEnsuredMessage.payload.type === 'coupon') {
          dispatch({
            action: MessagesActions.NEW,
            messages: [typeEnsuredMessage],
            filterPendingMessages: isWelcomeMessagePendingRef.current
              ? filterPendingMessage(typeEnsuredMessage)
              : undefined,
          })
        }
        onComplete?.(typeEnsuredMessage, myMessage)
        if (
          scrollToBottomOnNewMessage ||
          (myMessage && typeEnsuredMessage.payload.type === 'coupon')
        ) {
          triggerScrollToBottom()
        }
      }
    },
    [
      dispatch,
      me,
      scrollToBottomOnNewMessage,
      triggerScrollToBottom,
      useTripleChat,
    ],
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
    message: ChatRoomMessageInterface<U>,
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
    messageId: ChatMessageInterface<U>['id'],
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
    triggerScrollToBottom,
    messages,
    pendingMessages,
    failedMessages,
    onSendMessage,
    onPrevScroll,
    onRetry,
    onRetryCancel,
    onThanksClick,
    onSendMessageEvent,
    hasPrevMessage,
    initializeRoomAndMember,
  }
}

function findSenderFromRoomMembers<T, U>(
  room: ChatRoomDetailInterface<T, U>,
  me: ChatRoomUser<U>,
  sender?: ChatRoomMemberInterface<U>,
) {
  if (sender) {
    return room.members.find(
      (member) =>
        getUserIdentifier(member) === getUserIdentifier(sender) ||
        (room.isDirect && getUserIdentifier(member) !== getUserIdentifier(me)),
    ) as ChatRoomMemberInterface<U>
  }
}

function filterPendingMessage<T>(
  message: Required<ChatMessageData<T>>['message'],
) {
  return (pendingMessages: UnsentMessage<ChatMessageInterface<T>>[]) => {
    return pendingMessages.filter(
      ({ sender, payload }) =>
        !sender ||
        getUserIdentifier(sender) !== getUserIdentifier(message.sender) ||
        !compareChatMessagePayloads(payload, message.payload),
    )
  }
}

/**
 * welcomeMessage의 타입인 'text'와 'product'의 경우에만 비교합니다.
 */
function compareChatMessagePayloads<T extends ChatMessagePayloadType>(
  payloadA: ChatMessageInterface<T>['payload'],
  payloadB: ChatMessageInterface<T>['payload'],
) {
  if (payloadA.type === 'text' && payloadB.type === 'text') {
    return payloadA.message === payloadB.message
  }

  if (payloadA.type === 'product' && payloadB.type === 'product') {
    return payloadA.product.productName === payloadB.product.productName
  }

  return false
}

function ensureMessageWithNumberId<T>(message: ChatMessageInterface<T>) {
  return {
    ...message,
    id: typeof message.id === 'number' ? message.id : Number(message.id),
  }
}

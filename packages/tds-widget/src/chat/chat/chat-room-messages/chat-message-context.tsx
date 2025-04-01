import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'

import {
  type MessagesAction,
  MessagesActions,
  UnsentMessage,
  useMessagesReducer,
} from '../messages-reducer'
import {
  ChatMessageInterface,
  isCreatedChatRoom,
  UserType,
  WelcomeMessageInterface,
} from '../../types'
import { useRoom } from '../room-context'

import { ChatFetcher, ChatApiService } from './chat-api-service'

export interface ChatMessagesProviderProps<T = UserType> {
  messages?: ChatMessageInterface<T>[]
  hasPrevMessage?: boolean
  welcomeMessages?: WelcomeMessageInterface<T>[]
  fetcher: ChatFetcher
  /**
   * legacy API인 triple-chat을 사용하는 경우 true
   */
  useTripleChat?: boolean
}

export interface ChatMessagesContextValue<T = UserType> {
  /**
   * MessagesReducer의 state 및 dispatch
   */
  messages: ChatMessageInterface<T>[]
  pendingMessages: UnsentMessage<ChatMessageInterface<T>>[]
  failedMessages: UnsentMessage<ChatMessageInterface<T>>[]
  hasPrevMessage: boolean
  dispatch: Dispatch<
    MessagesAction<ChatMessageInterface<T>, ChatMessageInterface<T>['id']>
  >
  welcomeMessages: WelcomeMessageInterface<T>[]
  initMessages: () => Promise<void>
}

export const ChatApiServiceContext = createContext<ChatApiService | null>(null)

export const ChatMessagesContext =
  createContext<ChatMessagesContextValue | null>(null)

export function ChatMessagesProvider<T = UserType>({
  welcomeMessages = [],
  messages: initialMessages = [],
  hasPrevMessage: initialPrevMessage,
  fetcher,
  useTripleChat = false,
  children,
}: PropsWithChildren<ChatMessagesProviderProps<T>>) {
  const { room } = useRoom()

  const chatApiService = useMemo(
    () => new ChatApiService<T>(fetcher, useTripleChat),
    [fetcher, useTripleChat],
  )

  const [
    { messages, pendingMessages, failedMessages, hasPrevMessage },
    dispatch,
  ] = useMessagesReducer<
    ChatMessageInterface<T>,
    ChatMessageInterface<T>['id']
  >()

  const initMessages = async () => {
    if (!isCreatedChatRoom(room)) {
      dispatch({
        action: MessagesActions.HAS_PREV,
        hasPrevMessage: false,
      })
    } else {
      let messages = initialMessages
      let hasPrevMessage: boolean | undefined = initialPrevMessage

      if (!messages.length) {
        try {
          const result = await chatApiService.getMessages({
            roomId: room.id,
            backward: true,
            lastMessageId: Number(room.lastMessageId) + 1,
          })
          if ('messages' in result) {
            messages = result.messages
            hasPrevMessage = result.hasNext
          } else {
            messages = result
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {}
      }

      dispatch({
        action: MessagesActions.INIT,
        messages,
        hasPrevMessage: hasPrevMessage ?? messages.length > 0,
      })
    }
  }

  const value = {
    messages,
    pendingMessages,
    failedMessages,
    hasPrevMessage,
    dispatch,
    welcomeMessages,
    initMessages,
  } as unknown as ChatMessagesContextValue

  return (
    <ChatApiServiceContext.Provider
      value={chatApiService as unknown as ChatApiService}
    >
      <ChatMessagesContext.Provider value={value}>
        {children}
      </ChatMessagesContext.Provider>
    </ChatApiServiceContext.Provider>
  )
}

export function useChatApiService<T = UserType>() {
  const context = useContext(ChatApiServiceContext)
  if (!context) {
    throw new Error(
      'useChatApiService must be used within a ChatMessagesProvider',
    )
  }
  return context as ChatApiService<T>
}

export function useChatMessagesContext<T = UserType>() {
  const context = useContext(ChatMessagesContext)
  if (!context) {
    throw new Error(
      'useChatMessagesContext must be used within a ChatMessagesProvider',
    )
  }
  return context as unknown as ChatMessagesContextValue<T>
}

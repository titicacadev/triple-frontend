import { PropsWithChildren } from 'react'

import { ChatRoomInterface, ChatUserInterface, UserType } from '../../types'
import { ScrollProvider } from '../scroll-context'
import { RoomProvider, type RoomProviderProps } from '../room-context'

import {
  ChatMessagesProvider,
  type ChatMessagesProviderProps,
} from './chat-message-context'

export interface ChatRoomMessagesProviderProps<
  T = ChatRoomInterface,
  U = ChatUserInterface,
  V = UserType,
> extends ChatMessagesProviderProps<V>,
    RoomProviderProps<T, U> {}

export function ChatRoomMessagesProvider<
  T = ChatRoomInterface,
  U = ChatUserInterface,
  V = UserType,
>({
  room,
  me,
  children,
  ...props
}: PropsWithChildren<ChatRoomMessagesProviderProps<T, U, V>>) {
  return (
    <RoomProvider room={room} me={me}>
      <ScrollProvider>
        <ChatMessagesProvider {...props}>{children}</ChatMessagesProvider>
      </ScrollProvider>
    </RoomProvider>
  )
}

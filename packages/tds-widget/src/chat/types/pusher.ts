import { ChatMessageInterface } from './message'
import { RoomType } from './room'
import { HasUnreadOfRoomInterface } from './unread'
import { ChatUserInterface, UserType } from './user'

interface ChannelUser<T = UserType>
  extends Omit<ChatUserInterface<T>, 'channel'> {
  roomMemberId: string
}

interface ChannelRoom<T = RoomType> {
  id: string
  name?: string
  isDirect: boolean
  lastMessageId: number
  memberIds: string[]
  type: T
  privateChannel: boolean
}

interface ChannelRoomMetadata {
  memberCounts: number
}

interface UnreadChatMessage<T = UserType>
  extends Pick<
    ChatMessageInterface<T>,
    'displayTarget' | 'payload' | 'alternative' | 'createdAt'
  > {
  roomId: string
  senderId: string
}

/**
 * sendUnreadMessage 이벤트로 전달되는 데이터 타입
 */
export interface UnreadChatMessageData<T = UserType> {
  message?: UnreadChatMessage<T>
  otherUnreadInfo?: HasUnreadOfRoomInterface
  roomId: string
}

/**
 * sendMessage 이벤트로 전달되는 데이터 타입
 */
export interface ChatMessageData<T = UserType> {
  message?: ChatMessageInterface<T>
  metadata: ChannelRoomMetadata
}

export interface JoinedChatData<T = RoomType, U = UserType> {
  room: ChannelRoom<T>
  members: ChannelUser<U>[]
  memberCounts: number
  metadata: ChannelRoomMetadata
}

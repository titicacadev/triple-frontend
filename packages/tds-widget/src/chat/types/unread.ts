import { ChatMessageInterface } from './message'
import { UserType } from './user'

export interface HasUnreadInterface {
  hasUnread: boolean
}

export interface HasUnreadOfRoomInterface extends HasUnreadInterface {
  others: OtherUnreadInterface[]
  lastMessageId: number
}

export interface OtherUnreadInterface {
  memberId: string
  lastSeenMessageId: number
}

export interface UpdatedChatData<T = UserType> {
  message?: ChatMessageInterface<T>
  otherUnreadInfo?: HasUnreadOfRoomInterface
}

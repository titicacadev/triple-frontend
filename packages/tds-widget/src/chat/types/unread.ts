import { ChatMessageInterface } from './message'

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

export interface UpdatedChatData {
  message?: ChatMessageInterface
  otherUnreadInfo?: HasUnreadOfRoomInterface
}

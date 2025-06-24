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
  /**
   * @deprecated
   */
  memberId: string
  roomMemberId: string
  lastSeenMessageId: number
}

/**
 * @deprecated
 * case별로 UnreadChatMessageData, ChatMessageData, JoinedChatData로 분리하여 사용해 주세요.
 */
export interface UpdatedChatData<T = UserType> {
  message?: ChatMessageInterface<T>
  otherUnreadInfo?: HasUnreadOfRoomInterface
}

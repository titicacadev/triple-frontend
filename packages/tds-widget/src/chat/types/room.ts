import { ValueOf } from './base'
import { MetaDataInterface } from './image'
import { ChatMessageInterface } from './message'
import { ChatUserInterface } from './user'

export const RoomType = {
  DEFAULT: 'default', // 기존 파트너센터 챗
  EVENT: 'event', // 행사용 그룹 챗
} as const

export type RoomType = ValueOf<typeof RoomType>

export interface RoomListResultInterface {
  total: number
  rooms: RoomInterface[]
}

export interface RoomListResultWithPagingInterface
  extends RoomListResultInterface {
  page: number
  size: number
}

export interface RoomMetadata {
  name: string
  memberCounts: number
  articleId?: string
}

export interface RoomInterface {
  id: string
  type: RoomType
  name?: string
  lastMessageId: number
  lastMessage: ChatMessageInterface
  unreadCount?: number
  members: ChatUserInterface[]
  isDirect: boolean
  createdAt: string
  metadata?: RoomMetadata
}

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

export interface ImageMetadataInterface {
  media: MetaDataInterface[]
}

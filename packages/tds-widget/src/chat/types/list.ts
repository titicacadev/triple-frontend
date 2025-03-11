import { ImageMeta } from '@titicaca/type-definitions'

import { ChatUser, DisplayTargetAll, MessagePayload, UserType } from '.'

export interface ChatMessage {
  id: number
  roomId: string
  senderId: string
  payload: MessagePayload
  createdAt?: string
  displayTarget?: UserType[] | DisplayTargetAll
  alternative?: MessagePayload
  blindedAt?: string
  sender: ChatUser
  //   reactions?: { [type in ReactionType]?: { count: number; haveMine: boolean } }
}

export type MessageType = 'text' | 'images' | 'rich' | 'product'

interface MessageBase {
  type: MessageType
}

export interface TextMessage extends MessageBase {
  type: 'text'
  message: string
}

export interface ImageMessage extends MessageBase {
  type: 'images'
  images: ImageMeta[]
}

export interface ChatList {
  chatRoomList: ChatRoom[] // 채팅방 목록 (좌측)
  selectedRoomId?: string // 사용자가 선택한 채팅방
  selectRoom?: (roomId: string) => void // 사용자 채팅방 선택
  me: ChatUser
  others: ChatUser[]
  readOption?: string
}

export enum ChatRoomType {
  DEFAULT = 'default',
  EVENT = 'event',
}

export interface ChatRoomMetadata {
  name: string
  memberCounts: number
  articleId?: string
}

export interface ChatRoom {
  id: string
  type: ChatRoomType
  name?: string
  lastMessageId: number
  lastMessage: ChatMessage
  unreadCount?: number
  members: ChatUser[]
  isDirect: boolean
  createdAt: string
  metadata?: ChatRoomMetadata
}

export interface ChatRoomFilter {
  readOnly?: boolean
  //   searchOption?: SearchOption
  searchValue: string | null
  page: number
}

export interface ChatListState {
  rooms: ChatRoom[]
  pageSize: number
  currentPage: number
  totalPage: number
  total: number
  filter: ChatRoomFilter
  me?: ChatUser
  selectedRoomId?: string
  searchUserId?: string
  lastMessageId?: number
}

export interface ChatRoomListResult {
  total: number
  rooms: ChatRoom[]
}
export interface ChatRoomListResultWithPaging extends ChatRoomListResult {
  page: number
  size: number
}

export interface OtherUnreadInterface {
  memberId: string
  lastSeenMessageId: number
}

export interface HasUnreadInterface {
  hasUnread: boolean
}

export interface HasUnreadOfRoomInterface extends HasUnreadInterface {
  others: OtherUnreadInterface[]
  lastMessageId: number
}

export interface UpdatedChatData {
  message?: ChatMessage
  otherUnreadInfo?: HasUnreadOfRoomInterface
}

export interface StoreSendMessageInput {
  payload: MessagePayload
  senderId: ChatUser['id']
  roomId: ChatRoom['id']
}

export interface UpdateUnreadMessageInput {
  lastSeenMessageId: number
}

export interface ChatPageProps {
  chatRooms: ChatRoom[]
  total: number
  page: number
  readOnly?: boolean
  searchUserId?: string
  searchOption?: string
  searchValue?: string
}

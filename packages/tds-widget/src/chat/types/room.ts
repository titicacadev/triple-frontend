import { ValueOf } from './base'
import { ChatMessageInterface } from './message'
import { ChatUserInterface, UserType } from './user'

export const RoomType = {
  DEFAULT: 'default', // 기존 파트너센터 챗
  EVENT: 'event', // 행사용 그룹 챗
  INTERPARK_TNA_PRODUCT: 'interpark-tna-product',
  INTERPARK_TNA_BOOKING: 'interpark-tna-booking',
} as const

export type RoomType = ValueOf<typeof RoomType>

export interface RoomListResultInterface<T = RoomInterface> {
  total: number
  rooms: T[]
}

export interface RoomListResultWithPagingInterface<T = RoomInterface>
  extends RoomListResultInterface<T> {
  page: number
  size: number
}

type RoomMetaDataType = 'EVENT' | 'PRODUCT' | 'BOOKING'

interface RoomMetaDataBase {
  type: RoomMetaDataType
}

interface EventRoomMetaData extends RoomMetaDataBase, EventMetaData {
  type: 'EVENT'
}

interface ProductRoomMetaData extends RoomMetaDataBase, ProductMetaData {
  type: 'PRODUCT'
}

interface BookingRoomMetaData extends RoomMetaDataBase, BookingMetaData {
  type: 'BOOKING'
}

export interface EventMetaData {
  name: string
  memberCounts: number
  articleId?: string
}

interface ProductMetaData {
  productName: string
  productThumbnail?: string
  itemName?: string
  optionName?: string
}

interface BookingMetaData {
  bookingId: string
  status: string
  statusDescription: string
  product: ProductMetaData
  dateOfUse?: DateOfUseDate | DateOfUseRange
}

interface DateOfUseDate {
  type: 'DATE'
  date: string
}

interface DateOfUseRange {
  type: 'RANGE'
  from: string
  to: string
}

export interface ChatRoomMetadataMap {
  [RoomType.EVENT]: EventRoomMetaData
  [RoomType.INTERPARK_TNA_PRODUCT]: ProductRoomMetaData
  [RoomType.INTERPARK_TNA_BOOKING]: BookingRoomMetaData
}

type ChatRoomMetadata<T, U = ChatRoomMetadataMap> = T extends keyof U
  ? U[T]
  : undefined

interface BaseChatRoomInterface<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> {
  type: T
  members: ChatUserInterface<U>[]
  metadata?: V
}

export interface CreatedChatRoomDetailInterface<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> extends BaseChatRoomInterface<T, U, V> {
  room: ChatRoomDetailRoomInterface<U>
  /**
   * 채팅방 만료 여부
   */
  expired: boolean
}

interface ChatRoomDetailRoomInterface<T = UserType> {
  id: string
  name?: string
  lastMessageId: number
  lastMessage: ChatMessageInterface<T>
  isDirect: boolean
  createdAt: string
  privateChannel: boolean
  channel: ChatRoomChannelInfo
}

interface ChatRoomChannelInfo {
  channel: string
  events: { refresh: string; unread: string; send: string; join: string }
  needAuth: boolean
}

export type CreatedChatRoomInterface<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> = Omit<CreatedChatRoomDetailInterface<T, U, V>, 'room'> &
  CreatedChatRoomDetailInterface<T, U, V>['room']

/**
 * nol-chat 서버 응답으로 받는 RoomInterface
 */
export type ChatRoomDetailInterface<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> = BaseChatRoomInterface<T, U, V> | CreatedChatRoomDetailInterface<T, U, V>

export interface ChatRoomListItemInterface<T = RoomType, U = UserType>
  extends Pick<
      CreatedChatRoomInterface<T, U>,
      | 'id'
      | 'createdAt'
      | 'isDirect'
      | 'name'
      | 'lastMessageId'
      | 'lastMessage'
      | 'type'
      | 'expired'
    >,
    Pick<Required<CreatedChatRoomInterface<T, U>>, 'members'> {
  unreadCount?: number
}

/**
 * TF/chat 컴포넌트 내에서 사용하는 RoomInterface
 */
export type ChatRoomInterface<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> = BaseChatRoomInterface<T, U, V> | CreatedChatRoomInterface<T, U, V>

export function isEventRoom(
  room: ChatRoomInterface,
): room is ChatRoomInterface<typeof RoomType.EVENT> {
  return room.metadata !== undefined && room.metadata.type === 'EVENT'
}

export function isProductRoom(
  room: ChatRoomInterface,
): room is ChatRoomInterface<typeof RoomType.INTERPARK_TNA_PRODUCT> {
  return room.metadata !== undefined && room.metadata.type === 'PRODUCT'
}

export function isBookingRoom(
  room: ChatRoomInterface,
): room is ChatRoomInterface<typeof RoomType.INTERPARK_TNA_BOOKING> {
  return room.metadata !== undefined && room.metadata.type === 'BOOKING'
}

export function isCreatedChatRoom(
  room: ChatRoomInterface,
): room is CreatedChatRoomInterface {
  return 'id' in room
}

/**
 * @deprecated
 * 기존 triple-chat에서 사용하는 RoomInterface
 * nol-chat으로 변경 시 ChatRoomInterface를 사용해 주세요.
 */
export interface RoomInterface<T = RoomType, U = UserType> {
  id: string
  type: T
  name?: string
  lastMessageId: number
  lastMessage: ChatMessageInterface<U>
  unreadCount?: number
  members: ChatUserInterface<U>[]
  isDirect: boolean
  createdAt: string
  metadata?: EventMetaData
}

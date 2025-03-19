import { ChatChannelInfo, ValueOf } from './base'
import { ChatMessageInterface } from './message'
import { ChatRoomMemberInterface, ChatUserInterface, UserType } from './user'

export const RoomType = {
  DEFAULT: 'default', // 기존 파트너센터 챗
  EVENT: 'event', // 행사용 그룹 챗
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

export interface ProductRoomMetaData extends RoomMetaDataBase, ProductMetaData {
  type: 'PRODUCT'
}

export interface BookingRoomMetaData extends RoomMetaDataBase, BookingMetaData {
  type: 'BOOKING'
}

export interface EventMetaData {
  name: string
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
}

export type ChatRoomMetadata<T, U = ChatRoomMetadataMap> = T extends keyof U
  ? U[T]
  : undefined

/**
 * @deprecated
 * 기존 트리플 파트너챗에서 /direct로 진입하는 생성되지 않은 채팅방
 */
interface DirectChatRoomInterface<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> extends BaseChatRoomInterface<T, U, V> {
  members: ChatRoomMemberInterface<U>[]
}

interface BaseChatRoomInterface<
  T = RoomType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  U = UserType,
  V = ChatRoomMetadata<T>,
> {
  type: T
  metadata?: V
}

export interface CreatedChatRoomDetailInterface<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> extends BaseChatRoomInterface<T, U, V> {
  room: ChatRoomDetailRoomInterface<T, U>
  /**
   * 채팅방 만료 여부
   */
  expired: boolean
  memberCounts: number
  members: ChatUserInterface<U>[]
}

interface ChatRoomDetailRoomInterface<T = RoomType, U = UserType> {
  id: string
  type: T
  name?: string
  lastMessageId: number
  lastMessage: ChatMessageInterface<U>
  isDirect: boolean
  createdAt: string
  privateChannel: boolean
  channel: ChatChannelInfo
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
> =
  | BaseChatRoomInterface<T, U, V>
  | CreatedChatRoomDetailInterface<T, U, V>
  | DirectChatRoomInterface<T, U, V>

interface ChatRoomListMemberInterface<T = UserType>
  extends ChatRoomMemberInterface<T>,
    Pick<ChatUserInterface<T>, 'id'> {}

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
  > {
  members: ChatRoomListMemberInterface[]
  unreadCount?: number
}

/**
 * TF/chat 컴포넌트 내에서 사용하는 RoomInterface
 */
export type ChatRoomInterface<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> =
  | BaseChatRoomInterface<T, U, V>
  | CreatedChatRoomInterface<T, U, V>
  | DirectChatRoomInterface<T, U, V>

export function isCreatedChatRoom<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
>(room: ChatRoomInterface<T, U, V>): room is CreatedChatRoomInterface<T, U, V> {
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
  channel?: ChatChannelInfo
}

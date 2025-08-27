import { ChatChannelInfo, ValueOf } from './base'
import { ChatMessageInterface } from './message'
import {
  ChatRoomMemberInterface,
  PreDirectRoomMemberInterface,
  TripleChatUserInterface,
  UserType,
} from './user'

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

interface UserMetaData {
  type: string
  id: string
}

interface ProductMetaData {
  productId: string
  productName: string
  productThumbnail?: string
  itemName?: string
  itemId?: string
  optionName?: string
  optionId?: string
  user: UserMetaData
}

interface BookingMetaData {
  bookingId: string
  status: string
  statusDescription: string
  product: Omit<ProductMetaData, 'user'>
  dateOfUse?: DateOfUseDate | DateOfUseRange
  user: UserMetaData
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

type ExpirePolicyType = 'AFTER_DATE_OF_USE' | 'AFTER_MESSAGE' | 'AFTER_CANCEL'

interface ExpirePolicyBase {
  type: ExpirePolicyType
  duration: {
    days: number
    hours: number
    minutes: number
    seconds: number
    milliSeconds: number
  }
  baseAt?: string
  expiredAt?: string
}

interface AfterDateOfUsePolicy extends ExpirePolicyBase {
  type: 'AFTER_DATE_OF_USE'
}

interface AfterMessagePolicy extends ExpirePolicyBase {
  type: 'AFTER_MESSAGE'
}

interface AfterCancelPolicy extends ExpirePolicyBase {
  type: 'AFTER_CANCEL'
}

type ExpirePolicy =
  | AfterDateOfUsePolicy
  | AfterMessagePolicy
  | AfterCancelPolicy

/**
 * @deprecated
 * 기존 트리플 파트너챗에서 /direct로 진입하는 생성되지 않은 채팅방
 */
export interface PreDirectRoomInterface<T = RoomType, U = UserType> {
  preDirectRoom: true
  type: T
  members: PreDirectRoomMemberInterface<U>[]
  me: PreDirectRoomMemberInterface<U>
  other?: PreDirectRoomMemberInterface<U>
}

/**
 * 초대 링크로 진입한 생성되지 않은 RoomInterface
 */
export interface InvitationRoomInterface<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> extends Pick<InvitationInterface<T, U, V>, 'expirePolicies' | 'other'> {
  type: T
  metadata?: V
}

/**
 * nol-chat 서버 응답으로 받는 RoomInterface
 */
export interface ChatRoomDetailInterface<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> {
  id: string
  type: T
  name?: string
  lastMessageId: number
  isDirect: boolean
  createdAt: string
  privateChannel: boolean
  channel: ChatChannelInfo
  /**
   * 채팅방 만료 여부
   */
  expired: boolean
  expireAt?: string
  memberCounts: number
  members: ChatRoomMemberInterface<U>[]
  metadata?: V
  expirePolicies: ExpirePolicy[]
  /**
   * 재문의 가능 여부
   */
  canReactivation?: boolean
}

export interface ChatRoomListItemInterface<T = RoomType, U = UserType>
  extends Pick<
    ChatRoomDetailInterface<T, U>,
    | 'id'
    | 'createdAt'
    | 'isDirect'
    | 'name'
    | 'lastMessageId'
    | 'type'
    | 'expired'
    | 'members'
  > {
  lastMessage?: ChatMessageInterface<U>
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
  | ChatRoomDetailInterface<T, U, V>
  | InvitationRoomInterface<T, U, V>
  | PreDirectRoomInterface<T, U>

/**
 * @deprecated
 * 기존 트리플 파트너챗에서 /direct로 진입하는 생성되지 않은 채팅방인지 확인합니다.
 */
export function isPreDirectRoom<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
>(room: ChatRoomInterface<T, U, V>): room is PreDirectRoomInterface<T, U> {
  return !!(room as { preDirectRoom?: boolean }).preDirectRoom
}

/**
 * 생성된 채팅방인지 확인합니다.
 */
export function isCreatedChatRoom<
  T = RoomType,
  U = UserType,
  V = ChatRoomMetadata<T>,
>(room: ChatRoomInterface<T, U, V>): room is ChatRoomDetailInterface<T, U, V> {
  return 'id' in room
}

/**
 * @deprecated
 * 기존 triple-chat에서 사용하는 RoomInterface
 * nol-chat으로 변경 시 ChatRoomDetailInterface를 사용해 주세요.
 */
export interface RoomInterface<T = RoomType, U = UserType> {
  id: string
  type: T
  name?: string
  lastMessageId: number
  lastMessage: ChatMessageInterface<U>
  unreadCount?: number
  members: TripleChatUserInterface<U>[]
  isDirect: boolean
  createdAt: string
  metadata?: EventMetaData
  channel?: ChatChannelInfo
}

export const InvitationType = {
  TRIPLE_EVENT: 'triple-event',
  TRIPLE_TNA_PRODUCT: 'triple-tna-product',
  TRIPLE_TNA_BOOKING: 'triple-tna-booking',
} as const

export type InvitationType = ValueOf<typeof InvitationType>

export interface InvitationAcceptInterface {
  id: string
  roomId: string
  acceptedAt: string
}

export interface InvitationInterface<
  T = InvitationType,
  U = UserType,
  V = ChatRoomMetadata<T>,
> {
  invitationType: T
  invitationIdentifier: string
  metadata: V
  accept?: InvitationAcceptInterface
  expirePolicies: ExpirePolicy[]
  other?: Pick<ChatRoomMemberInterface<U>, 'type' | 'profile'>
}

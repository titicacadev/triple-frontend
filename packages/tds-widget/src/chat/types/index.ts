import { RichItemButton, RichItemImages, RichItemText } from '../bubble/type'

export enum UserType {
  TRIPLE_USER = 'TRIPLE_USER',
  TRIPLE_OPERATOR = 'TRIPLE_OPERATOR',
  TNA_PARTNER = 'TNA_PARTNER',
  INTERPARK_USER = 'INTERPARK_USER',
}

export type MessageType =
  | 'WELCOME'
  | 'LINK'
  | 'TEXT'
  | 'IMAGES'
  | 'BUTTON'
  | 'RICH'
  | 'PRODUCT'

export enum RoomType {
  DEFAULT = 'default', // 기존 파트너센터 챗
  EVENT = 'event', // 행사용 그룹 챗
}

export type PostMessageType = (
  payload: RichItemText | RichItemImages,
) => Promise<{ success: boolean; newMessages: MessageInterface[] }>

export type PostMessageActionType = (
  payload: RichItemText | RichItemImages,
  retry?: boolean,
) => Promise<boolean> | undefined

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
  lastMessage: MessageInterface
  unreadCount?: number
  members: ChatUser[]
  isDirect: boolean
  createdAt: string
  metadata?: RoomMetadata
}

export type DisplayTargetAll = 'all'

export type ReactionType = 'thanks'

export type MessagePayload =
  | RichItemText
  | RichItemImages
  | RichPayload
  | ProductPayload

export interface MessageInterface {
  id: number
  roomId: string
  senderId: string
  payload: MessagePayload
  createdAt?: string
  displayTarget?: UserType[] | DisplayTargetAll
  alternative?: RichItemText | RichItemImages | RichPayload
  blindedAt?: string
  sender: ChatUser
  reactions?: { [type in ReactionType]?: { count: number; haveMine: boolean } }
}

export interface ChatUser {
  id: string
  createdAt: string
  type: UserType
  identifier: string
  code: string
  profile: {
    name: string
    thumbnail: string
    message: string
  }
}

export interface RichPayload {
  type: 'rich'
  items: (RichItemText | RichItemImages | RichItemButton)[]
}

export interface ProductPayload {
  type: 'product'
  product: ProductItem
}

export interface RichItem {
  type: MessageType
}

export type CustomerBookingStatus =
  | 'BOOKED'
  | 'ONGOING'
  | 'COMPLETED'
  | 'CANCEL_REQUESTED'
  | 'CANCELED'

export interface ProductItem {
  customerBookingStatus?: CustomerBookingStatus
  productName: string
  productThumbnail?: string
  itemName?: string
  optionName?: string
  dateOfUse?: string
  bookingId?: number
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

export interface RoomMembersInterface {
  me: ChatUser
  others: ChatUser[]
}

export interface UpdateChatData {
  message?: MessageInterface
  otherUnreadInfo?: HasUnreadOfRoomInterface
}

/**
 * TODO: type-definitions의 ImageMeta와 연관성 조사
 */
export interface MetaDataInterface {
  cloudinaryBucket: string
  cloudinaryId: string
  originalUrl?: string
  fileName?: string
  id: string
  type: string
  sizes: {
    full: {
      url: string
    }
    large: {
      url: string
    }
    smallSquare: {
      url: string
    }
  }
  width: number
  height: number
}

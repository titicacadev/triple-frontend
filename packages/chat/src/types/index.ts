import { RichItemButton, RichItemImages, RichItemText } from '../bubble/type'

export enum UserType {
  TRIPLE_USER = 'TRIPLE_USER',
  TRIPLE_OPERATOR = 'TRIPLE_OPERATOR',
  TNA_PARTNER = 'TNA_PARTNER',
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
  members: UserInterface[]
  isDirect: boolean
  createdAt: string
  metadata?: RoomMetadata
}

export type DisplayTargetAll = 'all'

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
  sender: UserInterface
}

export interface UserInterface {
  id: string
  type: UserType
  code: string
  profile: ProfileInterface
  identifier: string
}

export interface ProfileInterface {
  name: string
  thumbnail: string
  message: string
}

export interface UserAgentProps {
  userAgent: {
    isPublic: boolean
    isMobile: boolean
    os: {
      name: string
      version: string
    }
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
  me: UserInterface
  others: UserInterface[]
}

export interface UpdateChatData {
  message?: MessageInterface
  otherUnreadInfo?: HasUnreadOfRoomInterface
}
/**
 * @alias RoomMembersInterface
 */
export type UserInfoInterface = RoomMembersInterface

export interface TokenInterface {
  signature: string
  public_id: string
  api_key: string
  timestamp: string
}
export interface CloudinaryImageInterface {
  public_id: string
  version: number
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: any[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  backup_url: string
  original_filename: string
}

export interface ImageMetadataInterface {
  media: MetaDataInterface[]
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

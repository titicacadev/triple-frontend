/* eslint-disable */
export enum UserType {
  TRIPLE_USER = 'TRIPLE_USER',
  TRIPLE_OPERATOR = 'TRIPLE_OPERATOR',
  TNA_PARTNER = 'TNA_PARTNER',
}

export enum MessageType {
  WELCOME = 'welcome',
  LINK = 'link',
  TEXT = 'text',
  IMAGES = 'images',
  FORM = 'form',
  SUBMIT = 'submit',
  BUTTON = 'button',
  RICH = 'rich',
}

export type PostMessageType = (
  payload: TextPayload | ImagePayload,
) => Promise<{ success: boolean; newMessages: MessageInterface[] }>

export type PostMessageActionType = (
  payload: TextPayload | ImagePayload,
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

export interface RoomInterface {
  id: string
  name?: string
  lastMessageId: number
  lastMessage: MessageInterface
  unreadCount?: number
  members: UserInterface[]
  isDirect: boolean
  createdAt: string
}

export type DisplayTargetAll = 'all'

export interface MessageInterface {
  id: number
  roomId: string
  senderId: string
  payload: TextPayload | ImagePayload | RichPayload
  createdAt?: string
  displayTarget?: UserType[] | DisplayTargetAll
  alternative?: TextPayload | ImagePayload | RichPayload
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

export interface TextPayload extends RichItem {
  type: MessageType.TEXT
  message: string
}

export interface ImagePayload extends RichItem {
  type: MessageType.IMAGES
  images: MetaDataInterface[]
}

export interface ButtonPayload extends RichItem {
  type: MessageType.BUTTON
  label: string
  action: {
    param: string
    type: MessageType.LINK
  }
}

export interface RichPayload {
  type: MessageType.RICH
  items: (TextPayload | ImagePayload | ButtonPayload)[]
}

export interface RichItem {
  type: MessageType
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

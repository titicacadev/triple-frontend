import { UnsentMessage } from '../chat'

import { MetaDataInterface } from './image'
import {
  ChatRoomMemberInterface,
  PreDirectRoomMemberInterface,
  TripleChatRoomMemberInterface,
  UserType,
} from './user'

export type DisplayTargetAll = 'all'

export type ReactionType = 'thanks'

export enum ChatMessagePayloadType {
  WELCOME = 'welcome',
  TEXT = 'text',
  IMAGES = 'images',
  BUTTON = 'button',
  RICH = 'rich',
  FORM = 'form',
  SUBMIT = 'submit',
  PRODUCT = 'product',
  COUPON = 'coupon',
}

type RichItemType =
  | ChatMessagePayloadType.TEXT
  | ChatMessagePayloadType.IMAGES
  | ChatMessagePayloadType.BUTTON

interface RichItemBase {
  type: RichItemType
}

interface RichItemText extends RichItemBase {
  type: ChatMessagePayloadType.TEXT
  message: string
}
interface RichItemImages extends RichItemBase {
  type: ChatMessagePayloadType.IMAGES
  images: MetaDataInterface[]
}

interface RichItemButton extends RichItemBase {
  type: ChatMessagePayloadType.BUTTON
  label: string
  action: {
    param: string
    type: 'link'
  }
}

export type RichItem = RichItemText | RichItemImages | RichItemButton

export interface ChatMessagePayloadBase {
  type: ChatMessagePayloadType
  extra?: Record<string, unknown>
}

interface ChatTextMessagePayload extends ChatMessagePayloadBase {
  type: ChatMessagePayloadType.TEXT
  message: string
}

interface ChatImagesMessagePayload extends ChatMessagePayloadBase {
  type: ChatMessagePayloadType.IMAGES
  images: MetaDataInterface[]
}

interface ChatRichMessagePayload extends ChatMessagePayloadBase {
  type: ChatMessagePayloadType.RICH
  items: (RichItemText | RichItemImages | RichItemButton)[]
}

interface ChatProductMessagePayload extends ChatMessagePayloadBase {
  type: ChatMessagePayloadType.PRODUCT
  product: ProductItem
}

interface ChatCouponMessagePayload extends ChatMessagePayloadBase {
  type: ChatMessagePayloadType.COUPON
  coupon: CouponItem
}

export type ChatMessagePayload =
  | ChatTextMessagePayload
  | ChatImagesMessagePayload
  | ChatRichMessagePayload
  | ChatProductMessagePayload
  | ChatCouponMessagePayload

type ChatAlternativeMessagePayload =
  | ChatTextMessagePayload
  | ChatRichMessagePayload

/**
 * triple-chat 서버 응답으로 받는 ChatMessageInterface
 */
export interface TripleChatMessageInterface<T = UserType>
  extends Omit<ChatMessageInterface<T>, 'sender'> {
  /**
   * @deprecated
   */
  senderId?: string
  sender: TripleChatRoomMemberInterface<T>
}

/**
 * nol-chat 서버 응답으로 받는 ChatMessageInterface
 */
export interface ChatMessageInterface<T = UserType> {
  id: number
  roomId: string
  payload: ChatMessagePayload
  createdAt?: string
  displayTarget?: T[] | DisplayTargetAll
  alternative?: ChatAlternativeMessagePayload
  blindedAt?: string
  reactions?: { [type in ReactionType]?: { count: number; haveMine: boolean } }
  sender: ChatRoomMemberInterface<T>
}

export type WelcomeMessageInterface<T = UserType> = UnsentMessage<
  Omit<ChatMessageInterface<T>, 'roomId' | 'sender'> & {
    roomId?: string
    sender:
      | ChatMessageInterface<T>['sender']
      | PreDirectRoomMemberInterface<UserType>
  }
>

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

export interface CouponItem {
  type: string
  name: string
  discount: {
    type: string
    value: number
    maxDiscountAmount: number
  }
  period: {
    startAt: string
    endAt: string
  }
  code: string
  propertyId: string
}

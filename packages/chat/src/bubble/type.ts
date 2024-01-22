import { MouseEvent } from 'react'
import { LongPressCallbackMeta, LongPressReactEvents } from 'use-long-press'
import { CSSProp } from 'styled-components'

import { MetaDataInterface } from '../types'

import { ParentMessageUIProp } from './parent/parent-ui'

type CustomerBookingStatus =
  | 'BOOKED'
  | 'ONGOING'
  | 'COMPLETED'
  | 'CANCEL_REQUESTED'
  | 'CANCELED'

interface ProductItem {
  customerBookingStatus?: CustomerBookingStatus
  productName: string
  productThumbnail?: string
  itemName?: string
  optionName?: string
  dateOfUse?: string
  bookingId?: number
}

type RichItemType = 'text' | 'images' | 'button'

interface RichItem {
  type: RichItemType
}

export interface RichItemText extends RichItem {
  type: 'text'
  message: string
}
export interface RichItemImages extends RichItem {
  type: 'images'
  images: MetaDataInterface[]
}

export interface RichItemButton extends RichItem {
  type: 'button'
  label: string
  action: {
    param: string
    type: 'link'
  }
}

export interface BubbleCSSProp {
  maxWidthOffset?: number
  my: boolean
  hasArrow?: boolean
}

export type BubbleProp = BubbleCSSProp & {
  id: string
  onClick?: (e: MouseEvent, messageId: string) => void
  onLongPress?: (
    messageId: string,
    target: LongPressReactEvents<Element>,
    context: LongPressCallbackMeta<unknown>,
  ) => void
  css?: CSSProp
}

export type TextBubbleProp = {
  message: string
  my: boolean
  parentMessage?: ParentMessageUIProp
} & BubbleProp

export type RichBubbleProp = {
  my: boolean
  blocks: (RichItemText | RichItemImages | RichItemButton)[]
  cloudinaryName: string
  mediaUrlBase: string
  onImageClick?: (imageInfos: MetaDataInterface[]) => void
  onButtonClickBeforeRouting?: () => void
  textItemStyle?: CSSProp
  imageItemStyle?: CSSProp
  buttonItemStyle?: CSSProp
} & BubbleProp

export interface ImageBubbleProp {
  images: MetaDataInterface[]
  appUrlScheme?: string
  onClick?: (
    e: MouseEvent,
    images: MetaDataInterface[],
    clickedImageIndex?: number,
  ) => void
  onLongPress?: () => void
}

export type ProductBubbleProp = {
  my: boolean
  product: ProductItem
} & BubbleProp

export type BlindedBubbleProp = {
  my: boolean
  alternativeText?: string
  textColor?: string
} & BubbleProp

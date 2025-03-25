import { MouseEvent } from 'react'
import { LongPressCallbackMeta, LongPressReactEvents } from 'use-long-press'
import { CSSProp } from 'styled-components'

import { MetaDataInterface } from '../types/image'
import { ProductItem, RichItem } from '../types/message'

import { ParentMessageUIProp } from './parent'

export interface BubbleCSSProp {
  maxWidthOffset?: number
  my: boolean
  hasArrow?: boolean
  arrowRadius?: number
  borderRadius?: number
}

export type BaseBubbleProp = BubbleCSSProp & {
  id: string
  onClick?: (e: MouseEvent, messageId: string) => void
  onLongPress?: (
    messageId: string,
    target: LongPressReactEvents<Element>,
    context: LongPressCallbackMeta<unknown>,
  ) => void
  css?: CSSProp
}

export type BubbleProp = BaseBubbleProp & {
  parentMessage?: ParentMessageUIProp
}

export type TextBubbleProp = {
  message: string
  my: boolean
  parentMessage?: ParentMessageUIProp
  created?: boolean
  fullTextViewAvailable?: boolean
  onOpenMenu?: () => void
  isFullTextViewOpen?: (id: string) => boolean
  openFullTextView?: (id: string) => void
  closeFullTextView?: () => void
  onParentMessageClick?: (id: string) => void
  onLinkClick?: (href: string) => void
} & BubbleProp

export type RichBubbleProp = {
  my: boolean
  blocks: RichItem[]
  cloudinaryName: string
  mediaUrlBase: string
  onImageClick?: (imageInfos: MetaDataInterface[]) => void
  onButtonClickBeforeRouting?: () => void
  textItemStyle?: CSSProp
  imageItemStyle?: CSSProp
  buttonItemStyle?: CSSProp
} & BubbleProp

export interface ImageBubbleProp {
  id: string
  images: MetaDataInterface[]
  onClick?: (
    e: MouseEvent,
    images: MetaDataInterface[],
    clickedImageIndex?: number,
  ) => void
  onLongPress?: (
    messageId: string,
    target: LongPressReactEvents<Element>,
    context: LongPressCallbackMeta<unknown>,
  ) => void
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

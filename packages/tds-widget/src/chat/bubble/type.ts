import { ComponentType, MouseEvent, PropsWithChildren } from 'react'
import { LongPressCallbackMeta, LongPressReactEvents } from 'use-long-press'
import { CSSProp } from 'styled-components'

import { CouponItem, ProductItem, RichItem, MetaDataInterface } from '../types'

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
  /**
   * TextBubble의 내용을 감싸는 컴포넌트로, 커스텀한 전체보기 동작을 위해 사용합니다.
   * CustomFullTextViewController 제공되는 경우, fullTextViewAvailable, openFullTextView, closeFullTextView, isFullTextViewOpen, onOpenMenu은 무시됩니다.
   */
  CustomFullTextViewController?: ComponentType<
    PropsWithChildren<{ my: boolean; id: string }>
  >
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

export interface CouponBubbleProp {
  id: string
  coupon: CouponItem
  onDownloadClick?: (coupon: CouponItem) => void
}

export type BlindedBubbleProp = {
  my: boolean
  alternativeText?: string
  textColor?: CSSProp
} & BubbleProp

export type ButtonBubbleProp = {
  my: boolean
  label: string
  action: {
    param: string
    type: 'link'
  }
  onLinkClick?: (href: string) => void
} & BubbleProp

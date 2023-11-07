import { MouseEvent } from 'react'
import { LongPressCallbackMeta, LongPressReactEvents } from 'use-long-press'
import { CSSProp } from 'styled-components'

import {
  ButtonPayload,
  ImagePayload,
  MetaDataInterface,
  ProductItem,
  TextPayload,
} from '../types'

interface BubbleCSSProp {
  maxWidthOffset?: number
  my: boolean
  hasArrow?: boolean
}
export type BubbleProp = BubbleCSSProp & {
  id: string
  onClick?: (messageId: string, e: MouseEvent) => void
  onLongPress?: (
    messageId: string,
    target: LongPressReactEvents<Element>,
    context: LongPressCallbackMeta<unknown>,
  ) => void
}

export type TextBubbleProp = {
  text: string
  my: boolean
} & BubbleProp

export type RichBubbleProp = {
  my: boolean
  items: (TextPayload | ImagePayload | ButtonPayload)[]
  cloudinaryName: string
  mediaUrlBase: string
  onImageClick?: (imageInfos: MetaDataInterface[]) => void
  textItemStyle?: CSSProp
  imageItemStyle?: CSSProp
  buttonItemStyle?: CSSProp
} & BubbleProp

export interface ImageBubbleProp {
  images: MetaDataInterface[]
  onClick?: (
    e: MouseEvent,
    images: MetaDataInterface[],
    clickedImageIndex?: number,
  ) => void
  onLongPress?: () => void
}

export type ProductBubbleProps = {
  my: boolean
  product: ProductItem
} & BubbleProp

export type BlindedBubbleProp = {
  my: boolean
  blindedText?: string
} & BubbleProp

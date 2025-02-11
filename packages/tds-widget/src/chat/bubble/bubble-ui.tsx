import { CSSProp } from 'styled-components'

import { TextBubble } from './text'
import { ImageBubble } from './image'
import { RichBubble } from './rich'
import {
  BubbleProp,
  ImageBubbleProp,
  ProductBubbleProp,
  RichBubbleProp,
  TextBubbleProp,
} from './type'
import { ProductBubble } from './product'
import AlteredBubble from './altered'
import { ALTERNATIVE_TEXT_MESSAGE } from './constants'
import { ParentMessageUIProp } from './parent/parent-ui'

export const BubbleTypeArray = ['text', 'images', 'rich', 'product'] as const

export type BubbleType = (typeof BubbleTypeArray)[number]

interface BubbleUIPropBase {
  type: BubbleType
  parentMessage?: ParentMessageUIProp | null
}

export interface TextBubbleUIProp extends BubbleUIPropBase {
  type: 'text'
  value: Pick<TextBubbleProp, 'message'>
}

export interface ImageBubbleUIProp extends BubbleUIPropBase {
  type: 'images'
  value: Pick<ImageBubbleProp, 'images'>
}

export interface RichBubbleUIProp extends BubbleUIPropBase {
  type: 'rich'
  value: Pick<RichBubbleProp, 'blocks'>
}

export interface ProductBubbleUIProp extends BubbleUIPropBase {
  type: 'product'
  value: Pick<ProductBubbleProp, 'product'>
}

export type BubbleUIProps = (
  | TextBubbleUIProp
  | ImageBubbleUIProp
  | RichBubbleUIProp
  | ProductBubbleUIProp
) & {
  id: string
  my: boolean
  created?: boolean
  blinded?: boolean
  deleted?: boolean
  unfriended?: boolean
  alternativeText?: string
  parentMessage?: ParentMessageUIProp
  onBubbleClick?: BubbleProp['onClick']
  onImageBubbleClick?: ImageBubbleProp['onClick']
  onBubbleLongPress?: BubbleProp['onLongPress']
  onImageBubbleLongPress?: ImageBubbleProp['onLongPress']
  onRichBubbleBlockClick?: {
    image?: RichBubbleProp['onImageClick']
    beforeButtonRouting?: RichBubbleProp['onButtonClickBeforeRouting']
  }
  richBubbleStyle?: {
    textItemStyle?: CSSProp
    imageItemStyle?: CSSProp
    buttonItemStyle?: CSSProp
  }
  maxWidthOffset?: BubbleProp['maxWidthOffset']
  cloudinaryName?: string
  mediaUrlBase?: string
  appUrlScheme?: string
  hasArrow?: boolean
  alteredTextColor?: string
  fullTextViewAvailable?: boolean
  onOpenMenu?: () => void
}

export default function BubbleUI({
  type,
  value,
  id,
  my,
  created,
  blinded,
  deleted,
  unfriended,
  alternativeText,
  onBubbleClick,
  onImageBubbleClick,
  onBubbleLongPress,
  onImageBubbleLongPress,
  onRichBubbleBlockClick,
  richBubbleStyle,
  maxWidthOffset,
  cloudinaryName,
  mediaUrlBase,
  appUrlScheme,
  hasArrow,
  alteredTextColor,
  fullTextViewAvailable = false,
  onOpenMenu,
  ...props
}: BubbleUIProps) {
  if (blinded || deleted || unfriended) {
    return (
      <AlteredBubble
        id={id}
        my={my}
        alternativeText={
          alternativeText ||
          (unfriended
            ? ALTERNATIVE_TEXT_MESSAGE.unfriended
            : blinded
              ? ALTERNATIVE_TEXT_MESSAGE.blinded
              : ALTERNATIVE_TEXT_MESSAGE.deleted)
        }
        textColor={alteredTextColor}
        hasArrow={hasArrow}
        {...props}
      />
    )
  }
  switch (type) {
    case 'text':
      return (
        <TextBubble
          id={id}
          my={my}
          message={value.message}
          created={created}
          onClick={onBubbleClick}
          onLongPress={onBubbleLongPress}
          onOpenMenu={onOpenMenu}
          hasArrow={hasArrow}
          fullTextViewAvailable={fullTextViewAvailable}
          {...props}
        />
      )
    case 'images':
      return (
        <ImageBubble
          id={id}
          images={value.images}
          appUrlScheme={appUrlScheme}
          onClick={onImageBubbleClick}
          onLongPress={onImageBubbleLongPress}
          {...props}
        />
      )
    case 'rich':
      if (!cloudinaryName || !mediaUrlBase) {
        throw new Error('cloudinaryName 또는 mediaUrlBase가 존재하지 않습니다.')
      }
      return (
        <RichBubble
          id={id}
          my={my}
          blocks={value.blocks}
          cloudinaryName={cloudinaryName}
          mediaUrlBase={mediaUrlBase}
          onClick={onBubbleClick}
          onLongPress={onBubbleLongPress}
          onImageClick={onRichBubbleBlockClick?.image}
          onButtonClickBeforeRouting={
            onRichBubbleBlockClick?.beforeButtonRouting
          }
          buttonItemStyle={richBubbleStyle?.buttonItemStyle}
          imageItemStyle={richBubbleStyle?.imageItemStyle}
          textItemStyle={richBubbleStyle?.textItemStyle}
          hasArrow={hasArrow}
          maxWidthOffset={maxWidthOffset}
          {...props}
        />
      )
    case 'product':
      return (
        <ProductBubble
          id={id}
          my={my}
          product={value.product}
          onClick={onBubbleClick}
          onLongPress={onBubbleLongPress}
          maxWidthOffset={maxWidthOffset}
          hasArrow={hasArrow}
          {...props}
        />
      )
    default:
      throw new Error('지원하지 않는 메시지 타입입니다.')
  }
}

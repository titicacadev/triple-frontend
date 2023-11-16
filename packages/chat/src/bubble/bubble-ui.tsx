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

export type BubbleType = 'text' | 'images' | 'rich' | 'product'

const ALTERNATIVE_TEXT_MESSAGE = {
  blinded: '관리자에 의해 삭제된 메세지입니다.',
  deleted: '삭제된 메세지입니다.',
  unfriended: '차단한 사용자의 메세지입니다.',
}

interface BubbleUIPropBase {
  type: BubbleType
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
  blinded?: boolean
  deleted?: boolean
  unfriended?: boolean
  alternativeText?: string
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
  hasArrow?: boolean
  css?: CSSProp
}

export default function BubbleUI({
  type,
  value,
  id,
  my,
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
  hasArrow,
  css,
}: BubbleUIProps) {
  if (blinded || deleted || unfriended) {
    return (
      <AlteredBubble
        id={id}
        my={my}
        alternativeText={
          alternativeText || unfriended
            ? ALTERNATIVE_TEXT_MESSAGE.unfriended
            : blinded
            ? ALTERNATIVE_TEXT_MESSAGE.blinded
            : ALTERNATIVE_TEXT_MESSAGE.deleted
        }
        hasArrow={hasArrow}
        css={css}
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
          onClick={onBubbleClick}
          onLongPress={onBubbleLongPress}
          hasArrow={hasArrow}
          css={css}
        />
      )
    case 'images':
      return (
        <ImageBubble
          images={value.images}
          onClick={onImageBubbleClick}
          onLongPress={onImageBubbleLongPress}
          css={css}
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
          css={css}
        />
      )
    //   case MessageType.DELETED:
    //     return <DeletedBubble />
    default:
      throw new Error('지원하지 않는 메시지 타입입니다.')
  }
}

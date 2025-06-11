import { CSSProp } from 'styled-components'

import { TextBubble } from './text'
import { ImageBubble } from './image'
import { RichBubble } from './rich'
import {
  BubbleProp,
  ButtonBubbleProp,
  CouponBubbleProp,
  ImageBubbleProp,
  ProductBubbleProp,
  RichBubbleProp,
  TextBubbleProp,
} from './type'
import { ProductBubble } from './product'
import AlteredBubble from './altered'
import { ALTERNATIVE_TEXT_MESSAGE } from './constants'
import { ParentMessageUIProp } from './parent'
import { ButtonBubble } from './button'
import NolBubbleUI, {
  isNolBubbleType,
  NolBubbleTypeArray,
  NolBubbleUIProps,
} from './nol/bubble-ui'

export const BubbleTypeArray = [
  'text',
  'images',
  'rich',
  'product',
  'button',
  ...NolBubbleTypeArray,
] as const

export const CompositeBubbleTypeArray = ['rich', 'coupon'] as const

export type BubbleType = (typeof BubbleTypeArray)[number]
export type CompositeBubbleType = (typeof CompositeBubbleTypeArray)[number]

export interface BubbleUIPropBase {
  type: BubbleType
  parentMessage?: ParentMessageUIProp | null
}

type CompositeBubbleUIPropBase = Omit<BubbleUIPropBase, 'type'> & {
  type: CompositeBubbleType
}

export interface TextBubbleUIProp extends BubbleUIPropBase {
  type: 'text'
  value: Pick<TextBubbleProp, 'message'>
}

export interface ImageBubbleUIProp extends BubbleUIPropBase {
  type: 'images'
  value: Pick<ImageBubbleProp, 'images'>
}

export interface RichBubbleUIProp
  extends BubbleUIPropBase,
    CompositeBubbleUIPropBase {
  type: 'rich'
  value: Pick<RichBubbleProp, 'blocks'>
}

export interface ProductBubbleUIProp extends BubbleUIPropBase {
  type: 'product'
  value: Pick<ProductBubbleProp, 'product'>
}

export interface ButtonBubbleUIProp extends BubbleUIPropBase {
  type: 'button'
  value: Pick<ButtonBubbleProp, 'label' | 'action'>
}

export interface CouponBubbleUIProp extends CompositeBubbleUIPropBase {
  type: 'coupon'
  value: Pick<CouponBubbleProp, 'coupon'>
}

export type BubbleUIProps = (
  | TextBubbleUIProp
  | ImageBubbleUIProp
  | RichBubbleUIProp
  | ProductBubbleUIProp
  | ButtonBubbleUIProp
  | NolBubbleUIProps
) & {
  id: string
  my: boolean
  created?: boolean
  blinded?: boolean
  deleted?: boolean
  unfriended?: boolean
  alternativeText?: string
  parentMessage?: ParentMessageUIProp
  onParentMessageClick?: TextBubbleProp['onParentMessageClick']
  onBubbleClick?: BubbleProp['onClick']
  onImageBubbleClick?: ImageBubbleProp['onClick']
  /**
   * a 링크 클릭 동작으로, 정의되지 않은 경우 새창으로 열립니다.
   */
  onTextBubbleLinkClick?: TextBubbleProp['onLinkClick']
  onBubbleLongPress?: BubbleProp['onLongPress']
  onImageBubbleLongPress?: ImageBubbleProp['onLongPress']
  onRichBubbleBlockClick?: {
    image?: RichBubbleProp['onImageClick']
    beforeButtonRouting?: RichBubbleProp['onButtonClickBeforeRouting']
  }
  onCouponBubbleClick?: CouponBubbleProp['onClick']
  richBubbleStyle?: {
    textItemStyle?: CSSProp
    imageItemStyle?: CSSProp
    buttonItemStyle?: CSSProp
  }
  maxWidthOffset?: BubbleProp['maxWidthOffset']
  maxWidth?: BubbleProp['maxWidth']
  cloudinaryName?: string
  mediaUrlBase?: string
  hasArrow?: boolean
  alteredTextColor?: string
  arrowRadius?: number
  borderRadius?: number

  onOpenMenu?: () => void
} & Pick<
    TextBubbleProp,
    | 'fullTextViewAvailable'
    | 'isFullTextViewOpen'
    | 'openFullTextView'
    | 'closeFullTextView'
    | 'CustomFullTextViewController'
  >

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
  onTextBubbleLinkClick,
  onBubbleLongPress,
  onImageBubbleLongPress,
  onRichBubbleBlockClick,
  onCouponBubbleClick,
  onParentMessageClick,
  richBubbleStyle,
  maxWidthOffset,
  cloudinaryName,
  mediaUrlBase,
  hasArrow,
  alteredTextColor,
  fullTextViewAvailable = false,
  isFullTextViewOpen,
  openFullTextView,
  closeFullTextView,
  onOpenMenu,
  CustomFullTextViewController,
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
  if (isNolBubbleType(type)) {
    return (
      <NolBubbleUI
        id={id}
        my={my}
        type={type}
        value={value as NolBubbleUIProps['value']}
        onCouponBubbleClick={onCouponBubbleClick}
        {...props}
      />
    )
  }
  switch (type) {
    case 'button':
      if (value.action.type !== 'link') {
        throw new Error(
          '버튼 액션 타입이 link가 아닙니다. 현재 지원하지 않습니다.',
        )
      }
      return (
        <ButtonBubble
          id={id}
          my={my}
          label={value.label}
          action={value.action}
          onClick={onBubbleClick}
          onLinkClick={onTextBubbleLinkClick}
          onLongPress={onBubbleLongPress}
          hasArrow={hasArrow}
          maxWidthOffset={maxWidthOffset}
          {...props}
        />
      )
    case 'text':
      return (
        <TextBubble
          id={id}
          my={my}
          message={value.message}
          created={created}
          onClick={onBubbleClick}
          onLinkClick={onTextBubbleLinkClick}
          onLongPress={onBubbleLongPress}
          onOpenMenu={onOpenMenu}
          hasArrow={hasArrow}
          fullTextViewAvailable={fullTextViewAvailable}
          isFullTextViewOpen={isFullTextViewOpen}
          openFullTextView={openFullTextView}
          closeFullTextView={closeFullTextView}
          onParentMessageClick={onParentMessageClick}
          CustomFullTextViewController={CustomFullTextViewController}
          maxWidthOffset={maxWidthOffset}
          {...props}
        />
      )
    case 'images':
      return (
        <ImageBubble
          id={id}
          images={value.images}
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

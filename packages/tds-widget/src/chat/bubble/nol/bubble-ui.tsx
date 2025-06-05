import { CouponBubbleProp } from '../type'
import { BubbleUIPropBase, BubbleUIProps } from '../bubble-ui'

import { NolCouponButtonBubble, NolCouponContentBubble } from './coupon'

export const NolBubbleTypeArray = [
  'nol-coupon-content',
  'nol-coupon-button',
] as const

export type NolBubbleType = (typeof NolBubbleTypeArray)[number]

export interface NolCouponContentBubbleUIProp extends BubbleUIPropBase {
  type: 'nol-coupon-content'
  value: Pick<CouponBubbleProp, 'coupon'>
}

export interface NolCouponButtonBubbleUIProp extends BubbleUIPropBase {
  type: 'nol-coupon-button'
  value: Pick<CouponBubbleProp, 'coupon'>
}

export type NolBubbleUIProps =
  | NolCouponContentBubbleUIProp
  | NolCouponButtonBubbleUIProp

export function isNolBubbleType(type: string): type is NolBubbleType {
  return NolBubbleTypeArray.includes(type as NolBubbleType)
}

export default function NolBubbleUI({
  type,
  value,
  id,
  my,
  onCouponBubbleClick,
  ...props
}: BubbleUIProps) {
  switch (type) {
    case 'nol-coupon-content':
      return (
        <NolCouponContentBubble
          id={id}
          my={my}
          coupon={value.coupon}
          onClick={onCouponBubbleClick}
          {...props}
        />
      )
    case 'nol-coupon-button':
      return (
        <NolCouponButtonBubble
          id={id}
          my={my}
          coupon={value.coupon}
          onClick={onCouponBubbleClick}
          {...props}
        />
      )
    default:
      throw new Error('지원하지 않는 메시지 타입입니다.')
  }
}

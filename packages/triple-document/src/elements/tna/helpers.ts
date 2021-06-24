import { formatNumber, convertPrice } from '@titicaca/view-utilities'

import { DiscountPolicy, TnaCoupon } from './types'

export function generateCoupon({
  applicableCoupon,
  expectedApplicableCoupon,
}: {
  applicableCoupon?: TnaCoupon
  expectedApplicableCoupon?: TnaCoupon
}) {
  const {
    discountPolicy: applicableCouponDiscountPolicy,
    amountAfterUsingCoupon: applicableAmountAfterUsingCoupon,
  } = applicableCoupon || {}

  const hasCoupon = !!applicableCoupon || !!expectedApplicableCoupon
  const hasOnlyExpectedApplicableCoupon =
    !applicableCoupon && !!expectedApplicableCoupon
  const displayDiscountPolicy =
    applicableCouponDiscountPolicy &&
    getDiscountPolicy(applicableCouponDiscountPolicy)
  const displayPricePolicy =
    applicableCoupon && `${formatNumber(applicableAmountAfterUsingCoupon)}원`

  return {
    hasCoupon,
    hasOnlyExpectedApplicableCoupon,
    displayDiscountPolicy,
    displayPricePolicy,
  }
}

export function getDiscountPolicy(discountPolicy: DiscountPolicy) {
  const { type, value } = discountPolicy

  switch (type) {
    case 'RATE':
      return `${value}%`
    case 'AMOUNT':
      return `${convertPrice(value)}`
  }
}

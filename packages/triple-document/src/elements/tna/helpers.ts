import { formatNumber } from '@titicaca/view-utilities'

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

export function convertPriceInThousands(price: number) {
  if (Math.floor(price / 1000) === 0) {
    return '원'
  } else {
    return ` ${Math.floor(price / 1000)}천원`
  }
}

/** price 에 100원 단위의 값이 존재할 때는 숫자를 풀어서 사용한다. e.g.) 1,100원, 100,100원
 *  100원 단위가 없을 경우에는 첫자리는 숫자로 처리하고, 단위는 한글로 처리한다. e.g.) 4,000 → 4천원, 110,000 → 11만원
 *  https://titicaca.atlassian.net/wiki/spaces/BUS/pages/2193129588#%2B%EA%B0%80%EA%B2%A9-%ED%91%9C%EC%8B%9C-%EC%A0%95%EB%B3%B4
 * */
export function convertPrice(price: number) {
  switch (true) {
    case price % 1000 !== 0 || price < 1000:
      return `${formatNumber(price)}원`

    case price < 10000:
      return convertPriceInThousands(price)

    case price < 10000000:
      return `${Math.floor(price / 10000)}만${convertPriceInThousands(
        price % 10000,
      )}`

    default: {
      return '최대 금액 초과'
    }
  }
}

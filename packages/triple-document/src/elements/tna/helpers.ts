import { getTranslation } from '@titicaca/next-i18next'
import { formatNumber } from '@titicaca/view-utilities'

import { TnaCoupon } from './types'

export function generateCoupon({
  applicableCoupon,
  expectedApplicableCoupon,
}: {
  applicableCoupon?: TnaCoupon
  expectedApplicableCoupon?: TnaCoupon
}) {
  const { amountAfterUsingCoupon: applicableAmountAfterUsingCoupon } =
    applicableCoupon || {}

  const hasCoupon = !!applicableCoupon || !!expectedApplicableCoupon
  const hasOnlyExpectedApplicableCoupon =
    !applicableCoupon && !!expectedApplicableCoupon
  const hasAmountAfterUsingCouponPrice =
    applicableAmountAfterUsingCoupon && applicableAmountAfterUsingCoupon > 0

  const formattedApplicableAmountAfterUsingCoupon = formatNumber(
    applicableAmountAfterUsingCoupon,
  )

  let displayPricePolicy: string | undefined
  if (applicableCoupon) {
    try {
      const t = getTranslation('common-web')
      displayPricePolicy = t(
        [
          'formattedapplicableamountafterusingcoupon-weon',
          '{{formattedApplicableAmountAfterUsingCoupon}}원',
        ],
        {
          formattedApplicableAmountAfterUsingCoupon,
        },
      )
    } catch (error) {
      // i18n이 초기화되지 않은 경우 (예: Storybook) 기본값 사용
      displayPricePolicy = `${formattedApplicableAmountAfterUsingCoupon}원`
    }
  }

  return {
    hasCoupon,
    hasOnlyExpectedApplicableCoupon,
    hasAmountAfterUsingCouponPrice,
    displayPricePolicy,
  }
}

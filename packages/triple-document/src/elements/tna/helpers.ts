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
  const t = getTranslation('common-web')

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
  const displayPricePolicy =
    applicableCoupon &&
    t('formattedapplicableamountafterusingcoupon-weon', {
      formattedApplicableAmountAfterUsingCoupon,
    })

  return {
    hasCoupon,
    hasOnlyExpectedApplicableCoupon,
    hasAmountAfterUsingCouponPrice,
    displayPricePolicy,
  }
}

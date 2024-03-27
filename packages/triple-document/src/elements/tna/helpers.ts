import { formatNumber } from '@titicaca/view-utilities'
import { t } from 'i18next'

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
  const displayPricePolicy =
    applicableCoupon &&
    t('{{formattedApplicableAmountAfterUsingCoupon}}원', {
      formattedApplicableAmountAfterUsingCoupon,
      ns: 'triple-frontend',
    })

  return {
    hasCoupon,
    hasOnlyExpectedApplicableCoupon,
    hasAmountAfterUsingCouponPrice,
    displayPricePolicy,
  }
}

import { formatNumber } from '@titicaca/view-utilities'
import { useTranslation } from '@titicaca/triple-web'

import { TnaCoupon } from './types'

export function useGenerateCoupon({
  applicableCoupon,
  expectedApplicableCoupon,
}: {
  applicableCoupon?: TnaCoupon
  expectedApplicableCoupon?: TnaCoupon
}) {
  const t = useTranslation()

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
    })

  return {
    hasCoupon,
    hasOnlyExpectedApplicableCoupon,
    hasAmountAfterUsingCouponPrice,
    displayPricePolicy,
  }
}

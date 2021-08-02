import React from 'react'
import { Container, Text, MarginPadding } from '@titicaca/core-elements'

export function PricePolicyCouponInfo({
  hasOnlyExpectedApplicableCoupon,
  hasAmountAfterUsingCouponPrice,
  displayPricePolicy,
  margin,
}: {
  hasOnlyExpectedApplicableCoupon?: boolean
  hasAmountAfterUsingCouponPrice?: boolean | 0
  displayPricePolicy?: string
  margin?: MarginPadding
}) {
  return (
    <>
      <Container margin={margin || { top: 4 }}>
        {hasOnlyExpectedApplicableCoupon ? (
          <>
            <Text bold inlineBlock size="tiny" color="mint">
              쿠폰할인
            </Text>
            <Text
              bold
              inlineBlock
              size="tiny"
              color="gray700"
              margin={{ left: 5 }}
            >
              가능
            </Text>
          </>
        ) : hasAmountAfterUsingCouponPrice ? (
          <>
            <Text bold inlineBlock size="tiny" color="gray700">
              쿠폰할인가
            </Text>
            <Text
              bold
              inlineBlock
              size="tiny"
              color="mint"
              margin={{ left: 5 }}
            >
              {displayPricePolicy}
            </Text>
          </>
        ) : (
          <>
            <Text bold inlineBlock size="tiny" color="gray700">
              쿠폰적용시
            </Text>
            <Text
              bold
              inlineBlock
              size="tiny"
              color="mint"
              margin={{ left: 5 }}
            >
              무료
            </Text>
          </>
        )}
      </Container>
    </>
  )
}

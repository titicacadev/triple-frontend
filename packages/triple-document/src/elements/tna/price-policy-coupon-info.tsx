import { Container, Text } from '@titicaca/core-elements'
import { CSSProps } from '@titicaca/core-elements/lib/css'
import { css } from 'styled-components'

export function PricePolicyCouponInfo({
  emphasisColor = 'mint',
  hasOnlyExpectedApplicableCoupon,
  hasAmountAfterUsingCouponPrice,
  displayPricePolicy,
  css: cssProp,
}: {
  emphasisColor?: Parameters<typeof Text>[0]['color']
  hasOnlyExpectedApplicableCoupon?: boolean
  hasAmountAfterUsingCouponPrice?: boolean | 0
  displayPricePolicy?: string
} & CSSProps) {
  return (
    <Container
      css={css(
        {
          marginTop: 4,
        },
        cssProp,
      )}
    >
      {hasOnlyExpectedApplicableCoupon ? (
        <>
          <Text bold inlineBlock size="tiny" color={emphasisColor}>
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
            color={emphasisColor}
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
            color={emphasisColor}
            margin={{ left: 5 }}
          >
            무료
          </Text>
        </>
      )}
    </Container>
  )
}

import { Container, Text } from '@titicaca/core-elements'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  margin-top: 4px;
`

export function PricePolicyCouponInfo({
  emphasisColor = 'mint',
  hasOnlyExpectedApplicableCoupon,
  hasAmountAfterUsingCouponPrice,
  displayPricePolicy,
  ...props
}: {
  emphasisColor?: Parameters<typeof Text>[0]['color']
  hasOnlyExpectedApplicableCoupon?: boolean
  hasAmountAfterUsingCouponPrice?: boolean | 0
  displayPricePolicy?: string
}) {
  return (
    <StyledContainer {...props}>
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
    </StyledContainer>
  )
}

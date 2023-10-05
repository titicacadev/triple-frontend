import { Container, Text } from '@titicaca/core-elements'
import styled from 'styled-components'
import { useTranslation } from '@titicaca/next-i18next'

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
  const { t } = useTranslation('common-web')

  return (
    <StyledContainer {...props}>
      {hasOnlyExpectedApplicableCoupon ? (
        <>
          <Text bold inlineBlock size="tiny" color={emphasisColor}>
            {t(['kuponhalin', '쿠폰할인'])}
          </Text>
          <Text
            bold
            inlineBlock
            size="tiny"
            color="gray700"
            margin={{ left: 5 }}
          >
            {t(['ganeung', '가능'])}
          </Text>
        </>
      ) : hasAmountAfterUsingCouponPrice ? (
        <>
          <Text bold inlineBlock size="tiny" color="gray700">
            {t(['kuponhalinga', '쿠폰할인가'])}
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
            {t(['kuponjeogyongsi', '쿠폰적용시'])}
          </Text>
          <Text
            bold
            inlineBlock
            size="tiny"
            color={emphasisColor}
            margin={{ left: 5 }}
          >
            {t(['muryo', '무료'])}
          </Text>
        </>
      )}
    </StyledContainer>
  )
}

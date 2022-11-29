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
            {t('kuponhalin')}
          </Text>
          <Text
            bold
            inlineBlock
            size="tiny"
            color="gray700"
            margin={{ left: 5 }}
          >
            {t('ganeung')}
          </Text>
        </>
      ) : hasAmountAfterUsingCouponPrice ? (
        <>
          <Text bold inlineBlock size="tiny" color="gray700">
            {t('kuponhalinga')}
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
            {t('kuponjeogyongsi')}
          </Text>
          <Text
            bold
            inlineBlock
            size="tiny"
            color={emphasisColor}
            margin={{ left: 5 }}
          >
            {t('muryo')}
          </Text>
        </>
      )}
    </StyledContainer>
  )
}

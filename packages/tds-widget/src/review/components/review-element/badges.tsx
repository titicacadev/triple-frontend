import { FlexBox, Text } from '@titicaca/tds-ui'
import { useTranslation } from 'react-i18next'

export function ReviewBadges({
  recentTrip,
  verifiedPurchase,
}: {
  recentTrip: boolean
  verifiedPurchase: boolean
}) {
  return recentTrip || verifiedPurchase ? (
    <FlexBox flex gap="5px" css={{ marginBottom: 6 }}>
      {recentTrip ? <RecentTripBadge /> : null}
      {verifiedPurchase ? <VerifiedPurchaseBadge /> : null}
    </FlexBox>
  ) : null
}

export function RecentTripBadge() {
  const { t } = useTranslation('triple-frontend')

  return (
    <FlexBox
      flex
      gap="3px"
      css={{
        padding: '5px 7px',
        backgroundColor: 'rgba(54, 143, 255, 0.1)',
        borderRadius: 4,
      }}
    >
      <img
        width={14}
        height={14}
        src="https://assets.triple.guide/images/ico_recently_badge@4x.png"
        alt="recent-trip-icon"
      />
      <Text size={12} color="blue" bold>
        {t('최근여행')}
      </Text>
    </FlexBox>
  )
}

export function VerifiedPurchaseBadge() {
  const { t } = useTranslation('triple-frontend')

  return (
    <FlexBox
      flex
      gap="3px"
      css={{ padding: '5px 7px', backgroundColor: '#E9FAF9' }}
      borderRadius={4}
    >
      <img
        width={14}
        height={14}
        src="https://assets.triple.guide/images/ico_certified.svg"
        alt="recent-trip-icon"
      />
      <Text size={12} bold style={{ color: '#18BFC0' }}>
        {t('gumae-injeung-review')}
      </Text>
    </FlexBox>
  )
}

import { useCallback } from 'react'
import { Text, Container } from '@titicaca/core-elements'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'
import { VerificationType } from '@titicaca/user-verification'

import { useDeepLink } from '../../prop-context/deep-link'

import { CouponModal } from './modals'
import {
  CouponDownloadButton,
  CouponGroupDownloadButton,
} from './coupon-download-buttons'

export default function Coupon({
  value: {
    identifier,
    description,
    verificationType,
    couponType = 'single',
    enabledAt,
  },
}: {
  value: {
    identifier: string
    description: string
    verificationType?: VerificationType
    couponType?: 'single' | 'group'
    enabledAt?: string
  }
}) {
  const trackEventWithMetadata = useEventTrackerWithMetadata()

  const deepLink = useDeepLink()

  const handleCouponClick = useCallback(() => {
    trackEventWithMetadata({
      fa: {
        action: '쿠폰받기선택',
        coupon_id: identifier,
        coupon_type: couponType,
      },
    })
  }, [couponType, identifier, trackEventWithMetadata])

  if (!deepLink) {
    // TODO: triple-document 에러 처리 방법 설계
    return null
  }

  return (
    <Container
      css={{
        margin: '44px 30px 42px',
      }}
    >
      {couponType === 'single' ? (
        <CouponDownloadButton
          verificationType={verificationType}
          slugId={identifier}
          enabledAt={enabledAt}
          onClick={handleCouponClick}
        />
      ) : (
        <CouponGroupDownloadButton
          verificationType={verificationType}
          groupId={identifier}
          enabledAt={enabledAt}
          onClick={handleCouponClick}
        />
      )}

      {description ? (
        <Text
          color="gray"
          alpha={0.5}
          margin={{ top: 13 }}
          lineHeight={1.46}
          size="tiny"
        >
          {description}
        </Text>
      ) : null}

      <CouponModal identifier={identifier} />
    </Container>
  )
}

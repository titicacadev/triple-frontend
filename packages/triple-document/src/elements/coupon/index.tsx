import React, { useCallback } from 'react'
import { Text, Container } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import { VerificationType } from '@titicaca/user-verification'

import { useDeepLink } from '../../prop-context/deep-link'
import { useEventMetaData } from '../../prop-context/event-meta-data'

import { CouponModal, CouponTransitionModal } from './modals'
import {
  InAppCouponDownloadButton,
  InAppCouponGroupDownloadButton,
  PublicCouponDownloadButton,
} from './coupon-download-buttons'

export default function Coupon({
  value: { identifier, description, verificationType, couponType = 'single' },
}: {
  value: {
    identifier: string
    description: string
    verificationType?: VerificationType
    couponType?: 'single' | 'group'
  }
}) {
  const { isPublic } = useUserAgentContext()
  const { trackEvent } = useEventTrackingContext()
  const eventMetaData = useEventMetaData()
  const deepLink = useDeepLink()

  const handleCouponClick = useCallback(() => {
    if (eventMetaData) {
      trackEvent({
        fa: {
          action: '쿠폰받기선택',
          coupon_id: identifier,
          coupon_type: couponType,
        },
      })
    }
  }, [couponType, eventMetaData, identifier, trackEvent])

  if (!deepLink) {
    // TODO: triple-document 에러 처리 방법 설계
    return null
  }

  return (
    <Container margin={{ top: 44, right: 30, left: 30, bottom: 42 }}>
      {isPublic ? (
        <PublicCouponDownloadButton />
      ) : couponType === 'single' ? (
        <InAppCouponDownloadButton
          verificationType={verificationType}
          slugId={identifier}
          onClick={handleCouponClick}
        />
      ) : (
        <InAppCouponGroupDownloadButton
          verificationType={verificationType}
          groupId={identifier}
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
      <CouponTransitionModal deepLink={deepLink} />
    </Container>
  )
}

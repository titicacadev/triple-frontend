import React from 'react'
import { Text, Container } from '@titicaca/core-elements'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { VerificationType } from '@titicaca/user-verification'

import { useDeepLink } from '../../prop-context/deep-link'
import useCommonEventTracker, {
  EventTypeEnum,
  EventMetaData,
} from '../../use-event-tracker'

import { CouponModal, CouponTransitionModal } from './modals'
import {
  InAppCouponDownloadButton,
  InAppCouponGroupDownloadButton,
  PublicCouponDownloadButton,
} from './coupon-download-buttons'

export default function Coupon({
  value: { identifier, description, verificationType, couponType = 'single' },
  type,
  eventMetaData,
}: {
  value: {
    identifier: string
    description: string
    verificationType?: VerificationType
    couponType?: 'single' | 'group'
  }
  type?: EventTypeEnum
  eventMetaData?: EventMetaData
}) {
  const { isPublic } = useUserAgentContext()
  const { trackCouponDownloadEvent } = useCommonEventTracker({ type })
  const deepLink = useDeepLink()

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
          onClick={() => {
            type &&
              eventMetaData &&
              trackCouponDownloadEvent({
                id: eventMetaData.id,
                title: eventMetaData.title,
                couponId: identifier,
                couponType,
              })
          }}
        />
      ) : (
        <InAppCouponGroupDownloadButton
          verificationType={verificationType}
          groupId={identifier}
          onClick={() => {
            type &&
              eventMetaData &&
              trackCouponDownloadEvent({
                id: eventMetaData.id,
                title: eventMetaData.title,
                couponId: identifier,
                couponType,
              })
          }}
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

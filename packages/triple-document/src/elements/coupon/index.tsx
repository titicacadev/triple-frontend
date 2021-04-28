import React from 'react'
import { Text, Container } from '@titicaca/core-elements'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { VerificationType } from '@titicaca/user-verification'

import { useDeepLink } from '../../prop-context/deep-link'

import { CouponModal, CouponTransitionModal } from './modals'
import {
  InAppCouponDownloadButton,
  InAppCouponGroupDownloadButton,
  PublicCouponDownloadButton,
} from './coupon-download-buttons'

export default function Coupon({
  value: { identifier: slugId, description, verificationType = 'single' },
}: {
  value: {
    identifier: string
    description: string
    verificationType?: VerificationType
    couponType?: 'single' | 'group'
  }
}) {
  const { isPublic } = useUserAgentContext()
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
          couponFetchDisabled={couponFetchDisabled}
          slugId={identifier}
        />
      ) : (
        <InAppCouponGroupDownloadButton
          verificationType={verificationType}
          couponFetchDisabled={couponFetchDisabled}
          groupId={identifier}
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

      <CouponModal />
      <CouponTransitionModal deepLink={deepLink} />
    </Container>
  )
}

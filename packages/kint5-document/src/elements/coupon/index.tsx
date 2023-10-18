import { useCallback } from 'react'
import { Text, Container } from '@titicaca/kint5-core-elements'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'
import { VerificationType } from '@titicaca/user-verification'

import { useDeepLink } from '../../prop-context/deep-link'

import { CouponModal } from './modals'
import {
  CouponDownloadButton,
  CouponGroupDownloadButton,
  DEFAULT_BUTTON_COLOR,
} from './coupon-download-buttons'
import { safeParseHexColor } from './utils'

const DEFAULT_COLOR = {
  buttonText: DEFAULT_BUTTON_COLOR.text,
  buttonBackground: DEFAULT_BUTTON_COLOR.background,
  description: 'var(--color-kint5-gray60)',
}

export default function Coupon({
  value: {
    identifier,
    description,
    verificationType,
    couponType = 'single',
    enabledAt,
    color = DEFAULT_COLOR,
  },
}: {
  value: {
    identifier: string
    description: string
    verificationType?: VerificationType
    couponType?: 'single' | 'group'
    enabledAt?: string
    color?: {
      background?: string
      buttonText?: string
      buttonBackground?: string
      description?: string
    }
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
        padding: '44px 16px 42px',
        backgroundColor: safeParseHexColor(color.background),
      }}
    >
      {couponType === 'single' ? (
        <CouponDownloadButton
          verificationType={verificationType}
          slugId={identifier}
          enabledAt={enabledAt}
          onClick={handleCouponClick}
          textColor={safeParseHexColor(color.buttonText)}
          backgroundColor={safeParseHexColor(color.buttonBackground)}
        />
      ) : (
        <CouponGroupDownloadButton
          verificationType={verificationType}
          groupId={identifier}
          enabledAt={enabledAt}
          onClick={handleCouponClick}
          textColor={safeParseHexColor(color.buttonText)}
          backgroundColor={safeParseHexColor(color.buttonBackground)}
        />
      )}

      {description ? (
        <Text
          css={{
            fontSize: 14,
            fontWeight: 400,
            marginTop: 16,
            color: safeParseHexColor(
              color.description || DEFAULT_COLOR.description,
            ),
          }}
        >
          {description}
        </Text>
      ) : null}

      <CouponModal identifier={identifier} />
    </Container>
  )
}

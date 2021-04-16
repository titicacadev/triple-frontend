import React, { useState, useEffect, useCallback } from 'react'
import { Text, Button, Container } from '@titicaca/core-elements'
import styled from 'styled-components'
import fetch from 'isomorphic-fetch'
import {
  useUserAgentContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { captureException } from '@sentry/browser'
import {
  useUserVerification,
  VerificationType,
} from '@titicaca/user-verification'

import { useDeepLink } from '../../prop-context/deep-link'

import {
  HASH_ALREADY_DOWNLOAD_COUPON,
  HASH_COMPLETE_DOWNLOAD_COUPON,
  HASH_ERROR_COUPON,
  HASH_COUPON_APP_TRANSITION_MODAL,
  CouponAlertModal,
  CouponModal,
  CouponTransitionModal,
} from './modals'

export default function Coupon({
  value: { identifier: slugId, description, verificationType },
}: {
  value: {
    identifier: string
    description: string
    verificationType?: VerificationType
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
      ) : (
        <InAppCouponDownloadButton
          slugId={slugId}
          verificationType={verificationType}
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

const BaseCouponDownloadButton = styled(Button)`
  border-radius: 6px;
  width: 100%;
`

function PublicCouponDownloadButton() {
  const { push } = useHistoryFunctions()

  const onDownloadButtonClick = useCallback(() => {
    push(HASH_COUPON_APP_TRANSITION_MODAL)
  }, [push])

  return (
    <BaseCouponDownloadButton onClick={onDownloadButtonClick}>
      쿠폰 받기
    </BaseCouponDownloadButton>
  )
}

function InAppCouponDownloadButton({
  slugId,
  verificationType,
}: {
  slugId: string
  verificationType?: VerificationType
}) {
  const [enabled, setEnabled] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )
  const { push } = useHistoryFunctions()
  const { verificationState, initiateVerification } = useUserVerification({
    verificationType,
    forceVerification: false,
  })

  useEffect(() => {
    async function fetchCoupon() {
      try {
        const response = await fetch(`/api/benefit/coupons/${slugId}`, {
          credentials: 'same-origin',
        })

        if (response.ok) {
          const { downloaded }: { downloaded: boolean } = await response.json()
          setEnabled(true)
          setDownloaded(downloaded)
        } else {
          captureException(
            new Error(`[${response.status}] Failed to fetch coupon`),
          )
        }
      } catch (e) {
        captureException(e)
      }
    }
    fetchCoupon()
  }, [slugId])

  const pushHashDownloaded = () => push(HASH_ALREADY_DOWNLOAD_COUPON)
  const downloadCoupon = useCallback(async () => {
    try {
      if (verificationType && !verificationState.verified) {
        initiateVerification()

        return
      }

      const response = await fetch(`/api/benefit/coupons/${slugId}/download`, {
        credentials: 'same-origin',
      })
      const {
        id,
        message,
        code,
      }: { id?: string; message: string; code?: string } = await response.json()

      if (response.ok) {
        if (id) {
          push(HASH_COMPLETE_DOWNLOAD_COUPON)
          setDownloaded(true)
        }
      } else if (code === 'NO_CI_AUTHENTICATION') {
        initiateVerification()
      } else {
        captureException(
          new Error(`[${response.status}] Failed to download coupon`),
        )
        setErrorMessage(message)
        push(HASH_ERROR_COUPON)
      }
    } catch (e) {
      captureException(e)
    }
  }, [push, slugId, initiateVerification, verificationType, verificationState])

  return (
    <>
      <BaseCouponDownloadButton
        disabled={!enabled}
        onClick={
          enabled
            ? downloaded
              ? pushHashDownloaded
              : downloadCoupon
            : undefined
        }
      >
        쿠폰 받기
      </BaseCouponDownloadButton>
      <CouponAlertModal errorMessage={errorMessage} />
    </>
  )
}

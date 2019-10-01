import React, { useState, useEffect, useCallback } from 'react'
import { Text, Button, Container } from '@titicaca/core-elements'
import styled from 'styled-components'
import fetch from 'isomorphic-fetch'
import {
  useHistoryContext,
  useUserAgentContext,
} from '@titicaca/react-contexts'
import { captureException } from '@sentry/browser'

import {
  HASH_ALREADY_DOWNLOAD_COUPON,
  HASH_COMPLETE_DOWNLOAD_COUPON,
  HASH_ERROR_COUPON,
  HASH_COUPON_APP_TRANSITION_MODAL,
  CouponAlertModal,
  CouponModal,
  CouponTransitionModal,
} from './modals'

const BaseCouponDownloadButton = styled(Button)`
  border-radius: 6px;
  width: 100%;
`

const PublicCouponDownloadButton = () => {
  const { push } = useHistoryContext()

  const onDownloadButtonClick = useCallback(() => {
    push(HASH_COUPON_APP_TRANSITION_MODAL)
  }, [push])

  return (
    <BaseCouponDownloadButton onClick={onDownloadButtonClick}>
      쿠폰 받기
    </BaseCouponDownloadButton>
  )
}

const InAppCouponDownloadButton = ({ slugId }) => {
  const [enabled, setEnabled] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const { push } = useHistoryContext()

  useEffect(() => {
    async function fetchCoupon() {
      try {
        const response = await fetch(`/api/benefit/coupons/${slugId}`)

        if (response.ok) {
          const { downloaded } = await response.json()
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
      const response = await fetch(`/api/benefit/coupons/${slugId}/download`)
      const { id, message } = await response.json()

      if (response.ok) {
        if (id) {
          push(HASH_COMPLETE_DOWNLOAD_COUPON)
          setDownloaded(true)
        }
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
  }, [push, slugId])

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

export default function Coupon({
  value: { identifier: slugId, description },
  WEB_URL_BASE,
  deepLink,
}) {
  const { isPublic } = useUserAgentContext()

  return (
    <Container margin={{ top: 44, right: 30, left: 30, bottom: 42 }}>
      {isPublic ? (
        <PublicCouponDownloadButton />
      ) : (
        <InAppCouponDownloadButton slugId={slugId} />
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

      <CouponModal WEB_URL_BASE={WEB_URL_BASE} />
      <CouponTransitionModal deepLink={deepLink} />
    </Container>
  )
}

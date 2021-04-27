import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@titicaca/core-elements'
import styled from 'styled-components'
import { useHistoryFunctions } from '@titicaca/react-contexts'
import { captureException } from '@sentry/browser'
import {
  useUserVerification,
  VerificationType,
} from '@titicaca/user-verification'
import { get, post } from '@titicaca/fetcher'

import { CouponData } from '../../types'

import {
  HASH_ALREADY_DOWNLOAD_COUPON,
  HASH_COMPLETE_DOWNLOAD_COUPON,
  HASH_ERROR_COUPON,
  HASH_COUPON_APP_TRANSITION_MODAL,
  CouponAlertModal,
  HASH_COMPLETE_DOWNLOAD_COUPON_GROUP,
  HASH_COMPLETE_DOWNLOAD_PART_OF_COUPON_GROUP,
} from './modals'

const BaseCouponDownloadButton = styled(Button)`
  border-radius: 6px;
  width: 100%;
`

export function PublicCouponDownloadButton() {
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

export function InAppCouponDownloadButton({
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
        const { ok, result, status } = await get<CouponData>(
          `/api/benefit/coupons/${slugId}`,
        )

        if (ok && result) {
          setEnabled(true)
          setDownloaded(!!result.downloaded)
        } else {
          captureException(new Error(`[${status}] Failed to fetch coupon`))
        }
      } catch (e) {
        captureException(e)
      }
    }

    fetchCoupon()
  }, [slugId])

  const pushHashDownloaded = () =>
    push(`${slugId}.${HASH_ALREADY_DOWNLOAD_COUPON}`)
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
          push(`${slugId}.${HASH_COMPLETE_DOWNLOAD_COUPON}`)
          setDownloaded(true)
        }
      } else if (code === 'NO_CI_AUTHENTICATION') {
        initiateVerification()
      } else {
        captureException(
          new Error(`[${response.status}] Failed to download coupon`),
        )
        setErrorMessage(message)
        push(`${slugId}.${HASH_ERROR_COUPON}`)
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
      <CouponAlertModal identifier={slugId} errorMessage={errorMessage} />
    </>
  )
}

export function InAppCouponGroupDownloadButton({
  groupId,
  verificationType,
}: {
  groupId: string
  verificationType?: VerificationType
}) {
  const [enabled, setEnabled] = useState(false)
  const [coupons, setCoupons] = useState<CouponData[]>([])
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )
  const { push } = useHistoryFunctions()
  const { verificationState, initiateVerification } = useUserVerification({
    verificationType,
    forceVerification: false,
  })

  const downloaded =
    coupons.length === 0 && coupons.every(({ downloaded }) => downloaded)

  const pushHashDownloaded = () =>
    push(`${groupId}.${HASH_ALREADY_DOWNLOAD_COUPON}`)

  useEffect(() => {
    async function fetchCoupons() {
      try {
        const { result, ok, status } = await get<{
          items: CouponData[]
          nextPageToken: string
        }>(`/api/benefit/downloadable-coupons?groupCode=${groupId}`)

        if (ok && result) {
          setEnabled(true)
          setCoupons(result.items)
        } else {
          captureException(new Error(`[${status}] Failed to fetch coupon`))
        }
      } catch (e) {
        captureException(e)
      }
    }

    fetchCoupons()
  }, [groupId])

  const downloadCoupons = useCallback(async () => {
    if (verificationType && !verificationState.verified) {
      initiateVerification()

      return
    }

    const { result: results, ok } = await post<
      {
        id: string
        success: boolean
        errorCode: string
        errorMessage: string
      }[]
    >('/api/benefit/coupons', {
      body: {
        ids: coupons.map(({ id }) => id),
      },
    })

    if (ok && results) {
      const succeedCoupons = results.filter(({ success }) => success).length

      if (succeedCoupons === coupons.length) {
        push(`${groupId}.${HASH_COMPLETE_DOWNLOAD_COUPON_GROUP}`)
      } else if (succeedCoupons > 0) {
        push(`${groupId}.${HASH_COMPLETE_DOWNLOAD_PART_OF_COUPON_GROUP}`)
      } else if (succeedCoupons === 0) {
        setErrorMessage(results[0].errorMessage)
        push(`${groupId}.${HASH_ERROR_COUPON}`)
      }
    }
  }, [
    coupons,
    push,
    initiateVerification,
    verificationState,
    verificationType,
    groupId,
  ])

  return (
    <>
      <BaseCouponDownloadButton
        disabled={!enabled}
        onClick={
          enabled
            ? downloaded
              ? pushHashDownloaded
              : downloadCoupons
            : undefined
        }
      >
        쿠폰 받기
      </BaseCouponDownloadButton>
      <CouponAlertModal identifier={groupId} errorMessage={errorMessage} />
    </>
  )
}

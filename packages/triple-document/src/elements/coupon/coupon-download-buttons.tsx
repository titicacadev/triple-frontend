import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@titicaca/core-elements'
import styled from 'styled-components'
import { useHistoryFunctions } from '@titicaca/react-contexts'
import {
  useUserVerification,
  VerificationType,
} from '@titicaca/user-verification'
import { authGuardedFetchers, captureHttpError } from '@titicaca/fetcher'

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

const MAX_COUPONS_PER_USER_ERROR_CODE = 'MAX_COUPONS_PER_USER'

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
  onClick,
}: {
  slugId: string
  verificationType?: VerificationType
  onClick?: () => void
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
      const response = await authGuardedFetchers.get<CouponData>(
        `/api/benefit/coupons/${slugId}`,
      )

      if (response === 'NEED_LOGIN') {
        return
      }

      captureHttpError(response)

      const { ok, result } = response

      if (ok && result) {
        setEnabled(true)
        setDownloaded(!!result.downloaded)
      }
    }

    fetchCoupon()
  }, [slugId])

  const pushHashDownloaded = () =>
    push(`${slugId}.${HASH_ALREADY_DOWNLOAD_COUPON}`)
  const downloadCoupon = useCallback(async () => {
    if (verificationType && !verificationState.verified) {
      initiateVerification()

      return
    }

    const response = await authGuardedFetchers.get<{
      id?: string
      message?: string
      code?: string
    }>(`/api/benefit/coupons/${slugId}/download`)

    if (response === 'NEED_LOGIN') {
      return
    }
    captureHttpError(response)

    const { result, ok } = response

    if (result) {
      if (ok) {
        if (result.id) {
          push(`${slugId}.${HASH_COMPLETE_DOWNLOAD_COUPON}`)
          setDownloaded(true)
        }
      } else if (result?.code === 'NO_CI_AUTHENTICATION') {
        initiateVerification()
      } else {
        setErrorMessage(result.message)
        push(`${slugId}.${HASH_ERROR_COUPON}`)
      }
    }
  }, [push, slugId, initiateVerification, verificationType, verificationState])

  const handleCouponDownloadButtonClick = () => {
    if (enabled === true) {
      if (downloaded === true) {
        pushHashDownloaded()
      } else {
        downloadCoupon()
      }
    }

    onClick && onClick()
  }

  return (
    <>
      <BaseCouponDownloadButton
        disabled={!enabled}
        onClick={handleCouponDownloadButtonClick}
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
  onClick,
}: {
  groupId: string
  verificationType?: VerificationType
  onClick?: () => void
}) {
  const [coupons, setCoupons] = useState<CouponData[]>([])
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )
  const { push } = useHistoryFunctions()
  const { verificationState, initiateVerification } = useUserVerification({
    verificationType,
    forceVerification: false,
  })

  const enabled = coupons.length > 0

  const downloaded =
    coupons.length === 0 || coupons.every(({ downloaded }) => downloaded)

  const pushHashDownloaded = () =>
    push(`${groupId}.${HASH_ALREADY_DOWNLOAD_COUPON}`)

  useEffect(() => {
    async function fetchCoupons() {
      const response = await authGuardedFetchers.get<{
        items: CouponData[]
        nextPageToken: string
      }>(`/api/benefit/downloadable-coupons?groupCode=${groupId}`)

      if (response === 'NEED_LOGIN') {
        return
      }

      captureHttpError(response)
      const { result: { items } = {} } = response

      if (items) {
        setCoupons(items)
      }
    }

    fetchCoupons()
  }, [groupId])

  const downloadCoupons = useCallback(async () => {
    if (verificationType && !verificationState.verified) {
      initiateVerification()

      return
    }

    const downloadableCoupons = coupons.filter(({ downloaded }) => !downloaded)

    if (downloadableCoupons.length === 0) {
      push(`${groupId}.${HASH_ALREADY_DOWNLOAD_COUPON}`)

      return
    }

    const response = await authGuardedFetchers.post<
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

    if (response === 'NEED_LOGIN') {
      return
    }

    captureHttpError(response)

    const { result: results, ok } = response

    if (ok && results) {
      const succeedCoupons = results.filter(({ success }) => success)

      if (succeedCoupons.length === coupons.length) {
        push(`${groupId}.${HASH_COMPLETE_DOWNLOAD_COUPON_GROUP}`)
      } else if (succeedCoupons.length > 0) {
        push(`${groupId}.${HASH_COMPLETE_DOWNLOAD_PART_OF_COUPON_GROUP}`)
      } else if (succeedCoupons.length === 0) {
        if (results[0].errorCode === MAX_COUPONS_PER_USER_ERROR_CODE) {
          push(`${groupId}.${HASH_ALREADY_DOWNLOAD_COUPON}`)
          return
        }
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

  const onDownload = () =>
    enabled
      ? downloaded
        ? pushHashDownloaded()
        : downloadCoupons()
      : undefined

  return (
    <>
      <BaseCouponDownloadButton
        disabled={!enabled}
        onClick={() => {
          onDownload()
          onClick && onClick()
        }}
      >
        쿠폰 받기
      </BaseCouponDownloadButton>
      <CouponAlertModal identifier={groupId} errorMessage={errorMessage} />
    </>
  )
}

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

async function downloadCoupon(slugId: string) {
  const response = await authGuardedFetchers.get<{
    id?: string
  }>(`/api/benefit/coupons/${slugId}/download`)

  if (response === 'NEED_LOGIN') {
    return { type: 'NEED_LOGIN' } as const
  }

  const { ok, error, result } = response

  if (ok === true && !!result?.id) {
    return { type: 'SUCCESS' } as const
  }

  const { code, message } = error?.responseError || {}

  if (code === 'NO_CI_AUTHENTICATION') {
    return { type: 'NEED_USER_VERIFICATION' } as const
  }

  return { type: 'UNKNOWN_ERROR', message } as const
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

  const isUnverifiedUser = verificationType && !verificationState.verified

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

  const raiseDownloadedAlert = () =>
    push(`${slugId}.${HASH_ALREADY_DOWNLOAD_COUPON}`)

  const handleCouponDownloadButtonClick = async () => {
    if (enabled === true) {
      if (downloaded === true) {
        raiseDownloadedAlert()
      } else {
        if (isUnverifiedUser === true) {
          initiateVerification()
        } else {
          const response = await downloadCoupon(slugId)

          const responseHandlers = {
            /* eslint-disable @typescript-eslint/naming-convention */
            SUCCESS: () => {
              push(`${slugId}.${HASH_COMPLETE_DOWNLOAD_COUPON}`)
              setDownloaded(true)
            },
            NEED_LOGIN: () => {},
            NEED_USER_VERIFICATION: () => initiateVerification(),
            UNKNOWN_ERROR: ({ message }: { message?: string }) => {
              setErrorMessage(message)
              push(`${slugId}.${HASH_ERROR_COUPON}`)
            },
            /* eslint-enable @typescript-eslint/naming-convention */
          }
          const handleResponse = responseHandlers[response.type]
          handleResponse(response)
        }
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

async function downloadCoupons(coupons: CouponData[]) {
  const downloadableCoupons = coupons.filter(({ downloaded }) => !downloaded)

  if (downloadableCoupons.length === 0) {
    return { type: 'NO_DOWNLOADABLE_COUPONS' } as const
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
    return { type: 'NEED_LOGIN' } as const
  }

  captureHttpError(response)

  const { result: results, ok } = response

  if (ok && results) {
    const succeedCoupons = results.filter(({ success }) => success)

    if (succeedCoupons.length === coupons.length) {
      return { type: 'EVERY_COUPONS_DOWNLOADED' } as const
    }
    if (succeedCoupons.length > 0) {
      return { type: 'SOME_COUPONS_DOWNLOADED' } as const
    }
    if (results[0].errorCode === MAX_COUPONS_PER_USER_ERROR_CODE) {
      return { type: 'NO_DOWNLOADABLE_COUPONS' } as const
    }
  }

  return {
    type: 'UNKNOWN_ERROR',
    message: results?.[0].errorMessage,
  } as const
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
  const isUnverifiedUser = verificationType && !verificationState.verified

  const raiseDownloadedAlert = () =>
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

  const handleCouponDownloadButtonClick = async () => {
    if (enabled === true) {
      if (downloaded === true) {
        raiseDownloadedAlert()
      } else {
        if (isUnverifiedUser === true) {
          initiateVerification()
        } else {
          const response = await downloadCoupons(coupons)

          const responseHandlers = {
            /* eslint-disable @typescript-eslint/naming-convention */
            NEED_LOGIN: () => {},
            EVERY_COUPONS_DOWNLOADED: () => {
              push(`${groupId}.${HASH_COMPLETE_DOWNLOAD_COUPON_GROUP}`)
            },
            SOME_COUPONS_DOWNLOADED: () => {
              push(`${groupId}.${HASH_COMPLETE_DOWNLOAD_PART_OF_COUPON_GROUP}`)
            },
            NO_DOWNLOADABLE_COUPONS: () => {
              raiseDownloadedAlert()
            },
            UNKNOWN_ERROR: ({ message }: { message?: string }) => {
              setErrorMessage(message)
              push(`${groupId}.${HASH_ERROR_COUPON}`)
            },
            /* eslint-enable @typescript-eslint/naming-convention */
          }

          const handleResponse = responseHandlers[response.type]
          handleResponse(response)
        }
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
      <CouponAlertModal identifier={groupId} errorMessage={errorMessage} />
    </>
  )
}

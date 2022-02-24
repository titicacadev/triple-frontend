import { useState, useEffect, useCallback } from 'react'
import fetch from 'isomorphic-fetch'
import { useVisibilityChange } from '@titicaca/react-hooks'
import { useExternalRouter } from '@titicaca/router'

import { useVerifiedMessageListener, VerifiedMessage } from './verified-message'
import type { VerificationType } from './types'

interface VerificationState {
  phoneNumber?: string
  verified?: boolean
  error?: string
  payload?: unknown
}

const TARGET_PAGE_PATH: Record<VerificationType, string> = {
  'sms-verification': '/verifications/',
  'personal-id-verification-with-residence': '/verifications/residence',
  'personal-id-verification': '/verifications/personal-id-verification',
}

const CONFIRMATION_API_PATH: Record<VerificationType, string> = {
  'sms-verification': '/api/users/smscert',
  'personal-id-verification-with-residence': '/api/users/kto-stay-2021',
  'personal-id-verification': '/api/users/namecheck',
}

export function useUserVerification({
  verificationType = 'sms-verification',
  verificationContext = 'purchase',
  forceVerification,
}: {
  verificationType?: VerificationType
  verificationContext?: 'purchase' | 'cash'
  forceVerification: boolean
}) {
  const routeExternally = useExternalRouter()
  const [verificationState, setVerificationState] = useState<VerificationState>(
    {
      phoneNumber: undefined,
      verified: undefined,
      error: undefined,
    },
  )

  const initiateVerification = useCallback(() => {
    const href = `${TARGET_PAGE_PATH[verificationType]}?context=${verificationContext}`

    routeExternally({ href, target: 'new', noNavbar: true })
  }, [routeExternally, verificationContext, verificationType])

  const handleVerifiedMessageReceive = useCallback(
    ({ type, phoneNumber }: VerifiedMessage) => {
      if (type === 'USER_VERIFIED' && phoneNumber) {
        setVerificationState({
          verified: true,
          phoneNumber,
        })
      }
    },
    [],
  )

  const fetchAndSetVerificationState = useCallback(
    async (force: boolean) => {
      const response = await fetch(CONFIRMATION_API_PATH[verificationType], {
        credentials: 'same-origin',
      })

      if (response.ok) {
        const { phoneNumber, ...payload } = await response.json()

        setVerificationState({ phoneNumber, payload, verified: true })
      } else if (response.status === 404) {
        setVerificationState({ verified: false })

        force && initiateVerification()
      } else {
        setVerificationState({
          verified: undefined,
          error: await response.text(),
        })
      }
    },
    [initiateVerification, verificationType],
  )

  useEffect(() => {
    fetchAndSetVerificationState(forceVerification)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useVerifiedMessageListener(handleVerifiedMessageReceive)

  useVisibilityChange((visible: boolean) => {
    visible && fetchAndSetVerificationState(false)
  })

  return { verificationState, initiateVerification }
}

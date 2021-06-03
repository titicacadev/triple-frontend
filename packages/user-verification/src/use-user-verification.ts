import { useState, useEffect, useCallback } from 'react'
import fetch from 'isomorphic-fetch'
import {
  subscribe,
  unsubscribe,
} from '@titicaca/triple-web-to-native-interfaces'
import { useVisibilityChange } from '@titicaca/react-hooks'

/**
 * verifications-web에서 전송하는 인증 결과 타입
 * 현재는 성공했을 때만 전송하므로 타입이 유일하다.
 */
interface VerificationResultMessage {
  type: 'USER_VERIFIED'
  phoneNumber: string
}

type VerificationState = {
  phoneNumber?: string
  verified?: boolean
  error?: string
  payload?: unknown
}

export type VerificationType =
  | 'sms-verification'
  | 'personal-id-verification-with-residence'
  | 'personal-id-verification'

const TARGET_PAGE_PATH: Record<VerificationType, string> = {
  'sms-verification': '/verifications/',
  'personal-id-verification-with-residence': '/verifications/residence',
  'personal-id-verification': '/verifications/personal-id-verification',
}

const CONFIRMATION_API_PATH: Record<VerificationType, string> = {
  'sms-verification': '/api/users/smscert',
  'personal-id-verification-with-residence': '/api/users/kto-stay-2021',
  'personal-id-verification': '/api/users/kto-stay-2021',
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
  const [verificationState, setVerificationState] = useState<VerificationState>(
    {
      phoneNumber: undefined,
      verified: undefined,
      error: undefined,
    },
  )

  const initiateVerification = useCallback(() => {
    window.open(
      `${TARGET_PAGE_PATH[verificationType]}?_triple_no_navbar&context=${verificationContext}`,
    )
  }, [verificationContext, verificationType])

  const handleVerifiedMessageReceive = useCallback(
    ({ type, phoneNumber }: VerificationResultMessage) => {
      if (type === 'USER_VERIFIED' && phoneNumber) {
        setVerificationState({
          verified: true,
          phoneNumber,
        })
      }
    },
    [setVerificationState],
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
    [verificationType, setVerificationState, initiateVerification],
  )

  useEffect(() => {
    fetchAndSetVerificationState(forceVerification)

    subscribe('receiveMessage', handleVerifiedMessageReceive)

    return () => unsubscribe('receiveMessage', handleVerifiedMessageReceive)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useVisibilityChange((visible: boolean) => {
    visible && fetchAndSetVerificationState(false)
  })

  return { verificationState, initiateVerification }
}

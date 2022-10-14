import { useState, useEffect, useCallback } from 'react'
import { useVisibilityChange } from '@titicaca/react-hooks'
import { useExternalRouter } from '@titicaca/router'

import { useVerifiedMessageListener, VerifiedMessage } from './verified-message'
import { confirmVerification } from './confirmation-services'

interface VerificationState {
  /**
   * 인증된 전화번호 (있을 경우)
   */
  phoneNumber?: string
  /**
   * 인증 상태
   */
  verified?: boolean
  /**
   * 에러 (있을 경우)
   */
  error?: string
  payload?: unknown
}

export function useUserVerification({
  verificationType = 'sms-verification',
  verificationContext = 'purchase',
  forceVerification,
}: {
  verificationType?: string
  /**
   * 사용자 인증이 이루어지는 맥락을 명시합니다.
   */
  verificationContext?: 'purchase' | 'cash'
  /**
   * 컴포넌트 Mount와 동시에 인증 플로우로 유도할지 결정합니다.
   */
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

  /**
   * 필요한 경우 호출하여 인증 플로우를 시작합니다. 트리플 앱의 브라우저 기준으로 인증 페이지를 렌더링하는 새 창을 생성합니다.
   */
  const initiateVerification = useCallback(() => {
    const href = getVerificationPagePath({
      verificationType,
      verificationContext,
    })

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
      const { verified, phoneNumber, payload, error } =
        await confirmVerification(verificationType)

      setVerificationState({
        verified,
        phoneNumber,
        payload,
        error,
      })

      if (verified === false && force) {
        initiateVerification()
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

const PREDEFINED_TARGET_PAGE_PATHS: Record<string, string> = {
  'sms-verification': '/verifications/',
  'personal-id-verification-with-residence': '/verifications/residence',
  'personal-id-verification': '/verifications/personal-id-verification',
}

function getVerificationPagePath({
  verificationType,
  verificationContext,
}: {
  verificationType: string
  verificationContext?: 'purchase' | 'cash'
}) {
  const predefinedTargetPagePath =
    PREDEFINED_TARGET_PAGE_PATHS[verificationType]
  const querystring = `?context=${verificationContext}`

  if (predefinedTargetPagePath) {
    return `${predefinedTargetPagePath}${querystring}`
  } else if (verificationType.match(/^external-promotion-/)) {
    const promotionId = verificationType.replace(/^external-promotion-/, '')

    return `/verifications/external-promotion/${promotionId}${querystring}`
  } else {
    throw new Error('Unsupported user verification method')
  }
}

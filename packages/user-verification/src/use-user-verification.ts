import { useState, useEffect, useCallback } from 'react'
import fetch from 'isomorphic-fetch'
import { useHistoryContext } from '@titicaca/react-contexts'
import {
  subscribe,
  unsubscribe,
} from '@titicaca/triple-web-to-native-interfaces'
import { useVisibilityChange } from '@titicaca/react-hooks'

type VerificationState = {
  phoneNumber?: string
  verified?: boolean
  error?: string
}

export default function useVerification({
  verificationContext,
  forceVerification,
}: {
  verificationContext?: 'purchase' | 'cash'
  forceVerification: boolean
}) {
  const [verificationState, setVerificationState] = useState<VerificationState>(
    { phoneNumber: undefined, verified: undefined, error: undefined },
  )
  const { openWindow } = useHistoryContext()

  const initiateVerification = useCallback(() => {
    openWindow(
      `/verifications/?_triple_no_navbar&context=${verificationContext}`,
    )
  }, [openWindow, verificationContext])

  const handleVerifiedMessageReceive = useCallback(
    ({ type, phoneNumber }: { type: string; phoneNumber?: string }) => {
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
      const response = await fetch('/api/users/smscert')

      if (response.ok) {
        const { rawPhoneNumber: phoneNumber } = await response.json()

        setVerificationState({ phoneNumber, verified: true })
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
    [setVerificationState, initiateVerification],
  )

  useEffect(() => {
    fetchAndSetVerificationState(forceVerification)

    subscribe('receiveMessage', handleVerifiedMessageReceive)

    return () => unsubscribe('receiveMessage', handleVerifiedMessageReceive)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useVisibilityChange((visible) => {
    visible && fetchAndSetVerificationState(false)
  })

  return { verificationState, initiateVerification }
}

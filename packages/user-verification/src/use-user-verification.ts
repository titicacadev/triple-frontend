import { useState, useEffect, useCallback } from 'react'
import fetch from 'isomorphic-fetch'
import { useHistoryContext } from '@titicaca/react-contexts'
import {
  subscribe,
  unsubscribe,
} from '@titicaca/triple-web-to-native-interfaces'

export default function useVerification({
  forceVerification,
}: {
  forceVerification: boolean
}) {
  const [verifiedContact, setVerifiedContact] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const { openWindow } = useHistoryContext()

  const initiateVerification = () => {
    openWindow('/verifications/?_triple_no_navbar')
  }

  const handleVerifiedMessageReceive = useCallback(
    ({ type, phoneNumber }: { type: string; phoneNumber?: string }) => {
      if (type === 'USER_VERIFIED' && phoneNumber) {
        setVerifiedContact(phoneNumber)
      }
    },
    [setVerifiedContact],
  )

  useEffect(() => {
    async function fetchAndSetVerifiedContact() {
      const response = await fetch('/api/users/smscert')

      if (response.ok) {
        const { rawPhoneNumber } = await response.json()

        setVerifiedContact(rawPhoneNumber)
      } else if (response.status === 404) {
        forceVerification && initiateVerification()
      } else {
        setError(await response.text())
      }
    }

    fetchAndSetVerifiedContact()

    subscribe('receiveMessage', handleVerifiedMessageReceive)

    return () => unsubscribe('receiveMessage', handleVerifiedMessageReceive)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { verifiedContact, initiateVerification, error }
}

import { useState, useEffect } from 'react'
import fetch from 'isomorphic-fetch'
import { useHistoryContext } from '@titicaca/react-contexts'

export default function useVerification() {
  const [verifiedContact, setVerifiedContact] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const { openWindow } = useHistoryContext()

  const initiateVerification = () => {
    openWindow('/verifications/?_triple_no_navbar')
  }

  useEffect(() => {
    async function fetchAndSetVerifiedContact() {
      const response = await fetch('/api/users/smscert')

      if (response.ok) {
        const { rawPhoneNumber } = await response.json()

        setVerifiedContact(rawPhoneNumber)
      } else if (response.status === 404) {
        initiateVerification()
      } else {
        setError(await response.text())
      }
    }

    fetchAndSetVerifiedContact()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { verifiedContact, initiateVerification, error }
}

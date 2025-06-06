import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { X_TRIPLE_WEB_DEVICE_ID } from '@titicaca/constants'

export function useTripleWebDeviceId() {
  const [tripleWebDeviceId, setTripleWebDeviceId] = useState<
    string | undefined
  >()

  useEffect(() => {
    setTripleWebDeviceId(
      new Cookies(document.cookie).get<string>(X_TRIPLE_WEB_DEVICE_ID),
    )
  }, [])

  return tripleWebDeviceId
}

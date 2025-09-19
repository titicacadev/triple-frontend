import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { X_TRIPLE_WEB_DEVICE_ID } from '@titicaca/constants'

export function useTripleDeviceId() {
  const [tripleDeviceId, setTripleDeviceId] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTripleDeviceId(
      new Cookies(document.cookie).get<string>(X_TRIPLE_WEB_DEVICE_ID),
    )
    setIsLoading(false)
  }, [])

  return { tripleDeviceId, isLoading }
}

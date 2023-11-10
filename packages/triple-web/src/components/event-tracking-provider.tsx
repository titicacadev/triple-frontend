import { PropsWithChildren, useEffect } from 'react'
import { setUserId } from 'firebase/analytics'

import { EventTrackingContext } from '../contexts'
import { useSession } from '../hooks'
import { firebaseAnalytics } from '../libs'
import { trackScreen } from '../utils'
import { EventTrackingValue } from '../types'

export type EventTrackingProviderProps = EventTrackingValue & PropsWithChildren

export function EventTrackingProvider({
  children,
  page,
  onError,
}: EventTrackingProviderProps) {
  const { user } = useSession()

  useEffect(() => {
    setUserId(firebaseAnalytics, user?.uid ?? null)
  }, [user?.uid])

  useEffect(() => {
    // TODO: next 의존성 없이 query 값 가져오기
    // const utmParams = Object.keys(query || {})
    //   .filter((key) => key.match(/^utm_/i))
    //   .reduce(
    //     (params, key) => ({
    //       ...params,
    //       [key.replace(/^utm_/, '')]: query[key],
    //     }),
    //     {},
    //   )
    const utmParams = {}

    trackScreen(page.path, page.label, utmParams, { page, onError })
  }, [onError, page])

  return (
    <EventTrackingContext.Provider value={{ page, onError }}>
      {children}
    </EventTrackingContext.Provider>
  )
}

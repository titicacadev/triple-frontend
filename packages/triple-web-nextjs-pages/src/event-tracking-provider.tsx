import {
  EventTrackingProvider as EventTrackingProviderBase,
  type EventTrackingProviderProps as EventTrackingProviderPropsBase,
} from '@titicaca/triple-web'
import { useRouter } from 'next/router.js'

import { getEventTrackingUtm } from './providers'

export type EventTrackingProviderProps = Omit<
  EventTrackingProviderPropsBase,
  'utm'
>

export function EventTrackingProvider({
  children,
  page,
  onError,
}: EventTrackingProviderProps) {
  const router = useRouter()

  return (
    <EventTrackingProviderBase
      page={page}
      utm={getEventTrackingUtm(router.query)}
      onError={onError}
    >
      {children}
    </EventTrackingProviderBase>
  )
}

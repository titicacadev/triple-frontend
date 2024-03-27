'use client'

import {
  EventTrackingProvider as EventTrackingProviderBase,
  EventTrackingProviderProps as EventTrackingProviderBaseProps,
} from '@titicaca/triple-web'
import { useSearchParams } from 'next/navigation'

import { getEventTrackingUtm } from './providers/event-tracking-utm'

export type EventTrackingProviderProps = Omit<
  EventTrackingProviderBaseProps,
  'utm'
>

export function EventTrackingProvider({
  children,
  page,
  onError,
}: EventTrackingProviderProps) {
  const searchParams = useSearchParams()

  return (
    <EventTrackingProviderBase
      page={page}
      utm={getEventTrackingUtm(searchParams)}
      onError={onError}
    >
      {children}
    </EventTrackingProviderBase>
  )
}

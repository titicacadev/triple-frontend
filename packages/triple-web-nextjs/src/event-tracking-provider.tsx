'use client'

import { useMemo } from 'react'
import {
  EventTrackingProvider as EventTrackingProviderBase,
  type EventTrackingProviderProps as EventTrackingProviderBaseProps,
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
  const utm = useMemo(() => getEventTrackingUtm(searchParams), [searchParams])

  return (
    <EventTrackingProviderBase page={page} utm={utm} onError={onError}>
      {children}
    </EventTrackingProviderBase>
  )
}

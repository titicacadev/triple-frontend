'use client'

import {
  EventTrackingProvider as EventTrackingProviderBase,
  type EventTrackingUtmValue,
  type EventTrackingProviderProps as EventTrackingProviderBaseProps,
} from '@titicaca/triple-web'
import { useSearchParams } from 'next/navigation'

export function getEventTrackingUtm(
  searchParams: URLSearchParams,
): EventTrackingUtmValue {
  return {
    source:
      searchParams.get('utm_source') ||
      searchParams.get('utmSource') ||
      undefined,
    medium:
      searchParams.get('utm_medium') ||
      searchParams.get('utmMedium') ||
      undefined,
    campaign:
      searchParams.get('utm_campaign') ||
      searchParams.get('utmCampaign') ||
      undefined,
    term:
      searchParams.get('utm_term') || searchParams.get('utmTerm') || undefined,
    content:
      searchParams.get('utm_content') ||
      searchParams.get('utmContent') ||
      undefined,
    partner: searchParams.get('prt') || undefined,
  }
}

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

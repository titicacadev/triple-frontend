/* eslint-disable camelcase */
import {
  EventTrackingProvider as EventTrackingProviderBase,
  type EventTrackingUtmValue,
  type EventTrackingProviderProps as EventTrackingProviderPropsBase,
} from '@titicaca/triple-web'
import { useRouter } from 'next/router'
import { strictQuery } from '@titicaca/view-utilities'

function getEventTrackingUtm(
  query: Record<string, string | string[] | undefined>,
): EventTrackingUtmValue {
  const {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    prt,
  } = strictQuery(query)
    .string('utm_source')
    .string('utm_medium')
    .string('utm_campaign')
    .string('utm_term')
    .string('utm_content')
    .string('utmSource')
    .string('utmMedium')
    .string('utmCampaign')
    .string('utmTerm')
    .string('utmContent')
    .string('prt')
    .use()

  return {
    source: utm_source || utmSource,
    medium: utm_medium || utmMedium,
    campaign: utm_campaign || utmCampaign,
    term: utm_term || utmTerm,
    content: utm_content || utmContent,
    partner: prt,
  }
}

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

/* eslint-disable camelcase */
import { EventTrackingUtmValue } from '@titicaca/triple-web'
import { strictQuery } from '@titicaca/view-utilities'

export function getEventTrackingUtm(
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
    .use()

  return {
    source: utm_source || utmSource,
    medium: utm_medium || utmMedium,
    campaign: utm_campaign || utmCampaign,
    term: utm_term || utmTerm,
    content: utm_content || utmContent,
  }
}

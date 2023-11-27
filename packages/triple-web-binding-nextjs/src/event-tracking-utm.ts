import { URLSearchParams } from 'url'

import { EventTrackingUtmValue } from '@titicaca/triple-web'

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

import { GeolocationValue } from '@titicaca/triple-web'
import { strictQuery } from '@titicaca/view-utilities'

export function getGeolocation(
  query: Record<string, string | string[] | undefined>,
): GeolocationValue {
  const { inRegion, latitude, longitude } = strictQuery(query)
    .boolean('inRegion')
    .number('latitude')
    .number('longitude')
    .use()

  return {
    inRegion,
    latitude: latitude ?? null,
    longitude: longitude ?? null,
  }
}

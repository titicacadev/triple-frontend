import { GeolocationValue } from '@titicaca/triple-web'

export function getGeolocation(
  searchParams: URLSearchParams,
): GeolocationValue {
  const inRegion = searchParams.get('inRegion')
  const latitude = searchParams.get('latitude')
  const longitude = searchParams.get('longitude')

  return {
    inRegion: inRegion === 'true',
    latitude: latitude === null ? null : parseFloat(latitude),
    longitude: longitude === null ? null : parseFloat(longitude),
  }
}

import { useGoogleMap } from '@react-google-maps/api'
import { useEffect } from 'react'
import { PointGeoJson } from '@titicaca/type-definitions'

const AUTO_ZOOM_THRESHORLD = 10

export function FocusTracker({
  focusGeolocation,
  activeAutoZoom = false,
}: {
  focusGeolocation?: PointGeoJson
  activeAutoZoom?: boolean
}) {
  const map = useGoogleMap()

  useEffect(() => {
    if (!focusGeolocation || !map) {
      return
    }

    const [lng, lat] = focusGeolocation.coordinates
    const zoomLevel = map.getZoom() ?? 0

    if (activeAutoZoom && zoomLevel < AUTO_ZOOM_THRESHORLD) {
      map.setZoom(AUTO_ZOOM_THRESHORLD)
    }

    map.panTo({ lat, lng })
  }, [focusGeolocation, map])

  return null
}

import { useGoogleMap } from '@react-google-maps/api'
import { useEffect } from 'react'
import { PointGeoJson } from '@titicaca/type-definitions'

const AUTO_ZOOM_THRESHOLD = 10

export function FocusTracker({
  focusGeolocation,
  activeAutoZoom = false,
  autoZoomThreshold = AUTO_ZOOM_THRESHOLD,
}: {
  focusGeolocation?: PointGeoJson
  activeAutoZoom?: boolean
  autoZoomThreshold?: number
}) {
  const map = useGoogleMap()

  useEffect(() => {
    if (!focusGeolocation || !map) {
      return
    }

    const [lng, lat] = focusGeolocation.coordinates
    const zoomLevel = map.getZoom() ?? 0

    if (activeAutoZoom && zoomLevel < autoZoomThreshold) {
      map.setZoom(autoZoomThreshold)
    }

    map.panTo({ lat, lng })
  }, [activeAutoZoom, focusGeolocation, map, autoZoomThreshold])

  return null
}

import { useGoogleMap } from '@react-google-maps/api'
import { useEffect } from 'react'
import { PointGeoJson } from '@titicaca/type-definitions'

const AUTO_ZOOM_THRESHOLD = 10

interface FocusTrackerProps {
  focusGeolocation?: PointGeoJson
  activeAutoZoom?: boolean
  autoZoomThreshold?: number
  disabled?: boolean
}

export function FocusTracker({
  focusGeolocation,
  activeAutoZoom = false,
  autoZoomThreshold = AUTO_ZOOM_THRESHOLD,
  disabled = false,
}: FocusTrackerProps) {
  const map = useGoogleMap()

  useEffect(() => {
    if (!focusGeolocation || !map || disabled) {
      return
    }

    const [lng, lat] = focusGeolocation.coordinates
    const zoomLevel = map.getZoom() ?? 0

    if (activeAutoZoom && zoomLevel < autoZoomThreshold) {
      map.setZoom(autoZoomThreshold)
    }

    map.panTo({ lat, lng })
  }, [activeAutoZoom, focusGeolocation, map, autoZoomThreshold, disabled])

  return null
}

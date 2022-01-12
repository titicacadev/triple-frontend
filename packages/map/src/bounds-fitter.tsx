import { useEffect } from 'react'
import { useGoogleMap } from '@react-google-maps/api'
import { getGeometry, literalToString } from './utilities'

export default function BoundsFitter({
  coordinates,
}: {
  coordinates: [number, number][]
}) {
  const map = useGoogleMap()

  const { bounds } = getGeometry(coordinates)

  useEffect(() => {
    if (!bounds) {
      return
    }
    map?.fitBounds(bounds)
  }, [literalToString(bounds)]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

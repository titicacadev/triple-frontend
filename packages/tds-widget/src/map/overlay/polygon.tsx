import { useMemo } from 'react'
import { Polygon as GoogleMapPolygon } from '@react-google-maps/api'

const defaultPolygonStyle: google.maps.PolygonOptions = {
  fillColor: '#ff5b2f',
  fillOpacity: 0.2,
  strokeOpacity: 0,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
}

type PolygonProps = {
  paths?: google.maps.LatLngLiteral[]
} & google.maps.PolygonOptions

export function Polygon({ paths, ...rest }: PolygonProps) {
  const options = useMemo(() => ({ ...defaultPolygonStyle, ...rest }), [rest])

  return <GoogleMapPolygon paths={paths} options={options} />
}

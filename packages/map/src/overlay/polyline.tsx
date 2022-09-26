import { useMemo } from 'react'
import { Polyline as GoogleMapPolyline } from '@react-google-maps/api'

const defaultPolylineStyle: google.maps.PolylineOptions = {
  strokeColor: '#6d6d6d',
  strokeOpacity: 0,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1,
}

export function PolylineBase({ path, ...rest }: google.maps.PolylineOptions) {
  const options = useMemo(() => ({ ...defaultPolylineStyle, ...rest }), [rest])

  return <GoogleMapPolyline path={path} options={options} />
}

/**
 * 커스텀 스타일을 적용한 polyline 컴포넌트를 위한 HoC
 * @param options
 *
 * const DotPolyline = withCustomOptions({
 *  strokeColor: '#FF0000',
 *  strokeOpacity: 0.8
 * })
 */
export function withCustomOptions(options: google.maps.PolylineOptions) {
  return function PolylineComponent({
    path,
    ...rest
  }: google.maps.PolylineOptions) {
    const style: google.maps.PolylineOptions = { ...options, ...rest }

    return <PolylineBase path={path} {...style} />
  }
}

export const DotPolyline = withCustomOptions({
  icons: [
    {
      icon: {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        strokeWeight: 3,
        scale: 1,
      },
      offset: '2px 2px',
      repeat: '8px',
    },
  ],
})

export const Polyline = withCustomOptions({
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
})

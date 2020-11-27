import React, { useMemo } from 'react'
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
    const style: google.maps.PolylineOptions = { ...rest, ...options }

    return <PolylineBase path={path} {...style} />
  }
}

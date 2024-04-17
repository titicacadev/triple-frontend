import { PropsWithChildren } from 'react'

import { CircleMarker } from '../circle-marker'

export type PinMarkerType = 'attraction' | 'restaurant' | 'festa'

function getColorOfType(type: PinMarkerType) {
  switch (type) {
    case 'restaurant':
      return '#FF6B00'
    case 'attraction':
      return '#1769FF'
    case 'festa':
      return '#EB147B'
    default:
      return '#1769FF'
  }
}

function getActivePinImageUrl(type: PinMarkerType) {
  return `https://assets.triple.guide/images/img_map_${type}_timetable_pick@3x.png`
}

/**
 * CircleMarker 에 color 와 pin background-image 를 결정하는 로직을 분리하고
 * poi.type 을 기준으로 컴포넌트의 색상과 pin background-image 를 자유롭게 설정하기 위한
 * High Order Component
 */

type HocProps = Omit<Parameters<typeof CircleMarker>[0], 'color' | 'src'>

export function PinWithCircleMarker(type: PinMarkerType) {
  const color = getColorOfType(type)
  const src = getActivePinImageUrl(type)

  return function ColorMarkerComponent({
    children,
    ...rest
  }: PropsWithChildren<HocProps>) {
    return (
      <CircleMarker {...rest} color={color} src={src}>
        {children}
      </CircleMarker>
    )
  }
}

import React from 'react'

import { CircleMarker, CircleMarkerProps } from './primary-marker'

/**
 * PinWithCircleMarker와 다르게
 * 각 프로젝트에서 active 및 default 시 필요한 마커를 렌더링 하기위한 컴포넌트
 */
export function FlexibleMarker({
  active,
  activeContent,
  defaultContent,
  width,
  height,
  ...props
}: CircleMarkerProps & {
  active: boolean
  activeContent: React.ComponentType
  defaultContent: React.ComponentType
}) {
  return (
    <CircleMarker active={active} {...props}>
      {active ? activeContent : defaultContent}
    </CircleMarker>
  )
}

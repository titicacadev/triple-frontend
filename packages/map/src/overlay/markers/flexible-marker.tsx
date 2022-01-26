import React from 'react'

import { CircleMarker, CircleMarkerProps } from './primary-marker'

/**
 * PinWithCircleMarker와 다르게
 * 각 프로젝트에서 active 및 default 시 필요한 마커를 렌더링 하기위한 컴포넌트
 */
export function FlexibleMarker({
  width,
  height,
  position,
  zIndex,
  active,
  color,
  alwaysClickable,
  onLoad,
  onClick,
  activeContent,
  defaultContent,
}: CircleMarkerProps & {
  active: boolean
  activeContent: React.ComponentType
  defaultContent: React.ComponentType
}) {
  if (active === true) {
    return (
      <CircleMarker
        active
        width={width}
        height={height}
        zIndex={zIndex}
        position={position}
        alwaysClickable={alwaysClickable}
        onLoad={onLoad}
        onClick={onClick}
      >
        {activeContent}
      </CircleMarker>
    )
  }
  return (
    <CircleMarker
      active={false}
      width={width}
      height={height}
      position={position}
      zIndex={zIndex}
      color={color}
      alwaysClickable={alwaysClickable}
      onLoad={onLoad}
      onClick={onClick}
    >
      {defaultContent}
    </CircleMarker>
  )
}

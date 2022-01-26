import styled, { css } from 'styled-components'
import React, { MouseEventHandler } from 'react'

interface DotMarkerProps {
  active: boolean
  color: string
  onClick: MouseEventHandler<HTMLDivElement>
}

const BUBBLE_HEIGHT = 32

const DotMarkerContainer = styled.div<{ active: boolean }>`
  position: relative;
  ${({ active }) =>
    css`
      left: -8px;
      top: -${8 + (active ? BUBBLE_HEIGHT : 0)}px;
      width: 32px;
      height: 32px;
      pointer-events: ${active ? 'none' : 'auto'};
    `}
`

const DotCircle = styled.div<{ color?: string }>`
  position: absolute;
  z-index: 1;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.15);
  left: 3px;
  top: 3px;
  width: 13px;
  height: 13px;
  background-color: ${({ color }) => color};
  > svg {
    padding-top: 4px;
  }
`
/**
 * Poi를 나타내는 작은 점 마커 컴포넌트
 */
export function DotMarker({ active, color, onClick }: DotMarkerProps) {
  return (
    <DotMarkerContainer onClick={onClick} active={active}>
      <DotCircle color={color} />
    </DotMarkerContainer>
  )
}

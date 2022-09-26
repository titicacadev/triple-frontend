import styled, { css } from 'styled-components'
import { MouseEventHandler, PropsWithChildren } from 'react'

interface DotMarkerProps {
  active: boolean
  color: string
  size?: { width: number; height: number }
  onClick?: MouseEventHandler<HTMLDivElement>
}

const BUBBLE_HEIGHT = 32

const DotMarkerContainer = styled.div<Pick<DotMarkerProps, 'size' | 'active'>>`
  position: relative;
  ${({ size: { width = 16, height = 16 } = {}, active }) =>
    css`
      left: -8px;
      top: -${8 + (active ? BUBBLE_HEIGHT : 0)}px;
      width: ${width * 2}px;
      height: ${height * 2}px;
      pointer-events: ${active ? 'none' : 'auto'};
    `}
`

const DotCircle = styled.div<Pick<DotMarkerProps, 'size' | 'color'>>`
  position: absolute;
  z-index: 1;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.15);
  left: 3px;
  top: 3px;

  ${({ size: { width = 13, height = 13 } = {}, color }) =>
    css`
      width: ${width}px;
      height: ${height}px;
      background-color: ${color};
    `}
  > svg {
    padding-top: 4px;
  }
`

/**
 * Poi를 나타내는 작은 점 마커 컴포넌트
 */
export function DotMarker({
  active,
  size,
  color,
  onClick,
  children,
}: PropsWithChildren<DotMarkerProps>) {
  return (
    <DotMarkerContainer size={size} onClick={onClick} active={active}>
      <DotCircle size={size} color={color}>
        {children}
      </DotCircle>
    </DotMarkerContainer>
  )
}

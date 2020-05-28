import React, { useRef } from 'react'
import { TrackItem } from 'react-compound-slider'
import styled from 'styled-components'

const TooltipFrame = styled.div<{
  position: string
}>`
  position: absolute;
  top: -32px;
  font-size: 16px;
  font-weight: bold;
  color: #368fff;

  ${({ position }) => position};
`

function ToolTip({ tracks }: { tracks: TrackItem[] }) {
  const _tootipRef = useRef<HTMLDivElement>(null)

  const widthSizes = getWidthSize(_tootipRef)
  const position = getPosition({ tracks, widthSizes })

  return (
    <TooltipFrame ref={_tootipRef} position={position}>
      아주 좋았어요 아주 좋았어요
    </TooltipFrame>
  )
}

function getWidthSize(ref: React.RefObject<HTMLDivElement>): [number, number] {
  if (!ref.current) {
    return [0, 0]
  }

  return [ref.current.parentElement?.clientWidth || 0, ref.current.clientWidth]
}

function getPosition({
  tracks,
  widthSizes,
}: {
  tracks: TrackItem[]
  widthSizes: [number, number]
}) {
  const [
    {
      source: { value: min },
      target: { percent },
    },
    {
      target: { value: max },
    },
  ] = tracks

  const [containerWidth, tooltipWidth] = widthSizes

  const isStart = percent === min
  const isEnd = percent * 0.1 === max
  const currentAreaWidth = containerWidth * (percent / 100)
  const halfOfTooltipWidth = tooltipWidth / 2

  switch (true) {
    case isStart || currentAreaWidth < halfOfTooltipWidth: {
      return 'left: 0'
    }
    case isEnd || containerWidth - currentAreaWidth < halfOfTooltipWidth: {
      return 'right: 0'
    }
    default: {
      return `left: calc(${percent}% - ${halfOfTooltipWidth}px);`
    }
  }
}

export default ToolTip

import React, { useRef } from 'react'
import { TrackItem } from 'react-compound-slider'
import styled from 'styled-components'
import { blue } from '@titicaca/color-palette'

/**
 * TODO: thumbSize + railHeight 고려 top 값 조절
 */
const TooltipFrame = styled.div<{
  position: string
}>`
  position: absolute;
  top: -45px;
  font-size: 16px;
  font-weight: bold;
  color: ${blue};

  ${({ position }) => position};
`

function ToolTip({
  tracks,
  toolTipLabel,
  thumbSize = 18,
}: {
  thumbSize?: number
  tracks: TrackItem[]
  toolTipLabel: string[]
}) {
  const _tootipRef = useRef<HTMLDivElement>(null)

  const label = getTooltipLabel({ tracks, toolTipLabel })
  const widthSizes = getWidths(_tootipRef)
  const position = getPosition({ tracks, widthSizes, thumbSize })

  return (
    <TooltipFrame ref={_tootipRef} position={position}>
      {label}
    </TooltipFrame>
  )
}

function getTooltipLabel({
  tracks,
  toolTipLabel,
}: {
  tracks: TrackItem[]
  toolTipLabel: string[]
}) {
  const [
    {
      target: { percent },
    },
  ] = tracks

  const maxPercent = 100
  const index =
    percent === maxPercent
      ? toolTipLabel.length - 1
      : Math.floor((toolTipLabel.length * percent) / 100)

  return toolTipLabel[index] || ''
}

function getWidths(ref: React.RefObject<HTMLDivElement>): [number, number] {
  if (!ref.current) {
    return [0, 0]
  }

  return [ref.current.parentElement?.clientWidth || 0, ref.current.clientWidth]
}

function getPosition({
  tracks,
  widthSizes,
  thumbSize,
}: {
  tracks: TrackItem[]
  widthSizes: [number, number]
  thumbSize: number
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
  const halfOfThumbWidth = thumbSize / 2

  switch (true) {
    case isStart || currentAreaWidth < halfOfTooltipWidth: {
      return `left: ${isStart ? `-${halfOfThumbWidth}` : 0}px`
    }
    case isEnd || containerWidth - currentAreaWidth < halfOfTooltipWidth: {
      return `right: ${isEnd ? `-${halfOfThumbWidth}` : 0}px`
    }
    default: {
      return `left: calc(${percent}% - ${halfOfTooltipWidth}px);`
    }
  }
}

export default ToolTip

import React, { useRef } from 'react'
import { TrackItem } from 'react-compound-slider'
import styled from 'styled-components'
import { blue } from '@titicaca/color-palette'

/**
 * TODO: handlerSize + railHeight 고려 top 값 조절
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
}: {
  tracks: TrackItem[]
  toolTipLabel: string[]
}) {
  const _tootipRef = useRef<HTMLDivElement>(null)

  const label = getTooltipLabel({ tracks, toolTipLabel })
  const widthSizes = getWidthSize(_tootipRef)
  const position = getPosition({ tracks, widthSizes })

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

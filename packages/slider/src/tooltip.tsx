import React, { useRef } from 'react'
import { TrackItem } from 'react-compound-slider'
import styled from 'styled-components'

const TooltipFrame = styled.div<{ width: number; left: number }>`
  position: absolute;
  top: -32px;
  font-size: 16px;
  font-weight: bold;
  color: #368fff;
  left: ${({ left, width }) => `calc(${left}% - ${width / 2}px)`};
`

function ToolTip({ tracks }: { tracks: TrackItem[] }) {
  console.log('tracks', tracks)
  const _tool = useRef<HTMLDivElement>(null)
  const [
    {
      source: { value: min },
      target: { percent },
    },
    {
      target: { value: max },
    },
  ] = tracks

  const width = _tool?.current?.clientWidth || 0

  console.log('_tool', _tool)

  return (
    <TooltipFrame ref={_tool} width={width} left={percent}>
      Tooltip
    </TooltipFrame>
  )
}

export default ToolTip

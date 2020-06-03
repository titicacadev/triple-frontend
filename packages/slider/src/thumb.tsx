import React from 'react'
import styled, { StyledComponentProps } from 'styled-components'

import COLORS, { Color } from './color'

const ThumbContainer = styled.div.attrs<{ percent: number }>(({ percent }) => ({
  style: {
    left: `${percent}%`,
  },
}))`
  position: absolute;
  box-sizing: border-box;
  width: 70px;
  height: 90px;
  transform: translate(-50%, -50%);
  z-index: 1;
`

const ThumbPeg = styled.div<{
  color: Color
  thumbSize: number
  thumbBorderWeight: number
  thumbActivateShadow?: boolean
}>`
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  font-weight: bold;

  ${({ thumbActivateShadow }) =>
    thumbActivateShadow &&
    `
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
  `}

  ${({ color }) => `
    color: ${COLORS[color].font};
    background-color: ${COLORS[color].background};
  `}

  ${({ thumbSize, thumbBorderWeight }) => `
    width: ${thumbSize}px;
    height: ${thumbSize}px;
    border-radius: ${thumbSize}px;
    line-height: ${thumbSize - thumbBorderWeight * 2}px;
    border: solid ${thumbBorderWeight}px;
  `}
`

export default function Handle({
  color,
  thumbSize,
  displayPercent,
  thumbBorderWeight,
  thumbActivateShadow,
  ...props
}: StyledComponentProps<
  'div',
  {},
  {
    percent: number
    thumbSize: number
    displayPercent?: boolean
    thumbBorderWeight: number
    thumbActivateShadow?: boolean
    color: Color
  },
  never
>) {
  const { percent } = props

  return (
    <ThumbContainer {...props}>
      <ThumbPeg
        color={color}
        thumbSize={thumbSize}
        thumbActivateShadow={thumbActivateShadow}
        thumbBorderWeight={thumbBorderWeight}
      >
        {displayPercent ? percent / 10 : ''}
      </ThumbPeg>
    </ThumbContainer>
  )
}

import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { FlexBox } from '@titicaca/core-elements'

interface IndicatorProps {
  loading: boolean
  indicatorCount?: number
  color?: string
  size?: number
  margin?: number
  speedMultiplier?: number
}

const pulse = keyframes`
  0% {transform: scale(1);opacity: 1}
  45% {transform: scale(0.1);opacity: 0.7}
  80% {transform: scale(1);opacity: 1}
`

const Indicator = styled.span<{
  index: number
  color: string
  size: number
  speedMultiplier: number
  margin: number
}>`
  background-color: ${({ color }) => color};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  margin: ${({ margin }) => `${margin}px`};
  border-radius: 100%;
  display: inline-block;
  animation: ${({ index, speedMultiplier }) => css`
    ${pulse} ${0.75 / speedMultiplier}s ${(index * 0.12) /
    speedMultiplier}s infinite
        cubic-bezier(0.2, 0.68, 0.18, 1.08);
  `};
  animation-fill-mode: both;
`

export default function LoadingIndicator({
  loading,
  indicatorCount = 3,
  color = 'var(--color-white)',
  size = 11,
  margin = 2,
  speedMultiplier = 1,
}: IndicatorProps) {
  return loading ? (
    <FlexBox flex alignItems="center" justifyContent="center">
      {[...new Array(indicatorCount)].map((_, index) => {
        return (
          <Indicator
            key={index}
            index={index + 1}
            color={color}
            size={size}
            margin={margin}
            speedMultiplier={speedMultiplier}
          />
        )
      })}
    </FlexBox>
  ) : null
}

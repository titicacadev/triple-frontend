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
  0% {transform: translateY(5px);opacity: 1}
  50% {transform: translateY(-5px);opacity: 0.7}
  100% {transform: translateY(5px);opacity: 1}
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
        cubic-bezier(0.62, 0.28, 0.23, 0.99) both;
  `};
`

export default function PurchaseButtonLoadingIndicator({
  loading,
  indicatorCount = 3,
  color = 'var(--color-white)',
  size = 6,
  margin = 3,
  speedMultiplier = 0.75,
}: IndicatorProps) {
  return loading ? (
    <FlexBox
      flex
      css={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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

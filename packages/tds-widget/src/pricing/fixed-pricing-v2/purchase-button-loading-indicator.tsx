import styled, { keyframes } from 'styled-components'
import { FlexBox } from '@titicaca/tds-ui'

interface IndicatorProps {
  loading: boolean
  indicatorCount?: number
  color?: string
  size?: number
  margin?: number
  speedMultiplier?: number
}

const pulse = keyframes`
  0% {
    transform: translateY(5px);
    opacity: 1;
  }

  50% {
    transform: translateY(-5px);
    opacity: 0.7;
  }

  100% {
    transform: translateY(5px);
    opacity: 1;
  }
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
  animation-duration: ${({ speedMultiplier }) => 0.75 / speedMultiplier}s;
  animation-timing-function: cubic-bezier(0.62, 0.28, 0.23, 0.99);
  animation-delay: ${({ speedMultiplier, index }) =>
    (index * 0.12) / speedMultiplier}s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: both;
  animation-name: ${pulse};
`

export function PurchaseButtonLoadingIndicator({
  loading,
  indicatorCount = 3,
  color = 'var(--color-white)',
  size = 6,
  margin = 3,
  speedMultiplier = 0.75,
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

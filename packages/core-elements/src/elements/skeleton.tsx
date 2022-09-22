import styled, { keyframes } from 'styled-components'
import { gray100, gray20 } from '@titicaca/color-palette'

import Container, { ContainerProps } from './container'

const opacityAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`

type SkeletonProps = ContainerProps & { height?: number | string }

export const Skeleton = styled(Container)`
  position: relative;
  overflow: hidden;
  background: ${gray100};
  animation: ${opacityAnimation} 1.5s ease-in-out 0.5s infinite;

  &::after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    position: absolute;
    animation: ${waveAnimation} 1.6s linear 0.5s infinite;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, ${gray20}, transparent);
  }
`

export function SkeletonText({ height = 16, ...props }: SkeletonProps) {
  return (
    <Skeleton
      {...props}
      css={{
        height,
      }}
    />
  )
}

export function SkeletonCircle({
  size = 50,
  ...props
}: { size?: number } & Omit<
  SkeletonProps,
  'width' | 'height' | 'borderRadius'
>) {
  return (
    <Skeleton
      borderRadius={size}
      {...props}
      css={{
        width: size,
        height: size,
      }}
    />
  )
}

export function SkeletonButton({
  height = 45,
  borderRadius = 4,
  ...props
}: SkeletonProps) {
  return (
    <Skeleton
      borderRadius={borderRadius}
      {...props}
      css={{
        height,
      }}
    />
  )
}

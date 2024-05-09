import React from 'react'
import { useLottie } from '@titicaca/react-hooks'
import { Container } from '@titicaca/core-elements'

export function Lottie({
  animationData,
  width,
  height,
}: {
  animationData: unknown
  width: number
  height: number
}) {
  const { animationRef } = useLottie<HTMLDivElement>({
    data: animationData,
  })

  return <Container ref={animationRef} css={{ width, height }} />
}

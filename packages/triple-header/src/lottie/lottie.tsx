import React from 'react'
import { useLottie } from '@titicaca/react-hooks'
import { Container } from '@titicaca/core-elements'

export function Lottie({ lottieData }: { lottieData: unknown }) {
  const { animationRef } = useLottie<HTMLDivElement>({
    data: lottieData,
  })

  return <Container ref={animationRef} />
}

import React from 'react'
import { useLottie } from '@titicaca/react-hooks'
import { Container } from '@titicaca/core-elements'

export function Lottie({ lottieJson }: { lottieJson: unknown }) {
  const { animationRef } = useLottie<HTMLDivElement>({
    data: lottieJson,
  })

  return <Container ref={animationRef} />
}

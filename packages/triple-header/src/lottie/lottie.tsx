import React, { useEffect, useState } from 'react'
import { Container } from '@titicaca/core-elements'
import styled from 'styled-components'

import { TripleHeader } from '../types'
import { getStorage } from '../service'
import { MAX_WIDTH } from '../triple-header'

import { useLottie } from './use-lottie'

const BackgroundImage = styled.img`
  width: 100%;
`

export function Lottie({ lottie }: { lottie: TripleHeader['lottie'] }) {
  const [lottieData, setLottieData] = useState<unknown>()

  const { animationRef } = useLottie<HTMLDivElement>({
    data: lottieData,
  })

  const hasLottieAnimationId = lottie && lottie.lottieAnimationId
  const hasLottieAnimationBackgroundImg = lottie && lottie.backgroundImage

  useEffect(() => {
    async function fetchAndeSetStorage() {
      if (hasLottieAnimationId) {
        const response = await getStorage({
          id: lottie.lottieAnimationId,
        })
        setLottieData(JSON.parse(response as string))
      }
    }

    hasLottieAnimationId && fetchAndeSetStorage()
  }, [hasLottieAnimationId, lottie])

  return (
    <Container css={{ position: 'relative' }}>
      {hasLottieAnimationBackgroundImg ? (
        <Container css={{ maxWidth: MAX_WIDTH }}>
          <BackgroundImage
            src={lottie.backgroundImage?.sizes.full.url}
            alt=""
          />
        </Container>
      ) : null}

      <Container
        ref={animationRef}
        css={
          hasLottieAnimationBackgroundImg
            ? {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }
            : {}
        }
      />
    </Container>
  )
}

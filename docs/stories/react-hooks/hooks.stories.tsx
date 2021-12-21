import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  useScrollToElement,
  useScrollToAnchor,
  useVisibilityChange,
  useLottie,
} from '@titicaca/react-hooks'
import { boolean } from '@storybook/addon-knobs'
import isChromatic from 'chromatic/isChromatic'

import logos from '../__mocks__/lottie.sample.json'

export default {
  title: 'react-hooks / hooks',
}

const LottieContainer = styled.div`
  width: 57px;
  height: 57px;
`

export function ScrollElement() {
  useScrollToElement('#app')

  return (
    <div>
      <div style={{ height: '200vh' }} />
      <div id="app">
        <h1>App</h1>
      </div>
    </div>
  )
}

function ScrollToAnchorComponent({ useAlias }: { useAlias: boolean }) {
  useEffect(() => {
    window.history.pushState(null, '', '#app')
  }, [])

  useScrollToAnchor({
    ...(useAlias
      ? {
          alias: {
            app: 'alias',
          },
        }
      : {}),
  })

  return (
    <div>
      <div style={{ height: '200vh' }} />
      <div id="app">
        <h1>App</h1>
      </div>
      <div style={{ height: '200vh' }} />
      <div id="alias">
        <h1>Alias</h1>
      </div>
    </div>
  )
}

export function ScrollToAnchor() {
  const useAlias = boolean('use alias', false)

  return (
    <ScrollToAnchorComponent key={Math.random() * 10} useAlias={useAlias} />
  )
}

export function VisibilityChange() {
  useVisibilityChange((visible) => {
    if (visible) {
      window.alert('visible !')
    }
  }, [])

  return <div>useVisibilityChange</div>
}

export function Lottie() {
  const { animationRef } = useLottie<HTMLDivElement>({
    data: logos,
    rendererSettings: {
      viewBoxSize: `0 0 57px 57px`,
    },
    autoplay: !isChromatic(),
  })

  return <LottieContainer ref={animationRef} />
}

import { useEffect } from 'react'
import styled from 'styled-components'
import isChromatic from 'chromatic/isChromatic'
import { Story } from '@storybook/react'

import logos from './mocks/lottie.sample.json'
import { useScrollToElement } from './use-scroll-to-element'
import { useScrollToAnchor } from './use-scroll-to-anchor'
import { useVisibilityChange } from './use-visibility-change'
import { useLottie } from './use-lottie'

export default {
  title: 'react-hooks / hooks',
}

const LottieContainer = styled.div`
  width: 57px;
  height: 57px;
`

export function ScrollElement() {
  const { scrollToElement } = useScrollToElement()

  useEffect(() => {
    scrollToElement(document.getElementById('app'), {
      offset: 52,
      duration: 600,
    })
  }, [scrollToElement])

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

interface ScrollToAnchorCustomArgs {
  useAlias: boolean
}

export const ScrollToAnchor: Story<ScrollToAnchorCustomArgs> = ({
  useAlias,
}) => {
  return (
    <ScrollToAnchorComponent key={Math.random() * 10} useAlias={useAlias} />
  )
}
ScrollToAnchor.args = {
  useAlias: false,
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

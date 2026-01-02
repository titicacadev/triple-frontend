import type { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import styled from 'styled-components'

import logos from './mocks/lottie.sample.json'
import { useLottie } from './use-lottie'
import { useScrollToAnchor } from './use-scroll-to-anchor'
import { useScrollToElement } from './use-scroll-to-element'
import { useVisibilityChange } from './use-visibility-change'

export default {
  title: 'react-hooks / hooks',
  parameters: {
    story: {
      inline: false,
      iframeHeight: 500,
    },
  },
} as Meta

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

export const ScrollToAnchor: StoryObj<ScrollToAnchorCustomArgs> = {
  render: ({ useAlias }) => {
    return (
      <ScrollToAnchorComponent key={Math.random() * 10} useAlias={useAlias} />
    )
  },

  args: {
    useAlias: false,
  },
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
    autoplay: true,
  })

  return <LottieContainer ref={animationRef} />
}

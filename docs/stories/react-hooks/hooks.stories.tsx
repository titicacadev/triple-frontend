import React, { useEffect } from 'react'
import {
  useScrollToElement,
  useScrollToAnchor,
  useVisibilityChange,
} from '@titicaca/react-hooks'
import { boolean } from '@storybook/addon-knobs'

export default {
  title: 'react-hooks | hooks',
}

export function ScrollElement() {
  useScrollToElement('#app')

  return (
    <div>
      <div style={{ height: '200vh' }}></div>
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
      <div style={{ height: '200vh' }}></div>
      <div id="app">
        <h1>App</h1>
      </div>
      <div style={{ height: '200vh' }}></div>
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

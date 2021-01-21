import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ELEMENTS } from '@titicaca/triple-document'
import { useScrollToAnchor } from '@titicaca/react-hooks'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Temp = styled.div`
  width: 100%;
  height: 200vh;
`

const { anchor: Anchor } = ELEMENTS

export default {
  title: 'TripleDocument | TripleDocument.Anchor',
}

export function BaseAnchor() {
  useEffect(() => {
    window.history.pushState(null, '', '#App')
  })

  useScrollToAnchor({ delayTime: 0 })

  return (
    <Container>
      <Temp />
      <Anchor
        value={{
          elementId: 'App',
        }}
      />
      <div>App</div>
      <Temp />
      <Anchor
        value={{
          elementId: 'DApp',
        }}
      />
      <div>DApp</div>
      <Temp />
    </Container>
  )
}

BaseAnchor.story = {
  name: 'Anchor',
}

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ELEMENTS } from '@titicaca/triple-document'
import { useScrollToAnchor } from '@titicaca/react-hooks'

const { anchor: Anchor } = ELEMENTS

const EmptyArea = styled.div`
  height: 200vh;
`

export default {
  title: 'TripleDocument | TripleDocument.Anchor',
}

export function BaseAnchor() {
  useEffect(() => {
    window.history.pushState(null, '', '#android')
  }, [])

  useScrollToAnchor({ delayTime: 0 })

  return (
    <div>
      <EmptyArea />
      <div>Android</div>
      <Anchor value={{ href: 'android' }} />
      <EmptyArea />
      <div>ios</div>
      <Anchor value={{ href: 'ios' }} />
    </div>
  )
}

BaseAnchor.story = {
  name: 'Anchor',
}

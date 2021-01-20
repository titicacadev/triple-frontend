import React, { useEffect } from 'react'
import styled from 'styled-components'
import scrollToElement from 'scroll-to-element'
import { useCanonicalHash } from '@titicaca/react-hooks'

const Element = styled.div`
  width: 100%;
  height: 0px;
`

interface AnchorProps {
  elementId: string
  offset?: number
  delayTime?: number
  duration?: number
  align?: 'top' | 'bottom' | 'middle'
  alias?: {
    [key: string]: string
  }
}

export default function BaseAnchor({
  elementId,
  offset = -52,
  delayTime = 1500,
  duration,
  align,
  alias,
}: AnchorProps) {
  const { canonicalHash } = useCanonicalHash({ alias })

  useEffect(() => {
    if (canonicalHash) {
      setTimeout(() => {
        const el = document.getElementById(canonicalHash)
        if (el) {
          scrollToElement(el, { offset, duration, align })
        }
      }, delayTime)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canonicalHash])

  return <Element id={elementId}></Element>
}

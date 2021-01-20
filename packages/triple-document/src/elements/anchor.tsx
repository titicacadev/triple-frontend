import React, { useEffect } from 'react'
import styled from 'styled-components'
import scrollToElement from 'scroll-to-element'

const Element = styled.div`
  height: 0px;
`

interface AnchorProps {
  elementId: string
  canonicalHash: string
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
  canonicalHash,
  offset = -52,
  delayTime = 1500,
  duration,
  align,
}: AnchorProps) {
  useEffect(() => {
    if (canonicalHash) {
      const el = document.getElementById(canonicalHash)
      if (el) {
        setTimeout(() => {
          scrollToElement(el, { offset, duration, align })
        }, delayTime)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canonicalHash])
  return <Element id={elementId}></Element>
}

import React, { useEffect } from 'react'
import styled from 'styled-components'
import scrollToElement from 'scroll-to-element'

interface Props {
  value: {
    elementId: string
    canonicalHash: string
    option?: {
      offset?: number
      delayTime?: number
      duration?: number
      align?: 'top' | 'bottom' | 'middle'
    }
  }
}

const Element = styled.div`
  height: 0px;
`

function moveToElement({
  el,
  option,
}: {
  el: HTMLElement
  option?: {
    offset?: number
    delayTime?: number
    duration?: number
    align?: 'top' | 'bottom' | 'middle'
  }
}) {
  const { offset = -52, delayTime = 1500, duration, align } = option || {}
  setTimeout(() => {
    scrollToElement(el, { offset, duration, align })
  }, delayTime)
}

export default function BaseAnchor({ value }: Props) {
  const { elementId, canonicalHash, option } = value

  useEffect(() => {
    if (canonicalHash) {
      const el = document.getElementById(canonicalHash)
      if (el) {
        moveToElement({ el: el, option: option })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canonicalHash])

  return <Element id={elementId}></Element>
}

import React from 'react'
import styled from 'styled-components'

import { useImageState } from './context'

const Img = styled.img<{
  borderRadius?: number
  dimmed?: boolean
  fitHeight?: boolean
}>`
  ${({ fitHeight }) =>
    fitHeight &&
    `
      position: absolute;
      top: 0;
      height: 100%;
    `}
  width: 100%;
  border-radius: ${({ borderRadius }) =>
    borderRadius === 0 ? 0 : borderRadius || 6}px;
  object-fit: cover;
  opacity: ${({ dimmed }) => (dimmed ? 80 : 100)}%;
`

export default function ImageImg(
  props: Omit<Parameters<typeof Img>[0], 'borderRadius' | 'dimmed'>,
) {
  const { borderRadius, overlayMounted } = useImageState()

  return <Img {...props} borderRadius={borderRadius} dimmed={overlayMounted} />
}

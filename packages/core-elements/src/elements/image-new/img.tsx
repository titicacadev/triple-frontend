import React from 'react'
import styled from 'styled-components'

import { useImageState } from './context'
import { useContentAbsolute } from './fixed-ratio-frame'

const Img = styled.img<{
  borderRadius?: number
  dimmed?: boolean
  absolute: boolean
}>`
  width: 100%;
  height: 100%;
  border-radius: ${({ borderRadius }) =>
    borderRadius === 0 ? 0 : borderRadius || 6}px;
  object-fit: cover;
  opacity: ${({ dimmed }) => (dimmed ? 80 : 100)}%;

  ${({ absolute }) =>
    absolute &&
    `
    position: absolute;
    top: 0;
  `}
`

export default function ImageImg(
  props: Omit<
    Parameters<typeof Img>[0],
    'borderRadius' | 'dimmed' | 'fitHeight'
  >,
) {
  const { borderRadius, overlayMounted } = useImageState()
  const absolute = useContentAbsolute()

  return (
    <Img
      {...props}
      borderRadius={borderRadius}
      dimmed={overlayMounted}
      absolute={absolute}
    />
  )
}

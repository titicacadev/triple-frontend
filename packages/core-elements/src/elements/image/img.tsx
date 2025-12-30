import styled, { CSSProp } from 'styled-components'
import * as CSS from 'csstype'

import { shouldForwardProp } from '../../utils/should-forward-prop'

import { useImageState } from './context'
import { useContentAbsolute } from './fixed-ratio-frame'

const Img = styled.img.withConfig({
  shouldForwardProp,
})<{
  borderRadius: number
  dimmed?: boolean
  absolute: boolean
  cursor?: CSS.Property.Cursor
  css?: CSSProp
}>`
  width: 100%;
  height: 100%;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  object-fit: cover;
  opacity: ${({ dimmed }) => (dimmed ? 80 : 100)}%;
  ${({ absolute }) =>
    absolute &&
    `
    position: absolute;
    top: 0;
  `}
  ${({ cursor }) =>
    cursor &&
    `
    cursor: ${cursor};
  `}
  z-index: 0;
  ${(props) => props.css}
`

export function ImageImg(
  props: Omit<
    Parameters<typeof Img>[0],
    'borderRadius' | 'dimmed' | 'fitHeight' | 'absolute'
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

import { MouseEventHandler } from 'react'
import styled, { CSSProp } from 'styled-components'
import { shouldForwardProp } from '@titicaca/core-elements'

const PreviewImage = styled.img.withConfig({
  shouldForwardProp,
})<{ css?: CSSProp }>`
  object-fit: cover;
  border-radius: 4px;
`

export default function ImageItem({
  src,
  onClick,
  ...props
}: {
  src: string
  onClick?: MouseEventHandler
  css?: CSSProp
}) {
  return <PreviewImage src={src} onClick={onClick} {...props} />
}

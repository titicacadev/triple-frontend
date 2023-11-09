import { MouseEventHandler } from 'react'
import styled from 'styled-components'

const PreviewImage = styled.img`
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
}) {
  return <PreviewImage src={src} onClick={onClick} {...props} />
}

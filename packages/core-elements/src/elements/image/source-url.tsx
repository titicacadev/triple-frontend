import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const SourceUrlContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 9px;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.9);
  z-index: 1;
`

export default function ImageSourceUrl({
  children,
}: PropsWithChildren<unknown>) {
  return <SourceUrlContainer>{children}</SourceUrlContainer>
}

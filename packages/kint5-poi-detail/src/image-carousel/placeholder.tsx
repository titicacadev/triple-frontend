import styled from 'styled-components'
import { TripleKoreaBi } from '@titicaca/kint5-core-elements'

const ImagePlaceholderContainer = styled.div<{ large?: boolean }>`
  width: 100%;
  height: 375px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--color-kint5-gray20);
`

interface ImagePlaceholderProps {
  onClick: () => void
}

export function ImagePlaceholder({ onClick }: ImagePlaceholderProps) {
  return (
    <ImagePlaceholderContainer onClick={onClick}>
      <TripleKoreaBi color="#B6BBC1" css={{ width: 40 }} />
    </ImagePlaceholderContainer>
  )
}

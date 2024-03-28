import styled, { css } from 'styled-components'
import { Container } from '@titicaca/core-elements'
import { useUserAgentContext } from '@titicaca/react-contexts'
import Flicking from '@egjs/react-flicking'
import { useEffect, useRef } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'

import { Video } from './video'
import Image from './image'

const SourceUrl = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: var(--color-white900);
  padding: 20px;
  font-size: 12px;
  line-height: 12px;
  height: 54px;
  color: var(--color-gray700);
  position: relative;
  z-index: 9999;
`

const Button = styled.button<{ direction: 'next' | 'prev' }>`
  z-index: 9999;
  position: absolute;
  background-image: url('https://assets.triple.guide/images/ico-arrow-right-black@3x.png');
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: center;
  width: 44px;
  height: 44px;
  top: 50%;
  border: 1px solid var(--color-gray100);
  ${({ direction }) =>
    direction === 'next'
      ? css`
          transform: translateY(-50%);
          right: 20px;
        `
      : css`
          transform: rotate(180deg) translateY(50%);
          left: 20px;
        `}
  background-color: white;
  border-radius: 50%;
`
const SOURCE_HEIGHT = 54

export interface DetailViewerProp {
  images: ImageMeta[]
  totalCount: number
  fetchNext?: (cb?: () => void) => Promise<void>
  imageIndex: number
  changeImageIndex: (idx: number) => void
  onChangeImageIndex?: (idx: number) => void
}

export default function DetailViewer({
  images,
  totalCount,
  fetchNext,
  imageIndex,
  changeImageIndex,
  onChangeImageIndex,
}: DetailViewerProp) {
  const { isMobile } = useUserAgentContext()
  const flickingRef = useRef<Flicking>(null)

  function onNextImageShow() {
    if (flickingRef.current) {
      flickingRef.current.next()
    }
  }

  function onPrevImageShow() {
    if (flickingRef.current) {
      flickingRef.current.prev()
    }
  }

  async function fetchNewImages(index: number) {
    if (index > images.length - 5 && fetchNext) {
      await fetchNext()
    }
  }

  useEffect(() => {
    onChangeImageIndex?.(imageIndex)
  }, [imageIndex, onChangeImageIndex])

  return (
    <Container
      css={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: 768,
        margin: 'auto',
      }}
    >
      <Flicking
        ref={flickingRef}
        css={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
        defaultIndex={imageIndex}
        onMoveEnd={({ index }) => {
          changeImageIndex(index)
          fetchNewImages(index)
        }}
        autoResize
      >
        {images.map((image, index) => (
          <Container key={image.id} css={{ width: '100%', height: '100%' }}>
            <Container
              css={{
                width: '100%',
                height: `calc(100% - ${image.sourceUrl ? SOURCE_HEIGHT : 0}px)`,
                display: 'flex',
              }}
            >
              {'video' in image ? (
                <Video medium={image} visible={imageIndex === index} />
              ) : (
                <Image
                  visible={imageIndex === index}
                  src={image.sizes.large.url}
                  alt={image.id}
                />
              )}
            </Container>
            {image.sourceUrl ? <SourceUrl>{image.sourceUrl}</SourceUrl> : null}
          </Container>
        ))}
      </Flicking>
      {!isMobile ? (
        <>
          {imageIndex > 0 ? (
            <Button direction="prev" onClick={onPrevImageShow} />
          ) : null}
          {imageIndex < totalCount - 1 ? (
            <Button direction="next" onClick={onNextImageShow} />
          ) : null}
        </>
      ) : null}
    </Container>
  )
}

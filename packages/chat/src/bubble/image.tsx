import { Container, shouldForwardProp } from '@titicaca/core-elements'
import styled, { CSSProp } from 'styled-components'
import { useLongPress } from 'use-long-press'

import { MetaDataInterface } from '../types'

import { ImageItem } from './item'
import { ImageBubbleProp } from './type'

const DEFAULT_IMAGE_NUM_IN_ROW = 3

const ImageRow = styled.div.withConfig({
  shouldForwardProp,
})<{ css?: CSSProp }>`
  :not(:last-child) {
    margin-bottom: 5px;
  }
`

const MAX_IMAGE_WIDTH = 247

export function ImageBubble({
  id,
  images,
  onClick,
  onLongPress,
}: ImageBubbleProp) {
  const allocatedImages = allocateImages(images)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const bind = useLongPress(
    (target, context) => {
      onLongPress?.(id, target, context)
    },
    {
      threshold: 500,
      cancelOnMovement: true,
    },
  )

  return (
    <Container
      display="inline-block"
      css={{ maxWidth: MAX_IMAGE_WIDTH, verticalAlign: 'bottom' }}
      {...bind()}
    >
      {allocatedImages.map((imagesInRow, index) => (
        <ImageRow key={index} css={{ display: 'flex', gap: 5 }}>
          {imagesInRow.map((image) => (
            <ImageItem
              key={image.id}
              src={image.sizes.large.url}
              onClick={(e) => {
                if (onClick) {
                  onClick?.(e, images, image.index)
                }
              }}
              css={
                images.length === 2 || images.length === 4
                  ? { height: 121, width: 121 }
                  : imagesInRow.length > 1
                  ? { height: 79, width: 79, flexGrow: 1 }
                  : {
                      width: Math.min(MAX_IMAGE_WIDTH, image.width),
                      height: Math.min(
                        Math.floor(
                          (MAX_IMAGE_WIDTH * image.height) / image.width,
                        ),
                        image.height,
                      ),
                    }
              }
            />
          ))}
        </ImageRow>
      ))}
    </Container>
  )
}

function allocateImages(
  images: Array<MetaDataInterface>,
): Array<Array<MetaDataInterface & { index: number }>> {
  if (images.length === 1) {
    return [[{ ...images[0], index: 0 }]]
  }
  const imagesWithIndex = images.map((image, index) => ({ ...image, index }))
  const allocatedImages: Array<Array<MetaDataInterface & { index: number }>> =
    []
  let i = 0
  let row = 0
  while (i < imagesWithIndex.length) {
    row += 1
    if (
      row ===
        Math.ceil(imagesWithIndex.length / DEFAULT_IMAGE_NUM_IN_ROW) - 1 &&
      images.length % DEFAULT_IMAGE_NUM_IN_ROW === 1
    ) {
      allocatedImages.push(
        imagesWithIndex.slice(i, i + DEFAULT_IMAGE_NUM_IN_ROW - 1),
      )
      i += DEFAULT_IMAGE_NUM_IN_ROW - 1
      continue
    }
    allocatedImages.push(imagesWithIndex.slice(i, i + DEFAULT_IMAGE_NUM_IN_ROW))
    i += DEFAULT_IMAGE_NUM_IN_ROW
  }
  return allocatedImages
}

import { Responsive } from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'
import React from 'react'

import {
  ImageElement,
  SquareFrame,
  ImagesContainer,
  FlexItemContainer,
} from './elements'

const IMAGES_CONTAINER_HEIGHTS = [217, 292, 328]
const IMAGE_HEIGHTS = [217, 143, 105]

export default function MultipleImages({
  images,
  onImageClick,
}: {
  images: ImageMeta[]
  onImageClick: (e: React.SyntheticEvent, index: number) => void
}) {
  return (
    <>
      <Responsive minWidth={500}>
        <ImagesContainer
          flexDirection="row"
          height={IMAGES_CONTAINER_HEIGHTS[images.length - 2]}
        >
          <FlexItemContainer flexShrink={1}>
            <ImageElement
              src={images[0].sizes.large.url}
              fullHeight
              onClick={(e) => onImageClick(e, 0)}
            />
          </FlexItemContainer>

          <FlexItemContainer flexShrink={images.length - 1}>
            <ImagesContainer flexDirection="column">
              {images.slice(1, images.length).map(({ id, sizes }, index) => (
                <ImageElement
                  key={`review.img.${id}.${index}`}
                  src={sizes.large.url}
                  height={IMAGE_HEIGHTS[images.length - 2]}
                  onClick={(e) => onImageClick(e, index)}
                />
              ))}
            </ImagesContainer>
          </FlexItemContainer>
        </ImagesContainer>
      </Responsive>

      <Responsive maxWidth={499}>
        <ImagesContainer flexDirection="row">
          <FlexItemContainer flexShrink={1}>
            <SquareFrame>
              <ImageElement
                src={images[0].sizes.large.url}
                fullHeight
                absolute
                onClick={(e) => onImageClick(e, 0)}
              />
            </SquareFrame>
          </FlexItemContainer>

          <FlexItemContainer flexShrink={images.length - 1}>
            <ImagesContainer flexDirection="column">
              {images.slice(1, images.length).map(({ id, sizes }, index) => (
                <FlexItemContainer
                  key={`review.img.${id}.${index}`}
                  flexShrink={1}
                >
                  <SquareFrame>
                    <ImageElement
                      src={sizes.large.url}
                      absolute
                      fullHeight
                      onClick={(e) => onImageClick(e, index)}
                    />
                  </SquareFrame>
                </FlexItemContainer>
              ))}
            </ImagesContainer>
          </FlexItemContainer>
        </ImagesContainer>
      </Responsive>
    </>
  )
}

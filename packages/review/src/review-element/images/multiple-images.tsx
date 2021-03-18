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
  const [firstImage, ...restImages] = images

  return (
    <>
      <Responsive maxWidth={499}>
        <ImagesContainer flexDirection="row">
          <FlexItemContainer flexShrink={1} margin={{ right: 5 }}>
            <SquareFrame>
              <ImageElement
                src={firstImage.sizes.large.url}
                fullHeight
                absolute
                onClick={(e) => onImageClick(e, 0)}
              />
            </SquareFrame>
          </FlexItemContainer>

          <FlexItemContainer flexShrink={restImages.length}>
            <ImagesContainer flexDirection="column">
              {restImages.map(({ id, sizes }, index) => (
                <FlexItemContainer
                  key={`review.img.${id}.${index}`}
                  flexShrink={1}
                  margin={{ bottom: index < restImages.length - 1 ? 5 : 0 }}
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
      <Responsive minWidth={500}>
        <ImagesContainer
          flexDirection="row"
          height={IMAGES_CONTAINER_HEIGHTS[restImages.length - 1]}
        >
          <FlexItemContainer flexShrink={1} margin={{ right: 9 }}>
            <ImageElement
              src={firstImage.sizes.large.url}
              fullHeight
              onClick={(e) => onImageClick(e, 0)}
            />
          </FlexItemContainer>

          <FlexItemContainer flexShrink={restImages.length}>
            <Responsive maxWidth={767}>
              <ImagesContainer flexDirection="column">
                {restImages.map(({ id, sizes }, index) => (
                  <ImageElement
                    key={`review.img.${id}.${index}`}
                    src={sizes.large.url}
                    height={IMAGE_HEIGHTS[restImages.length - 1]}
                    onClick={(e) => onImageClick(e, index)}
                    margin={{ bottom: index < restImages.length - 1 ? 6 : 0 }}
                  />
                ))}
              </ImagesContainer>
            </Responsive>
            <Responsive minWidth={768}>
              <ImagesContainer flexDirection="column">
                {restImages.map(({ id, sizes }, index) => (
                  <ImageElement
                    key={`review.img.${id}.${index}`}
                    src={sizes.large.url}
                    height={IMAGE_HEIGHTS[restImages.length - 1]}
                    onClick={(e) => onImageClick(e, index)}
                    margin={{ bottom: index < restImages.length - 1 ? 6 : 0 }}
                  />
                ))}
              </ImagesContainer>
            </Responsive>
          </FlexItemContainer>
        </ImagesContainer>
      </Responsive>
    </>
  )
}

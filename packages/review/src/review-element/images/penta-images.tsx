import { Responsive, Text } from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'
import React from 'react'

import {
  ImageElement,
  SquareFrame,
  Dimmer,
  FlexItemContainer,
  ImagesContainer,
} from './elements'

export default function PentaImages({
  images,
  onImageClick,
}: {
  images: ImageMeta[]
  onImageClick: (e: React.SyntheticEvent, index: number) => void
}) {
  return (
    <>
      <Responsive maxWidth={499}>
        <ImagesContainer flexDirection="column">
          <ImagesContainer flexDirection="row">
            {images.slice(0, 2).map(({ id, sizes }, index) => (
              <FlexItemContainer
                key={`review-img.${id}.${index}`}
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
          <ImagesContainer flexDirection="row">
            {images.slice(2, 5).map(({ id, sizes }, index) => (
              <FlexItemContainer
                key={`review-img.${id}.${index}`}
                flexShrink={1}
              >
                <SquareFrame>
                  {images.length > 5 && index === 2 ? (
                    <Dimmer>
                      <td>
                        <Text bold color="white900" textAlign="center">
                          + {images.length - 5}
                        </Text>
                      </td>
                    </Dimmer>
                  ) : null}
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
        </ImagesContainer>
      </Responsive>
      <Responsive minWidth={500}>
        <ImagesContainer flexDirection="column">
          <ImagesContainer flexDirection="row" height={217}>
            {images.slice(0, 2).map(({ id, sizes }, index) => (
              <FlexItemContainer
                key={`review-img.${id}.${index}`}
                flexShrink={1}
              >
                <ImageElement
                  src={sizes.large.url}
                  fullHeight
                  onClick={(e) => onImageClick(e, index)}
                />
              </FlexItemContainer>
            ))}
          </ImagesContainer>
          <ImagesContainer flexDirection="row" height={143}>
            {images.slice(2, 5).map(({ id, sizes }, index) => (
              <FlexItemContainer
                key={`review-img.${id}.${index}`}
                flexShrink={1}
              >
                {images.length > 5 && index === 2 ? (
                  <Dimmer>
                    <Text bold color="white900" textAlign="center">
                      + {images.length - 5}
                    </Text>
                  </Dimmer>
                ) : null}
                <ImageElement
                  src={sizes.large.url}
                  fullHeight
                  onClick={(e) => onImageClick(e, index)}
                />
              </FlexItemContainer>
            ))}
          </ImagesContainer>
        </ImagesContainer>
      </Responsive>
    </>
  )
}

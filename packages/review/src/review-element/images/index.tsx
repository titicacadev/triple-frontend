import { Responsive } from '@titicaca/core-elements'
import React from 'react'
import styled, { css } from 'styled-components'

import { ImageEntity } from '../../types'

import { ImageElement, SquareFrame } from './elements'

const IMAGES_CONTAINER_HEIGHTS = [217, 292, 328]
const IMAGE_HEIGHTS = [217, 143, 105]

const ImagesContainer = styled.div<{
  flexDirection: 'column' | 'row'
  height?: number
}>`
  display: flex;
  justify-content: space-between;
  ${({ flexDirection }) => css`
    flex-direction: ${flexDirection};
  `}
  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}

  @media (max-width: 500px) {
    gap: 5px;
  }

  @media (min-width: 499px) and (max-width: 768px) {
    gap: 6px;
  }

  @media (min-width: 767px) {
    column-gap: 10px;
    row-gap: 6px;
  }
`

const FlexItemContainer = styled.div<{ flexShrink?: number }>`
  flex-basis: 100%;

  ${({ flexShrink = 1 }) => css`
    flex-shrink: ${flexShrink};
  `}

  & > div {
    height: 100%;
  }
`

export default function Images({ images }: { images: ImageEntity[] }) {
  const isMultiple = images.length > 1

  if (images.length < 0) {
    return null
  }

  if (images.length > 5) {
    return null
  }

  if (isMultiple) {
    return images.length > 1 ? (
      <>
        <Responsive minWidth={500}>
          <ImagesContainer
            flexDirection="row"
            height={IMAGES_CONTAINER_HEIGHTS[images.length - 2]}
          >
            <FlexItemContainer flexShrink={1}>
              <ImageElement src={images[0].sizes.large.url} fullHeight />
            </FlexItemContainer>

            <FlexItemContainer flexShrink={images.length - 1}>
              <ImagesContainer flexDirection="column">
                {images.slice(1, images.length).map(({ id, sizes }, index) => (
                  <ImageElement
                    key={`review-img.${id}.${index}`}
                    src={sizes.large.url}
                    height={IMAGE_HEIGHTS[images.length - 2]}
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
                />
              </SquareFrame>
            </FlexItemContainer>

            <FlexItemContainer flexShrink={images.length - 1}>
              <ImagesContainer flexDirection="column">
                {images.slice(1, images.length).map(({ id, sizes }, index) => (
                  <FlexItemContainer
                    key={`review-img.${id}.${index}`}
                    flexShrink={1}
                  >
                    <SquareFrame>
                      <ImageElement src={sizes.large.url} absolute fullHeight />
                    </SquareFrame>
                  </FlexItemContainer>
                ))}
              </ImagesContainer>
            </FlexItemContainer>
          </ImagesContainer>
        </Responsive>
      </>
    ) : null
  }

  const image = images[0]

  return (
    <>
      <Responsive maxWidth={499}>
        {image.width > image.height ? (
          <ImageElement src={image.sizes.large.url} />
        ) : (
          <SquareFrame>
            <ImageElement src={image.sizes.large.url} absolute fullHeight />
          </SquareFrame>
        )}
      </Responsive>
      <Responsive minWidth={500}>
        <ImageElement src={image.sizes.large.url} height={293} />
      </Responsive>
    </>
  )
}

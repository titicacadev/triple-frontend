import React from 'react'
import * as CSS from 'csstype'
import {
  ImageCarouselElementContainer,
  ImageBlockElementContainer,
  ImageCaption,
  Container,
  ImageSourceType,
} from '@titicaca/core-elements'
import TripleMedia, { MediaMeta } from '@titicaca/triple-media'

import DocumentCarousel from './shared/document-carousel'
import generateClickHandler from './shared/generate-click-handler'
import { ImageEventHandler, LinkEventHandler } from '../types'

type MediaDisplayProperty = CSS.Property.Display | 'gapless-block'

export default function Images({
  value: { images, display },
  onImageClick,
  onLinkClick,
  ImageSource,
  videoAutoPlay,
}: {
  value: {
    images: MediaMeta[]
    display: MediaDisplayProperty
  }
  onImageClick: ImageEventHandler
  onLinkClick: LinkEventHandler
  ImageSource: ImageSourceType
  videoAutoPlay?: boolean
}) {
  const ImagesContainer = ['block', 'gapless-block'].includes(display)
    ? Container
    : DocumentCarousel
  const ElementContainer =
    display === 'gapless-block'
      ? Container
      : display === 'block'
      ? ImageBlockElementContainer
      : ImageCarouselElementContainer

  const handleClick = generateClickHandler(onLinkClick, onImageClick)

  return (
    <ImagesContainer
      margin={{
        top: display === 'gapless-block' ? 0 : 40,
        bottom:
          display === 'gapless-block'
            ? 0
            : images.some(({ title }) => title)
            ? 10
            : 30,
      }}
    >
      {images.map((image, i) => {
        return (
          <ElementContainer key={i}>
            {display === 'gapless-block' ? (
              <TripleMedia
                borderRadius={0}
                autoPlay={videoAutoPlay}
                media={image}
                onClick={handleClick}
                ImageSource={ImageSource}
              />
            ) : (
              <>
                <TripleMedia
                  autoPlay={videoAutoPlay}
                  media={image}
                  onClick={handleClick}
                  ImageSource={ImageSource}
                />
                {image.title ? (
                  <ImageCaption>{image.title}</ImageCaption>
                ) : null}
              </>
            )}
          </ElementContainer>
        )
      })}
    </ImagesContainer>
  )
}

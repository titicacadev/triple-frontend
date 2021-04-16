import React from 'react'
import * as CSS from 'csstype'
import semver from 'semver'
import {
  ImageCarouselElementContainer,
  ImageBlockElementContainer,
  ImageCaption,
  Container,
  ImageSourceType,
} from '@titicaca/core-elements'
import TripleMedia from '@titicaca/triple-media'
import { ImageMeta } from '@titicaca/type-definitions'
import { useUserAgentContext } from '@titicaca/react-contexts'

import { LinkEventHandler } from '../types'
import { useImageClickHandler } from '../prop-context/image-click-handler'

import DocumentCarousel from './shared/document-carousel'
import generateClickHandler from './shared/generate-click-handler'

type MediaDisplayProperty = CSS.Property.Display | 'gapless-block'

const PLAYS_INLINE_APP_VERSION = '4.10.0'

export default function Images({
  value: { images, display },
  onLinkClick,
  ImageSource,
  videoAutoPlay,
  hideVideoControls,
  optimized,
}: {
  value: {
    images: ImageMeta[]
    display: MediaDisplayProperty
  }
  onLinkClick: LinkEventHandler
  ImageSource: ImageSourceType
  videoAutoPlay?: boolean
  hideVideoControls?: boolean
  optimized?: boolean
}) {
  const onImageClick = useImageClickHandler()

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
  const { isPublic, os, app } = useUserAgentContext()
  const appVersion = semver.coerce(app?.version)
  const isLegacyIosApp = Boolean(
    !isPublic &&
      os &&
      os.name === 'iOS' &&
      appVersion &&
      semver.lt(appVersion, PLAYS_INLINE_APP_VERSION),
  )

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
                optimized={optimized}
                borderRadius={0}
                autoPlay={videoAutoPlay}
                hideControls={hideVideoControls || isLegacyIosApp}
                showNativeControls={isLegacyIosApp}
                media={image}
                onClick={handleClick}
                ImageSource={ImageSource}
              />
            ) : (
              <>
                <TripleMedia
                  optimized={optimized}
                  autoPlay={videoAutoPlay}
                  hideControls={hideVideoControls || isLegacyIosApp}
                  showNativeControls={isLegacyIosApp}
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

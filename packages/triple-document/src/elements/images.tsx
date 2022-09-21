import * as CSS from 'csstype'
import {
  ImageCarouselElementContainer,
  ImageBlockElementContainer,
  ImageCaption,
  Container,
} from '@titicaca/core-elements'
import TripleMedia from '@titicaca/triple-media'
import { ImageMeta } from '@titicaca/type-definitions'

import { useImageClickHandler } from '../prop-context/image-click-handler'
import { useLinkClickHandler } from '../prop-context/link-click-handler'
import { useImageSource } from '../prop-context/image-source'
import { useMediaConfig } from '../prop-context/media-config'

import DocumentCarousel from './shared/document-carousel'
import generateClickHandler from './shared/generate-click-handler'

type MediaDisplayProperty = CSS.Property.Display | 'gapless-block'

export default function Images({
  value: { images, display },
  onImageClick: overridedOnImageClick,
  onLinkClick: overridedOnLinkClick,
}: {
  value: {
    images: ImageMeta[]
    display: MediaDisplayProperty
  }
  onImageClick?: ReturnType<typeof useImageClickHandler>
  onLinkClick?: ReturnType<typeof useLinkClickHandler>
}) {
  const defaultOnImageClick = useImageClickHandler()
  const onImageClick = overridedOnImageClick || defaultOnImageClick

  const defaultOnLinkClick = useLinkClickHandler()
  const onLinkClick = overridedOnLinkClick || defaultOnLinkClick

  const ImageSource = useImageSource()
  const { videoAutoPlay, hideVideoControls, optimized } = useMediaConfig()

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
                frame="small"
                optimized={optimized}
                borderRadius={0}
                autoPlay={videoAutoPlay}
                hideControls={hideVideoControls}
                media={image}
                onClick={handleClick}
                ImageSource={ImageSource}
              />
            ) : (
              <>
                <TripleMedia
                  frame="small"
                  optimized={optimized}
                  autoPlay={videoAutoPlay}
                  hideControls={hideVideoControls}
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

import { ImageCarouselElementContainer, ImageCaption } from '@titicaca/tds-ui'
import { ImageMeta } from '@titicaca/type-definitions'
import { DocumentImageDisplayType } from '@titicaca/content-type-definitions'
import { Media } from '@titicaca/tds-widget'

import { useImageClickHandler } from '../prop-context/image-click-handler'
import { useLinkClickHandler } from '../prop-context/link-click-handler'
import { useImageSource } from '../prop-context/image-source'
import { useMediaConfig } from '../prop-context/media-config'

import generateClickHandler from './shared/generate-click-handler'
import {
  DocumentCarouselContainer,
  ELEMENT_CONTAINER_MAP,
  IMAGES_CONTAINER_MAP,
} from './shared/display-containers'

export default function Images({
  value: { images, display },
  onImageClick: overridedOnImageClick,
  onLinkClick: overridedOnLinkClick,
}: {
  value: {
    images: ImageMeta[]
    display: DocumentImageDisplayType
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

  const ImagesContainer: React.ElementType =
    IMAGES_CONTAINER_MAP[display] || DocumentCarouselContainer

  const ElementContainer =
    ELEMENT_CONTAINER_MAP[display] || ImageCarouselElementContainer

  const handleClick = generateClickHandler(onLinkClick, onImageClick)
  const isOnlyImage = ['gapless-block', 'grid'].includes(display)

  return (
    <ImagesContainer images={images}>
      {images.map((image, i) => {
        return (
          <ElementContainer key={i}>
            <Media
              frame="small"
              optimized={optimized}
              borderRadius={isOnlyImage ? 0 : undefined}
              autoPlay={videoAutoPlay}
              hideControls={hideVideoControls}
              media={image}
              onClick={handleClick}
              ImageSource={ImageSource}
            />
            {!isOnlyImage && image.title ? (
              <ImageCaption>{image.title}</ImageCaption>
            ) : null}
          </ElementContainer>
        )
      })}
    </ImagesContainer>
  )
}

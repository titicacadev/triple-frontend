import {
  ImageCarouselElementContainer,
  ImageCaption,
} from '@titicaca/kint5-core-elements'
import Kint5Media from '@titicaca/kint5-media'
import { ImageMeta } from '@titicaca/type-definitions'
import { DocumentImageDisplayType } from '@titicaca/content-type-definitions'

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

  const ImagesContainer =
    IMAGES_CONTAINER_MAP[display] || DocumentCarouselContainer

  const ElementContainer =
    ELEMENT_CONTAINER_MAP[display] || ImageCarouselElementContainer

  const handleClick = generateClickHandler(onLinkClick, onImageClick)
  const isOnlyImage = ['gapless-block', 'grid'].includes(display)

  const isHorizontalLayout = display === undefined || display === 'default'

  return (
    <ImagesContainer images={images}>
      {images.map((image, i) => {
        return (
          <ElementContainer
            key={i}
            {...(isHorizontalLayout && images.length > 1 && { maxWidth: 320 })}
          >
            <Kint5Media
              frame="large"
              optimized={optimized}
              borderRadius={isOnlyImage ? 0 : 16}
              autoPlay={videoAutoPlay}
              hideControls={hideVideoControls}
              // 비디오 재생버튼 이외의 영역을 눌렀을 때 팝업창이 뜨도록 하기 위해
              // 비디오 요소의 native control을 표시하지 않도록 강제합니다.
              showNativeControls={false}
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

import { ImageMeta } from '@titicaca/type-definitions'
import { useMemo, useState } from 'react'
import {
  useClientApp,
  useHashRouter,
  useLoginCtaModal,
  useSessionAvailability,
  useTrackEvent,
} from '@titicaca/triple-web'

import { useClientActions } from '../../../services'
import { ImageViewerPopup } from '../../../../image-viewer'

import { compareMedia } from './compare-media'
import { Dimmer, MediumWrapper } from './elements'
import { MediaWrapper } from './media-wrapper'
import { Medium } from './medium'

interface Props {
  media: ImageMeta[]
  reviewId: string
}

const HASH_IMAGE_VIEWER_POPUP = 'popup.review-image-viewer'

export function Media({ media, reviewId }: Props) {
  const trackEvent = useTrackEvent()
  const { navigateImages } = useClientActions()
  const app = useClientApp()
  const sessionAvailable = useSessionAvailability()
  const { show: showLoginCtaModal } = useLoginCtaModal()
  const { hasUriHash, addUriHash, removeUriHash } = useHashRouter()

  const [imageIndex, setImageIndex] = useState<number | null>(null)

  const hasVideo = media.some((medium) => medium.type === 'video')

  const sortedMedia = useMemo(
    () => (hasVideo ? [...media].sort(compareMedia) : media),
    [media, hasVideo],
  )

  const limit = hasVideo ? 3 : 5
  const length = Math.min(sortedMedia.length, limit)
  const restLength = sortedMedia.length - length

  const onMediumClick = (medium: ImageMeta) => {
    const thumbnailType = medium.type === 'video' ? '비디오' : '사진'

    trackEvent({
      ga: ['리뷰_리뷰썸네일_클릭', thumbnailType],
      fa: {
        action: '리뷰_리뷰썸네일_클릭',
        media_id: medium.id,
        type: thumbnailType,
        review_id: reviewId,
      },
    })

    if (!app && !sessionAvailable) {
      return showLoginCtaModal({ triggeredEventAction: '리뷰_리뷰썸네일_클릭' })
    }

    const originalIndex = sortedMedia.findIndex(
      (originalMedium) => originalMedium.id === medium.id,
    )

    if (app) {
      navigateImages(media, originalIndex)
    } else {
      setImageIndex(originalIndex)
      addUriHash(HASH_IMAGE_VIEWER_POPUP)
    }
  }

  const handleImageViewerPopupClose = () => {
    trackEvent({ fa: { action: '이미지팝업_닫기_선택' } })
    setImageIndex(null)
    removeUriHash()
  }

  const onImageMetadataIntersecting = (medium: ImageMeta, index?: number) => {
    trackEvent({
      fa: {
        action: '이미지팝업_미디어_노출',
        media_id: medium.id,
        type: medium.type === 'image' ? '사진' : '비디오',
        position: ((index || 0) + 1).toString(),
      },
    })
  }

  if (sortedMedia.length === 0) {
    return null
  }

  return (
    <>
      <MediaWrapper length={length}>
        {sortedMedia.slice(0, limit).map((medium, index) => (
          <MediumWrapper
            key={medium.id}
            onClick={() => {
              onMediumClick(medium)
            }}
          >
            <Medium medium={medium} />
            {restLength > 0 && index === limit - 1 ? (
              <Dimmer
                flex
                alignItems="center"
                justifyContent="center"
                backgroundColor="gray500"
              >
                +{restLength}
              </Dimmer>
            ) : null}
          </MediumWrapper>
        ))}
      </MediaWrapper>

      {imageIndex != null && hasUriHash(HASH_IMAGE_VIEWER_POPUP) ? (
        <ImageViewerPopup
          open={hasUriHash(HASH_IMAGE_VIEWER_POPUP)}
          images={sortedMedia}
          totalCount={sortedMedia.length}
          defaultImageIndex={imageIndex}
          onClose={handleImageViewerPopupClose}
          onImageMetadataIntersecting={onImageMetadataIntersecting}
        />
      ) : null}
    </>
  )
}

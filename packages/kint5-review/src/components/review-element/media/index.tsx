import { TransitionType } from '@titicaca/modals'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { ImageMeta } from '@titicaca/type-definitions'
import { useAppCallback } from '@titicaca/ui-flow'
import { useMemo } from 'react'

import { useClientActions } from '../../../services'

import { compareMedia } from './compare-media'
import { Dimmer, MediumWrapper } from './elements'
import MediaWrapper from './media-wrapper'
import Medium from './medium'

interface Props {
  media: ImageMeta[]
  reviewId: string
}

function Media({ media, reviewId }: Props) {
  const { trackEvent } = useEventTrackingContext()
  const { navigateImages } = useClientActions()

  const hasVideo = media.some((medium) => medium.type === 'video')

  const sortedMedia = useMemo(
    () => (hasVideo ? [...media].sort(compareMedia) : media),
    [media, hasVideo],
  )

  const limit = hasVideo ? 3 : 5
  const length = Math.min(sortedMedia.length, limit)
  const restLength = sortedMedia.length - length

  const onMediumClick = useAppCallback(
    TransitionType.ReviewThumbnail,
    (medium: ImageMeta) => {
      const originalIndex = media.findIndex(
        (originalMedium) => originalMedium.id === medium.id,
      )
      navigateImages(media, originalIndex)
    },
  )

  if (sortedMedia.length === 0) {
    return null
  }

  return (
    <MediaWrapper length={length}>
      {sortedMedia.slice(0, limit).map((medium, index) => {
        const thumbnailType = medium.type === 'video' ? '비디오' : '사진'

        return (
          <MediumWrapper
            key={medium.id}
            onClick={() => {
              trackEvent({
                ga: ['리뷰_리뷰썸네일_클릭', thumbnailType],
                fa: {
                  action: '리뷰_리뷰썸네일_클릭',
                  media_id: medium.id,
                  type: thumbnailType,
                  review_id: reviewId,
                },
              })

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
        )
      })}
    </MediaWrapper>
  )
}

export default Media

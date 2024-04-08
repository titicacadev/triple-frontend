import { FlexBox } from '@titicaca/kint5-core-elements'
import {
  useEventTrackingContext,
  useHistoryFunctions,
  useUriHash,
} from '@titicaca/react-contexts'
import { ImageMeta } from '@titicaca/type-definitions'
import { useMemo, useState } from 'react'
import { MEDIA_POPUP_HASH, MediaPopup } from '@titicaca/kint5-media-popup'

import { compareMedia } from './compare-media'
import { MediumWrapper } from './elements'
import DefaultMediaWrapper from './media-wrapper'
import Medium from './medium'

interface Props {
  media: ImageMeta[]
  reviewId: string
  allowNavigateImages?: boolean
  customMediaWrapper?: typeof DefaultMediaWrapper
}

function Media({
  media,
  reviewId,
  allowNavigateImages = true,
  customMediaWrapper: MediaWrapper = DefaultMediaWrapper,
}: Props) {
  const { push } = useHistoryFunctions()
  const { trackEvent } = useEventTrackingContext()
  const uriHash = useUriHash()
  const [currentMediaPopupIndex, setCurrentMediaPopupIndex] = useState(0)

  const hasVideo = media.some((medium) => medium.type === 'video')

  const sortedMedia = useMemo(
    () => (hasVideo ? [...media].sort(compareMedia) : media),
    [media, hasVideo],
  )

  const limit = hasVideo ? 3 : 5
  const length = Math.min(sortedMedia.length, limit)
  const restLength = sortedMedia.length - length

  if (sortedMedia.length === 0) {
    return null
  }

  return (
    <>
      <MediaWrapper length={length}>
        {sortedMedia.slice(0, limit).map((medium, index) => {
          const thumbnailType = medium.type === 'video' ? '비디오' : '사진'

          return (
            <MediumWrapper
              key={medium.id}
              onClick={() => {
                if (!allowNavigateImages) {
                  return
                }

                trackEvent({
                  ga: ['리뷰_리뷰썸네일_클릭', thumbnailType],
                  fa: {
                    action: '리뷰_리뷰썸네일_클릭',
                    media_id: medium.id,
                    type: thumbnailType,
                    review_id: reviewId,
                  },
                })

                setCurrentMediaPopupIndex(index)
                push(`${MEDIA_POPUP_HASH}.${reviewId}`)
              }}
            >
              <Medium medium={medium} />
              {restLength > 0 && index === limit - 1 ? (
                <FlexBox
                  flex
                  css={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    height: '100%',
                    color: 'var(--color-kint5-gray0)',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  +{restLength}
                </FlexBox>
              ) : null}
            </MediumWrapper>
          )
        })}
      </MediaWrapper>
      <MediaPopup
        open={uriHash === `${MEDIA_POPUP_HASH}.${reviewId}`}
        media={sortedMedia}
        currentMediumIndex={currentMediaPopupIndex}
        onMediumChange={setCurrentMediaPopupIndex}
      />
    </>
  )
}

export default Media

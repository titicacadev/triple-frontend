import { useEffect, useState } from 'react'
import Popup from '@titicaca/popup'
import { useHistoryFunctions, useUriHash } from '@titicaca/react-contexts'
import { FlexBox, Navbar, Text } from '@titicaca/kint5-core-elements'
import { useTranslation } from '@titicaca/next-i18next'

import { BaseReviewFragment } from '../../data/graphql'
import { HASH_EXTRA_INFO_SPLIT_STRING } from '../constants'
import { compareMedia } from '../review-element/media/compare-media'

import { ReviewMediaGrid } from './review-media-grid'
import { ReviewMedia } from './types'
import { ReviewMediaCarousel } from './review-media-carousel'

interface ReviewMediaPopupProps {
  reviews: BaseReviewFragment[]
}

export const REVIEW_MEDIA_POPUP_HASH = 'hash.popup.review-media'

export function ReviewMediaPopup({ reviews }: ReviewMediaPopupProps) {
  const { t } = useTranslation('common-web')

  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number | null>(
    null,
  )
  const [renderMediaGrid, setRenderMediaGrid] = useState(false)

  const [, reviewId, rawCurrentMediaIndex] = uriHash.split(
    HASH_EXTRA_INFO_SPLIT_STRING,
  )
  const targetReview = reviews.find(({ id }) => id === reviewId)
  const open =
    uriHash.includes(REVIEW_MEDIA_POPUP_HASH) && targetReview !== undefined
  const media = sortVideosToFront(targetReview?.media ?? [])
  const numOfMedia = media.length

  const handleMediaGridClick = (clickedMediaIndex: number) => {
    setCurrentMediaIndex(clickedMediaIndex)
    setRenderMediaGrid(false)
  }

  useEffect(() => {
    if (!open) {
      setCurrentMediaIndex(null)
    }

    if (open && rawCurrentMediaIndex) {
      setCurrentMediaIndex(parseInt(rawCurrentMediaIndex))
    }
  }, [open, rawCurrentMediaIndex])

  return (
    <Popup open={open} onClose={back} noNavbar>
      <Navbar
        onLeftButtonClick={back}
        leftButtonIconType="close"
        centerContent={
          currentMediaIndex !== null ? (
            <FlexBox flex alignItems="center">
              <Text>
                {renderMediaGrid ? t(['sajin', '사진']) : currentMediaIndex + 1}
                &nbsp;
              </Text>
              <Text css={{ color: 'var(--color-kint5-gray40)' }}>
                {renderMediaGrid ? '' : '/ '}
                {numOfMedia}
              </Text>
            </FlexBox>
          ) : null
        }
        rightContent={
          !renderMediaGrid && numOfMedia > 1 ? (
            <button
              onClick={() => setRenderMediaGrid(true)}
              aria-label="전체 리뷰 미디어 보기"
            >
              <img
                src="https://assets.triple.guide/images/btn-end-view-all@3x.png"
                alt="전체 리뷰 미디어 보기"
                width={34}
                height={34}
              />
            </button>
          ) : null
        }
      />
      {renderMediaGrid ? (
        <ReviewMediaGrid media={media} onMediaClick={handleMediaGridClick} />
      ) : currentMediaIndex !== null ? (
        <ReviewMediaCarousel
          currentMediaIndex={currentMediaIndex}
          media={media}
          onSlide={(clickedMediaIndex: number) =>
            setCurrentMediaIndex(clickedMediaIndex)
          }
        />
      ) : null}
    </Popup>
  )
}

function sortVideosToFront(media: ReviewMedia[]) {
  const sortedMedia = hasVideoInMedia(media)
    ? [...media].sort(compareMedia)
    : media

  return sortedMedia
}

function hasVideoInMedia(media: ReviewMedia[]) {
  return media.some((medium) => medium.type === 'video')
}

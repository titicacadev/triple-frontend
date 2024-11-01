import { useCallback } from 'react'
import {
  useTranslation,
  useClientAppActions,
  useSessionCallback,
  useTrackEvent,
} from '@titicaca/triple-web'
import { Button } from '@titicaca/tds-ui'
import { useNavigate } from '@titicaca/router'
import qs from 'qs'

import { SHORTENED_REVIEWS_COUNT_PER_PAGE } from '../constants'

import type { SortingType, SortingOption } from './sorting-context'

interface Props {
  reviewsCount: number | undefined
  resourceId: string
  resourceType: string
  regionId: string | undefined
  hasMedia: boolean
  recentTrip: boolean
  sortingType?: SortingType
  sortingOption: SortingOption
}

const OPTION_LABELS = {
  recommendation: '추천순',
  latest: '최신순',
  'star-rating-desc': '별점 높은순',
  'star-rating-asc': '별점 낮은순',
}

export const FullListButton = ({
  reviewsCount,
  resourceId,
  resourceType,
  regionId,
  hasMedia,
  recentTrip,
  sortingType,
  sortingOption,
}: Props) => {
  const t = useTranslation()
  const trackEvent = useTrackEvent()
  const { navigate } = useNavigate()
  const { getWindowId } = useClientAppActions()

  const reviewListUrl = `/reviews/list?_triple_no_navbar&${qs.stringify({
    ...(regionId && regionId !== 'null' && { region_id: regionId }),
    resource_id: resourceId,
    resource_type: resourceType,
    recent_trip: recentTrip,
    sorting_type: sortingType,
    sorting_option: sortingOption,
    has_media: hasMedia,
    opener_id: getWindowId && getWindowId(),
  })}`

  const fullListButtonClickCallback = useSessionCallback(
    useCallback(() => {
      navigate(reviewListUrl)
    }, [navigate, reviewListUrl]),
    {
      returnUrl: reviewListUrl,
      triggeredEventAction: '리뷰_리스트더보기_선택',
    },
  )

  const restReviewsCount = reviewsCount
    ? reviewsCount - SHORTENED_REVIEWS_COUNT_PER_PAGE
    : 0

  const handleClick = () => {
    trackEvent({
      ga: ['리뷰_리스트더보기_선택'],
      fa: {
        action: '리뷰_리스트더보기_선택',
        item_id: resourceId,
        tab_name: OPTION_LABELS[sortingOption],
      },
    })
    fullListButtonClickCallback()
  }

  if (restReviewsCount <= 0) {
    return null
  }

  return (
    <Button
      basic
      fluid
      compact
      size="small"
      css={{
        margin: '40px 0 0',
      }}
      onClick={handleClick}
    >
      {t('{{numOfRestReviews}}개 리뷰 더보기', {
        numOfRestReviews: restReviewsCount,
      })}
    </Button>
  )
}

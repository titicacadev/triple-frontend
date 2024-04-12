import { useCallback } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import { Button } from '@titicaca/kint5-core-elements'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { TransitionType } from '@titicaca/modals'
import { useEventTrackingContext } from '@titicaca/react-contexts'

import { SHORTENED_REVIEWS_COUNT_PER_PAGE } from '../constants'
import { useClientActions } from '../services'

import type { SortingType, SortingOption } from './sorting-context'
import { useReviewLanguage } from './language-context'

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
  const { t } = useTranslation()
  const { userLang } = useReviewLanguage()
  const { trackEvent } = useEventTrackingContext()
  const { navigateReviewList } = useClientActions()

  const fullListButtonClickCallback = useAppCallback(
    TransitionType.OpenReviewList,
    useSessionCallback(
      useCallback(() => {
        navigateReviewList({
          regionId,
          resourceId,
          resourceType,
          hasMedia,
          recentTrip,
          sortingType,
          sortingOption,
          lang: userLang,
        })
      }, [
        navigateReviewList,
        regionId,
        resourceId,
        resourceType,
        hasMedia,
        recentTrip,
        sortingType,
        sortingOption,
        userLang,
      ]),
      { triggeredEventAction: '리뷰_리스트더보기_선택' },
    ),
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
      css={{
        width: '100%',
        margin: '40px 0 0',
        padding: '16px 0',
        borderRadius: 28,
        backgroundColor: 'var(--color-kint5-gray20)',
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--color-kint5-gray100)',
        textAlign: 'center',
      }}
      onClick={handleClick}
    >
      {t(
        [
          'numofrestreviews-gae-ribyu-deobogi',
          '{{numOfRestReviews}}개 리뷰 더보기',
        ],
        { numOfRestReviews: restReviewsCount },
      )}
    </Button>
  )
}

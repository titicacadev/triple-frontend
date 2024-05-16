import { ComponentType, useEffect } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import { Section, Text } from '@titicaca/kint5-core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { LoginCtaModalProvider } from '@titicaca/kint5-modals'

import { useReviewCount } from '../services'

import { PopularReviewsInfinite, LatestReviewsInfinite } from './infinite-list'
import {
  SortingOptionsProvider,
  useReviewSortingOptions,
} from './sorting-context'
import type { SortingOption, SortingType } from './sorting-context'
import { FilterProvider, useReviewFilters } from './filter-context'
import { SortingOptions } from './sorting-options'
import type { InfinityReviewValue } from './infinite-list'
import { ReviewLanguageProvider, useReviewLanguage } from './language-context'
import { KoreanReviewTranslationNotice } from './korean-review-translation-notice'

const REVIEWS_SECTION_ID = 'triple-reviews'

interface TripleReviewsProps {
  resourceId: string
  resourceType: string
  regionId?: string
  initialReviewsCount?: number
  initialMediaFilter?: boolean
  initialRecentTrip?: boolean
  initialSortingOption?: SortingOption
  sortingType?: SortingType
  placeholderText?: string
  lang: string
  receiverId?: string
}

export function TripleReviews({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialMediaFilter,
  initialRecentTrip,
  initialSortingOption = 'recommendation',
  sortingType = 'poi',
  placeholderText,
  receiverId,
  lang,
}: TripleReviewsProps) {
  return (
    <LoginCtaModalProvider>
      <FilterProvider
        initialRecentTrip={initialRecentTrip}
        initialMediaFilter={initialMediaFilter}
        receiverId={receiverId}
      >
        <SortingOptionsProvider
          type={sortingType}
          receiverId={receiverId}
          resourceId={resourceId}
          initialSortingOption={initialSortingOption}
        >
          <ReviewLanguageProvider reviewLang="ko" userLang={lang}>
            <TripleReviewsComponent
              resourceId={resourceId}
              resourceType={resourceType}
              regionId={regionId}
              initialReviewsCount={initialReviewsCount}
              placeholderText={placeholderText}
              sortingType={sortingType}
            />
          </ReviewLanguageProvider>
        </SortingOptionsProvider>
      </FilterProvider>
    </LoginCtaModalProvider>
  )
}

const REVIEW_INFINITY_LIST_TYPES = {
  recommendation: PopularReviewsInfinite,
  latest: LatestReviewsInfinite,
  'star-rating-desc': null,
  'star-rating-asc': null,
}

function TripleReviewsComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  placeholderText,
  sortingType,
}: Omit<
  TripleReviewsProps,
  'initialRecentTrip' | 'initialSortingOption' | 'lang'
>) {
  const { t } = useTranslation('common-web')
  const { isRecentTrip, isMediaCollection } = useReviewFilters()
  const { reviewLang } = useReviewLanguage()
  const { selectedOption } = useReviewSortingOptions()

  const { subscribeReviewUpdateEvent, unsubscribeReviewUpdateEvent } =
    useTripleClientActions()

  const { data: reviewsCountData, refetch: refetchReviewsCount } =
    useReviewCount(
      {
        resourceId,
        resourceType,
        recentTrip: isRecentTrip,
        hasMedia: isMediaCollection,
        lang: reviewLang,
      },
      initialReviewsCount,
    )

  useEffect(() => {
    subscribeReviewUpdateEvent?.(refetchReviewsCount)

    return () => unsubscribeReviewUpdateEvent?.(refetchReviewsCount)
  }, [
    refetchReviewsCount,
    subscribeReviewUpdateEvent,
    unsubscribeReviewUpdateEvent,
  ])

  const ListElement = REVIEW_INFINITY_LIST_TYPES[
    selectedOption
  ] as ComponentType<{ value: InfinityReviewValue }>

  const isRatingOption = selectedOption.startsWith('star-rating')
  const value = {
    isGlobal: false,
    resourceId,
    resourceType,
    regionId,
    recentTrip: isRecentTrip,
    hasMedia: isMediaCollection,
    placeholderText,
    reviewsCount: reviewsCountData?.reviewsCount,
    sortingType,
    ...(isRatingOption && { sortingLabel: selectedOption }),
  }

  return (
    <Section anchor={REVIEWS_SECTION_ID} css={{ margin: '0 16px', padding: 0 }}>
      <Text css={{ fontSize: 21, fontWeight: 700 }}>
        {t(
          [
            'totalreviewscount-gaeyi-hyeonjiin-ribyu',
            '{{totalReviewsCount}}개의 현지인 리뷰',
          ],
          {
            totalReviewsCount: formatNumber(reviewsCountData?.reviewsCount),
          },
        )}
      </Text>
      <KoreanReviewTranslationNotice />
      <SortingOptions />
      <ListElement value={value} />
    </Section>
  )
}

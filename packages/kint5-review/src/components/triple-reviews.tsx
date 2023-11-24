import { ComponentType, useEffect } from 'react'
import { Trans } from '@titicaca/next-i18next'
import { Section, Container, Text } from '@titicaca/kint5-core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { LoginCtaModalProvider } from '@titicaca/modals'

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
          <ReviewLanguageProvider lang="ko">
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
}: Omit<TripleReviewsProps, 'initialRecentTrip' | 'initialSortingOption'>) {
  const { isRecentTrip, isMediaCollection } = useReviewFilters()
  const { lang } = useReviewLanguage()
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
        lang,
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
      <Container>
        <Trans
          i18nKey={[
            'totalreviewscount-gaeyi-hyeonjiin-ribyu',
            '<0> {{totalReviewsCount}}</0><1>개의 현지인 리뷰</1>',
          ]}
          ns="common-web"
        >
          <Text
            css={{
              fontSize: 21,
              fontWeight: 700,
              display: 'inline',
              color: 'var(--color-kint5-brand1)',
            }}
          >
            <>
              {{
                totalReviewsCount: formatNumber(reviewsCountData?.reviewsCount),
              }}
            </>
          </Text>
          <Text css={{ fontSize: 21, fontWeight: 700, display: 'inline' }} />
        </Trans>
      </Container>
      <SortingOptions />
      <ListElement value={value} />
    </Section>
  )
}

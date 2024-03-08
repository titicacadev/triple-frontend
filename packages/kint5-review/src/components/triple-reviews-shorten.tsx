/* eslint-disable no-console */
import { ComponentType, useEffect } from 'react'
import { CSSObject } from 'styled-components'
import { FlexBox, Section, Text } from '@titicaca/kint5-core-elements'
import { LoginCtaModalProvider } from '@titicaca/modals'
import { useTranslation } from '@titicaca/next-i18next'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { formatNumber } from '@titicaca/view-utilities'

import { useReviewCount } from '../services'

import { PopularReviews, LatestReviews } from './shorten-list'
import { FilterProvider, useReviewFilters } from './filter-context'
import {
  SortingOptionsProvider,
  useReviewSortingOptions,
} from './sorting-context'
import type { SortingOption, SortingType } from './sorting-context'
import { SortingOptions } from './sorting-options'
import type { ShortenReviewValue } from './shorten-list'
import { ReviewLanguageProvider, useReviewLanguage } from './language-context'

const REVIEWS_SECTION_ID = 'reviews'

interface TripleReviewsShortenProps {
  resourceId: string
  resourceType: string
  regionId?: string
  initialReviewsCount: number
  initialMediaFilter?: boolean
  initialRecentTrip?: boolean
  initialSortingOption?: SortingOption
  sortingType?: SortingType
  placeholderText?: string
  receiverId?: string
  lang: string
  containerCss?: CSSObject
  disable?: boolean
}

/** 트리플 리뷰 (현지인 리뷰) 컴포넌트
 */
export function TripleReviewsShorten({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialRecentTrip,
  initialMediaFilter,
  initialSortingOption = 'recommendation',
  sortingType = 'default',
  placeholderText,
  receiverId,
  containerCss,
  lang,
  disable = false,
}: TripleReviewsShortenProps) {
  return (
    <LoginCtaModalProvider>
      <FilterProvider
        receiverId={receiverId}
        initialRecentTrip={initialRecentTrip}
        initialMediaFilter={initialMediaFilter}
      >
        <SortingOptionsProvider
          type={sortingType}
          resourceId={resourceId}
          initialSortingOption={initialSortingOption}
        >
          <ReviewLanguageProvider reviewLang="ko" userLang={lang}>
            <TripleReviewsShortenComponent
              resourceId={resourceId}
              resourceType={resourceType}
              regionId={regionId}
              initialReviewsCount={initialReviewsCount}
              placeholderText={placeholderText}
              sortingType={sortingType}
              containerCss={containerCss}
              disable={disable}
            />
          </ReviewLanguageProvider>
        </SortingOptionsProvider>
      </FilterProvider>
    </LoginCtaModalProvider>
  )
}

const REVIEW_SHORTEN_LIST_TYPES = {
  recommendation: PopularReviews,
  latest: LatestReviews,
  'star-rating-desc': null,
  'star-rating-asc': null,
}

function TripleReviewsShortenComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  placeholderText,
  sortingType,
  containerCss,
  disable,
}: Omit<
  TripleReviewsShortenProps,
  'initialRecentTrip' | 'initialSortingOption' | 'lang'
>) {
  const { isRecentTrip, isMediaCollection } = useReviewFilters()
  const { selectedOption } = useReviewSortingOptions()
  const { reviewLang } = useReviewLanguage()
  const { t } = useTranslation('common-web')

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

  const ListElement = REVIEW_SHORTEN_LIST_TYPES[
    selectedOption
  ] as ComponentType<{ value: ShortenReviewValue }>
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

  if (reviewsCountData?.reviewsCount === 0) {
    return null
  }

  return (
    <Section
      anchor={REVIEWS_SECTION_ID}
      css={{ margin: '0 16px', padding: 0, ...containerCss }}
    >
      <FlexBox flex css={{ alignItems: 'center', gap: 8 }}>
        <Text css={{ fontSize: 18, fontWeight: 700 }}>
          {t(['hyeonjiin-ribyu', '현지인 리뷰'])}
        </Text>
        {(reviewsCountData?.reviewsCount ?? 0) > 0 ? (
          <Text css={{ fontSize: 18, fontWeight: 700 }}>
            {` ${formatNumber(reviewsCountData?.reviewsCount)}`}
          </Text>
        ) : null}
      </FlexBox>
      <SortingOptions />
      {disable ? null : <ListElement value={value} />}
    </Section>
  )
}

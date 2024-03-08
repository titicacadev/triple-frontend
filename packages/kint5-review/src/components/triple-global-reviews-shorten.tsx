import { useEffect } from 'react'
import { CSSObject } from 'styled-components'
import { FlexBox, Section, Text } from '@titicaca/kint5-core-elements'
import { LoginCtaModalProvider } from '@titicaca/modals'
import { useTranslation } from '@titicaca/next-i18next'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { formatNumber } from '@titicaca/view-utilities'

import { useReviewCount } from '../services'

import { LatestReviews } from './shorten-list'
import { WriteButton } from './write-button'
import { FilterProvider, useReviewFilters } from './filter-context'
import {
  SortingOptionsProvider,
  useReviewSortingOptions,
} from './sorting-context'
import type { SortingType } from './sorting-context'
import { Filters } from './filter'
import { ReviewLanguageProvider, useReviewLanguage } from './language-context'

const REVIEWS_SECTION_ID = 'triple-global-reviews'

interface TripleGlobalReviewsShortenProps {
  resourceId: string
  resourceType: string
  regionId?: string
  initialReviewsCount: number
  initialMediaFilter?: boolean
  initialRecentTrip?: boolean
  sortingType?: SortingType
  placeholderText?: string
  receiverId?: string
  lang: string
  containerCss?: CSSObject
}

export function TripleGlobalReviewsShorten({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialRecentTrip,
  initialMediaFilter,
  sortingType = 'default',
  placeholderText,
  receiverId,
  lang,
  containerCss,
}: TripleGlobalReviewsShortenProps) {
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
          initialSortingOption="latest"
        >
          <ReviewLanguageProvider reviewLang={lang} userLang={lang}>
            <TripleGlobalReviewsShortenComponent
              resourceId={resourceId}
              resourceType={resourceType}
              regionId={regionId}
              initialReviewsCount={initialReviewsCount}
              placeholderText={placeholderText}
              sortingType={sortingType}
              containerCss={containerCss}
            />
          </ReviewLanguageProvider>
        </SortingOptionsProvider>
      </FilterProvider>
    </LoginCtaModalProvider>
  )
}

function TripleGlobalReviewsShortenComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  placeholderText,
  sortingType,
  containerCss,
}: Omit<
  TripleGlobalReviewsShortenProps,
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

  const isRatingOption = selectedOption.startsWith('star-rating')

  const value = {
    isGlobal: true,
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
    <Section
      anchor={REVIEWS_SECTION_ID}
      css={{ margin: '0 16px', padding: 0, ...containerCss }}
    >
      <FlexBox flex css={{ alignItems: 'center', gap: 8 }}>
        <Text css={{ fontSize: 18, fontWeight: 700 }}>
          {t(['ribyu', '리뷰'])}
        </Text>
        {(reviewsCountData?.reviewsCount ?? 0) > 0 ? (
          <Text css={{ fontSize: 18, fontWeight: 700 }}>
            {` ${formatNumber(reviewsCountData?.reviewsCount)}`}
          </Text>
        ) : null}
        <WriteButton
          resourceId={resourceId}
          resourceType={resourceType}
          regionId={regionId}
        />
      </FlexBox>
      <FlexBox
        flex
        css={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          marginTop: 21,
        }}
      >
        <Filters />
      </FlexBox>
      <LatestReviews value={value} />
    </Section>
  )
}

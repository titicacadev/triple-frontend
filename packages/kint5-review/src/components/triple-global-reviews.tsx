import { useEffect } from 'react'
import { Trans } from '@titicaca/next-i18next'
import {
  FlexBox,
  Section,
  Container,
  Text,
} from '@titicaca/kint5-core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import { LoginCtaModalProvider } from '@titicaca/modals'

import { useReviewCount } from '../services'

import { LatestReviewsInfinite } from './infinite-list'
import {
  SortingOptionsProvider,
  useReviewSortingOptions,
} from './sorting-context'
import type { SortingType } from './sorting-context'
import { FilterProvider, useReviewFilters } from './filter-context'
import { Filters } from './filter'
import { ReviewLanguageProvider, useReviewLanguage } from './language-context'

const REVIEWS_SECTION_ID = 'triple-global-reviews'

interface TripleGlobalReviewsProps {
  resourceId: string
  resourceType: string
  regionId?: string
  initialReviewsCount?: number
  initialMediaFilter?: boolean
  initialRecentTrip?: boolean
  sortingType?: SortingType
  placeholderText?: string
  receiverId?: string
  lang: string
}

export function TripleGlobalReviews({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  initialMediaFilter,
  initialRecentTrip,
  sortingType = 'poi',
  placeholderText,
  receiverId,
  lang,
}: TripleGlobalReviewsProps) {
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
          initialSortingOption="latest"
        >
          <ReviewLanguageProvider lang={lang}>
            <TripleGlobalReviewsComponent
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

function TripleGlobalReviewsComponent({
  resourceId,
  resourceType,
  regionId,
  initialReviewsCount,
  placeholderText,
  sortingType,
}: Omit<
  TripleGlobalReviewsProps,
  'initialRecentTrip' | 'initialSortingOption' | 'lang'
>) {
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
            'totalreviewscount-gaeyi-ribyu',
            '<0> {{totalReviewsCount}}</0><1>개의 리뷰</1>',
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
      <LatestReviewsInfinite value={value} />
    </Section>
  )
}

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Section, Container, Text, Button, HR1 } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { fetchMyReviews, writeReview } from './review-api-clients'
import ReviewsPlaceholder from './review-placeholder-with-rating'
import ReviewsList from './review-list'
import { ReviewProps } from './types'
import SortingOptions, { DEFAULT_SORTING_OPTION } from './sorting-options'
import usePaging from './use-paging'

const REVIEWS_SECTION_ID = 'reviews'

const WriteIcon = styled.img`
  margin-top: -5px;
  width: 34px;
  height: 34px;
  float: right;
`

export default function ReviewContainer({
  reviewsCount,
  resourceType,
  regionId,
  appUrlScheme,
  resourceId,
  appNativeActions: { notifyReviewDeleted, showToast },
  shortened,
  onFullListButtonClick,
}: ReviewProps) {
  const [sortingOption, setSortingOption] = useState(DEFAULT_SORTING_OPTION)
  const { isPublic } = useUserAgentContext()
  const [myReview, setMyReview] = useState(undefined)

  useEffect(() => {
    const fetchAndSetMyReview = async () => {
      try {
        const [fetchedMyReview] = await fetchMyReviews({
          resourceId,
          resourceType,
        })

        if (fetchedMyReview) {
          setMyReview(fetchedMyReview)
        }
      } catch (e) {
        // do nothing
      }
    }

    fetchAndSetMyReview()
  }, [resourceId, resourceType, setMyReview])

  const handleWriteButtonClick = (
    e: React.SyntheticEvent,
    rating: number = 0,
  ) => {
    e.stopPropagation()

    if (!isPublic) {
      writeReview({
        appUrlScheme,
        resourceType,
        resourceId,
        regionId,
        rating,
      })
    }
  }

  const handleSortingOptionSelect = (_, sortingOption) =>
    setSortingOption(sortingOption)

  const { reviews, fetchNext } = usePaging({
    sortingOption,
    resourceId,
    resourceType,
    perPage: shortened ? 3 : 20,
  })

  return (
    <Section anchor={REVIEWS_SECTION_ID}>
      <Container>
        {isPublic ? null : (
          <WriteIcon
            src="https://assets.triple.guide/images/btn-com-write@2x.png"
            onClick={handleWriteButtonClick}
          />
        )}
        <Text bold size="huge" color="gray" alpha={1} inline>
          리뷰
        </Text>

        {(reviewsCount || 0) > 0 ? (
          <Text bold size="huge" color="blue" alpha={1} inline>
            {` ${formatNumber(reviewsCount)}`}
          </Text>
        ) : null}
      </Container>

      {shortened && (
        <>
          <ReviewsPlaceholder
            resourceType={resourceType}
            appUrlScheme={appUrlScheme}
            onClick={handleWriteButtonClick}
          />
          {(reviewsCount || 0) > 0 && <HR1 />}
        </>
      )}

      {(reviewsCount || 0) > 1 ? (
        <Container margin={{ top: 23 }} clearing>
          <SortingOptions
            selected={sortingOption}
            onSelect={handleSortingOptionSelect}
          />
        </Container>
      ) : null}

      <ReviewsList
        myReview={myReview}
        reviews={reviews}
        resourceType={resourceType}
        regionId={regionId}
        appUrlScheme={appUrlScheme}
        margin={{ top: (reviewsCount || 0) > 1 ? 18 : 30 }}
        resourceId={resourceId}
        notifyReviewDeleted={(resourceId, reviewId) => {
          myReview && reviewId === myReview.id && setMyReview(null)
          notifyReviewDeleted(resourceId, reviewId)
        }}
        showToast={showToast}
        fetchNext={fetchNext}
      />

      {reviewsCount > 3 && shortened ? (
        <Container margin={{ top: 50 }}>
          <Button
            basic
            fluid
            compact
            size="small"
            onClick={() => onFullListButtonClick()}
          >
            {reviewsCount - 3}개 리뷰 더보기
          </Button>
        </Container>
      ) : null}
    </Section>
  )
}

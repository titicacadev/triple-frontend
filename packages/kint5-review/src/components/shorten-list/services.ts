import { useQuery } from 'react-query'

import { SHORTENED_REVIEWS_COUNT_PER_PAGE } from '../../constants'
import {
  GetPopularReviewsQueryVariables,
  GetLatestReviewsQueryVariables,
  GetReviewsByRatingQueryVariables,
  client,
} from '../../data/graphql'

export function usePopularReviews(
  params: Omit<GetPopularReviewsQueryVariables, 'from' | 'size'>,
) {
  return useQuery(
    [
      'review/getPopularReviews',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    () =>
      client.GetPopularReviews({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
  )
}

export function useLatestReviews(
  params: Omit<GetLatestReviewsQueryVariables, 'from' | 'size'>,
) {
  return useQuery(
    [
      'review/getLatestReviews',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    () =>
      client.GetLatestReviews({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
  )
}

export function useRatingReviews(
  params: Omit<GetReviewsByRatingQueryVariables, 'from' | 'size'>,
) {
  return useQuery(
    [
      'review/getReviewsByRating',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    () =>
      client.GetReviewsByRating({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
  )
}

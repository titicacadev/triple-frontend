import { useQuery } from 'react-query'

import { SHORTENED_REVIEWS_COUNT_PER_PAGE } from '../../constants'
import {
  GetPopularReviewsQueryVariables,
  GetLatestReviewsQueryVariables,
  GetReviewsByRatingQueryVariables,
  client,
  reviewClient,
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
      reviewClient(
        client.GetPopularReviews({
          ...params,
          size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
        }),
      ),
    { refetchOnWindowFocus: false },
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
      reviewClient(
        client.GetLatestReviews({
          ...params,
          size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
        }),
      ),
    { refetchOnWindowFocus: false },
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
      reviewClient(
        client.GetReviewsByRating({
          ...params,
          size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
        }),
      ),
    { refetchOnWindowFocus: false },
  )
}

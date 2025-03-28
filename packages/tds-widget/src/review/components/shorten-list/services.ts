import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { SHORTENED_REVIEWS_COUNT_PER_PAGE } from '../../constants'
import {
  GetPopularReviewsQueryVariables,
  GetLatestReviewsQueryVariables,
  GetReviewsByRatingQueryVariables,
  client,
  GetPopularReviewsQuery,
  GetLatestReviewsQuery,
  GetReviewsByRatingQuery,
  reviewClient,
} from '../../data/graphql'

export function usePopularReviews(
  params: Omit<GetPopularReviewsQueryVariables, 'from' | 'size'>,
): UseQueryResult<GetPopularReviewsQuery> {
  return useQuery({
    queryKey: [
      'review/getPopularReviews',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: () =>
      reviewClient(
        client.GetPopularReviews({
          ...params,
          size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
        }),
      ),
    refetchOnWindowFocus: false,
  })
}

export function useLatestReviews(
  params: Omit<GetLatestReviewsQueryVariables, 'from' | 'size'>,
): UseQueryResult<GetLatestReviewsQuery> {
  return useQuery({
    queryKey: [
      'review/getLatestReviews',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: () =>
      reviewClient(
        client.GetLatestReviews({
          ...params,
          size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
        }),
      ),
    refetchOnWindowFocus: false,
  })
}

export function useRatingReviews(
  params: Omit<GetReviewsByRatingQueryVariables, 'from' | 'size'>,
): UseQueryResult<GetReviewsByRatingQuery> {
  return useQuery({
    queryKey: [
      'review/getReviewsByRating',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: () =>
      reviewClient(
        client.GetReviewsByRating({
          ...params,
          size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
        }),
      ),
    refetchOnWindowFocus: false,
  })
}

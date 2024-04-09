import { useQuery } from '@tanstack/react-query'

import { SHORTENED_REVIEWS_COUNT_PER_PAGE } from '../../constants'
import {
  GetPopularReviewsQueryVariables,
  GetLatestReviewsQueryVariables,
  GetReviewsByRatingQueryVariables,
  getClient,
} from '../../data/graphql'

export function usePopularReviews({
  lang,
  ...params
}: Omit<GetPopularReviewsQueryVariables, 'from' | 'size'> & {
  lang: string
}) {
  return useQuery({
    queryKey: [
      'review/getPopularReviews',
      lang,
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: () =>
      getClient({ lang }).GetPopularReviews({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
  })
}

export function useLatestReviews({
  lang,
  ...params
}: Omit<GetLatestReviewsQueryVariables, 'from' | 'size'> & {
  lang: string
}) {
  return useQuery({
    queryKey: [
      'review/getLatestReviews',
      lang,
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: () =>
      getClient({ lang }).GetLatestReviews({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
  })
}

export function useRatingReviews({
  lang,
  ...params
}: Omit<GetReviewsByRatingQueryVariables, 'from' | 'size'> & {
  lang: string
}) {
  return useQuery({
    queryKey: [
      'review/getReviewsByRating',
      lang,
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: () =>
      getClient({ lang }).GetReviewsByRating({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
  })
}

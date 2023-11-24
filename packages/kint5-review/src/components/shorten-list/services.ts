import { useQuery } from 'react-query'

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
  return useQuery(
    [
      'review/getPopularReviews',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    () =>
      getClient({ lang }).GetPopularReviews({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
  )
}

export function useLatestReviews({
  lang,
  ...params
}: Omit<GetLatestReviewsQueryVariables, 'from' | 'size'> & {
  lang: string
}) {
  return useQuery(
    [
      'review/getLatestReviews',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    () =>
      getClient({ lang }).GetLatestReviews({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
  )
}

export function useRatingReviews({
  lang,
  ...params
}: Omit<GetReviewsByRatingQueryVariables, 'from' | 'size'> & {
  lang: string
}) {
  return useQuery(
    [
      'review/getReviewsByRating',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    () =>
      getClient({ lang }).GetReviewsByRating({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
  )
}

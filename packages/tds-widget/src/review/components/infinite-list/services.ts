import {
  InfiniteData,
  UseInfiniteQueryResult,
  keepPreviousData,
  useInfiniteQuery,
} from '@tanstack/react-query'

import {
  GetPopularReviewsQueryVariables,
  GetLatestReviewsQueryVariables,
  GetReviewsByRatingQueryVariables,
  client,
  GetReviewsByRatingQuery,
  GetLatestReviewsQuery,
  GetPopularReviewsQuery,
} from '../../data/graphql'
import { DEFAULT_REVIEWS_COUNT_PER_PAGE } from '../../constants'

export function useInfinitePopularReviews(
  params: Omit<GetPopularReviewsQueryVariables, 'from' | 'size'>,
): UseInfiniteQueryResult<
  InfiniteData<GetPopularReviewsQuery['popularReviews']>
> {
  return useInfiniteQuery({
    queryKey: [
      'review/getInfinitePopularReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: ({ pageParam }) =>
      client.GetPopularReviews({
        ...params,
        from: (pageParam - 1) * DEFAULT_REVIEWS_COUNT_PER_PAGE,
        size: DEFAULT_REVIEWS_COUNT_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.popularReviews.length === 0) {
        return undefined
      }
      return allPages.length + 1
    },
    select: ({ pageParams, pages }) => ({
      pageParams,
      pages: pages.map((item) => item.popularReviews),
    }),
    placeholderData: keepPreviousData,
  })
}

export function useInfiniteLatestReviews(
  params: Omit<GetLatestReviewsQueryVariables, 'from' | 'size'>,
): UseInfiniteQueryResult<
  InfiniteData<GetLatestReviewsQuery['latestReviews']>
> {
  return useInfiniteQuery({
    queryKey: [
      'review/getInfiniteLatestReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: ({ pageParam }) =>
      client.GetLatestReviews({
        ...params,
        from: (pageParam - 1) * DEFAULT_REVIEWS_COUNT_PER_PAGE,
        size: DEFAULT_REVIEWS_COUNT_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.latestReviews.length === 0) {
        return undefined
      }
      return allPages.length + 1
    },
    select: ({ pageParams, pages }) => ({
      pageParams,
      pages: pages.map((item) => item.latestReviews),
    }),
    placeholderData: keepPreviousData,
  })
}

export function useInfiniteRatingReviews(
  params: Omit<GetReviewsByRatingQueryVariables, 'from' | 'size'>,
): UseInfiniteQueryResult<
  InfiniteData<GetReviewsByRatingQuery['ratingReviews']>
> {
  return useInfiniteQuery({
    queryKey: [
      'review/getInfiniteRatingReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: ({ pageParam }) =>
      client.GetReviewsByRating({
        ...params,
        from: (pageParam - 1) * DEFAULT_REVIEWS_COUNT_PER_PAGE,
        size: DEFAULT_REVIEWS_COUNT_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.ratingReviews.length === 0) {
        return undefined
      }
      return allPages.length + 1
    },
    select: ({ pageParams, pages }) => ({
      pageParams,
      pages: pages.map((item) => item.ratingReviews),
    }),
    placeholderData: keepPreviousData,
  })
}

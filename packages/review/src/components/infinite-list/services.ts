import { useInfiniteQuery } from '@tanstack/react-query'

import {
  GetPopularReviewsQueryVariables,
  GetLatestReviewsQueryVariables,
  GetReviewsByRatingQueryVariables,
  client,
} from '../../data/graphql'
import { DEFAULT_REVIEWS_COUNT_PER_PAGE } from '../../constants'

export function useInfinitePopularReviews(
  params: Omit<GetPopularReviewsQueryVariables, 'from' | 'size'>,
) {
  return useInfiniteQuery({
    queryKey: [
      'review/getInfinitePopularReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: ({ pageParam = 1 }) =>
      client.GetPopularReviews({
        ...params,
        from: (pageParam - 1) * DEFAULT_REVIEWS_COUNT_PER_PAGE,
        size: DEFAULT_REVIEWS_COUNT_PER_PAGE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.popularReviews.length === 0) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
    select: (data) => ({
      pageParams: data.pageParams,
      pages: data.pages.map((item) => item.popularReviews),
    }),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  })
}

export function useInfiniteLatestReviews(
  params: Omit<GetLatestReviewsQueryVariables, 'from' | 'size'>,
) {
  return useInfiniteQuery({
    queryKey: [
      'review/getInfiniteLatestReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: ({ pageParam = 1 }) =>
      client.GetLatestReviews({
        ...params,
        from: (pageParam - 1) * DEFAULT_REVIEWS_COUNT_PER_PAGE,
        size: DEFAULT_REVIEWS_COUNT_PER_PAGE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.latestReviews.length === 0) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  })
}

export function useInfiniteRatingReviews(
  params: Omit<GetReviewsByRatingQueryVariables, 'from' | 'size'>,
) {
  return useInfiniteQuery({
    queryKey: [
      'review/getInfiniteRatingReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    queryFn: ({ pageParam = 1 }) =>
      client.GetReviewsByRating({
        ...params,
        from: (pageParam - 1) * DEFAULT_REVIEWS_COUNT_PER_PAGE,
        size: DEFAULT_REVIEWS_COUNT_PER_PAGE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.ratingReviews.length === 0) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  })
}

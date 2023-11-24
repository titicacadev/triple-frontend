import { useInfiniteQuery } from 'react-query'

import {
  GetPopularReviewsQueryVariables,
  GetLatestReviewsQueryVariables,
  GetReviewsByRatingQueryVariables,
  getClient,
} from '../../data/graphql'
import { DEFAULT_REVIEWS_COUNT_PER_PAGE } from '../../constants'
import { useReviewLanguage } from '../language-context'

export function useInfinitePopularReviews(
  params: Omit<GetPopularReviewsQueryVariables, 'from' | 'size'>,
) {
  const { lang } = useReviewLanguage()

  return useInfiniteQuery(
    [
      'review/getInfinitePopularReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    ({ pageParam = 1 }) =>
      getClient({ lang }).GetPopularReviews({
        ...params,
        from: (pageParam - 1) * DEFAULT_REVIEWS_COUNT_PER_PAGE,
        size: DEFAULT_REVIEWS_COUNT_PER_PAGE,
      }),
    {
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
      keepPreviousData: true,
    },
  )
}

export function useInfiniteLatestReviews(
  params: Omit<GetLatestReviewsQueryVariables, 'from' | 'size'>,
) {
  const { lang } = useReviewLanguage()

  return useInfiniteQuery(
    [
      'review/getInfiniteLatestReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    ({ pageParam = 1 }) =>
      getClient({ lang }).GetLatestReviews({
        ...params,
        from: (pageParam - 1) * DEFAULT_REVIEWS_COUNT_PER_PAGE,
        size: DEFAULT_REVIEWS_COUNT_PER_PAGE,
      }),
    {
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
      keepPreviousData: true,
    },
  )
}

export function useInfiniteRatingReviews(
  params: Omit<GetReviewsByRatingQueryVariables, 'from' | 'size'>,
) {
  const { lang } = useReviewLanguage()

  return useInfiniteQuery(
    [
      'review/getInfiniteRatingReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    ({ pageParam = 1 }) =>
      getClient({ lang }).GetReviewsByRating({
        ...params,
        from: (pageParam - 1) * DEFAULT_REVIEWS_COUNT_PER_PAGE,
        size: DEFAULT_REVIEWS_COUNT_PER_PAGE,
      }),
    {
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
      keepPreviousData: true,
    },
  )
}

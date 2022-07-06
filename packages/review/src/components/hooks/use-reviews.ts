import { GraphQLClient } from 'graphql-request'
import { useInfiniteQuery } from 'react-query'

import {
  GetLatestReviewsDocument,
  GetPopularReviewsDocument,
  useGetMyReviewQuery,
  useGetReviewsCountQuery,
  useGetReviewSpecificationQuery,
} from '../../data/generated/graphql'
import { ReviewData } from '../types'

export const graphqlClient = new GraphQLClient('/api/graphql')

interface UseReviewsProps {
  resourceType: string
  resourceId: string
  recentTrip: boolean
  latestReview: boolean
  perPage: number
}

export function useReviews({
  resourceType,
  resourceId,
  recentTrip,
  latestReview,
  perPage,
}: UseReviewsProps) {
  const {
    data: latestReviewsData,
    fetchNextPage: latestReviewsFetch,
    isFetchedAfterMount: isLatestReviewsAfterMount,
  } = useInfiniteQuery(
    ['review/getLatestReviews', recentTrip],
    async ({ pageParam = 1 }) => {
      const { latestReviews } = await graphqlClient.request(
        GetLatestReviewsDocument,
        {
          resourceType,
          resourceId,
          recentTrip,
          from: (pageParam - 1) * perPage,
          size: perPage,
        },
      )

      return {
        latestReviews,
        nextPage: pageParam + 1,
        isLast: latestReviews.length === 0,
      }
    },
    {
      getNextPageParam: ({ isLast, nextPage }) =>
        !isLast ? nextPage : undefined,
      select: ({ pages, pageParams }) => ({
        pages: pages.reduce(
          (reviews: ReviewData[], { latestReviews }) => [
            ...reviews,
            ...latestReviews,
          ],
          [],
        ),
        pageParams,
      }),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )

  const {
    data: popularReviewsData,
    fetchNextPage: popularReviewsFetch,
    isFetchedAfterMount: isPopularReviewsAfterMount,
  } = useInfiniteQuery(
    ['review/getPopularReviews', recentTrip],
    async ({ pageParam = 1 }) => {
      const { popularReviews } = await graphqlClient.request(
        GetPopularReviewsDocument,
        {
          resourceType,
          resourceId,
          recentTrip,
          from: (pageParam - 1) * perPage,
          size: perPage,
        },
      )

      return {
        popularReviews,
        nextPage: pageParam + 1,
        isLast: popularReviews.length === 0,
      }
    },
    {
      getNextPageParam: ({ isLast, nextPage }) =>
        !isLast ? nextPage : undefined,
      select: ({ pages, pageParams }) => ({
        pages: pages.reduce(
          (reviews: ReviewData[], { popularReviews }) => [
            ...reviews,
            ...popularReviews,
          ],
          [],
        ),
        pageParams,
      }),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )

  return {
    reviewsData:
      (latestReview ? latestReviewsData?.pages : popularReviewsData?.pages) ||
      [],
    isLoaded: isLatestReviewsAfterMount && isPopularReviewsAfterMount,
    moreFetcher: latestReview ? latestReviewsFetch : popularReviewsFetch,
  }
}

export function useReviewCount({
  resourceType,
  resourceId,
}: Pick<UseReviewsProps, 'resourceType' | 'resourceId'>) {
  const { data: reviewsCountData } = useGetReviewsCountQuery(
    graphqlClient,
    {
      resourceType,
      resourceId,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )
  return reviewsCountData
}

export function useDescriptions({
  resourceType,
  resourceId,
}: Pick<UseReviewsProps, 'resourceType' | 'resourceId'>) {
  const { data: descriptionsData } = useGetReviewSpecificationQuery(
    graphqlClient,
    {
      resourceType,
      resourceId,
    },
    {
      select: ({ reviewsSpecification }) =>
        reviewsSpecification?.rating?.description || [],
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )

  return descriptionsData
}

export function useMyReview({
  resourceType,
  resourceId,
}: Pick<UseReviewsProps, 'resourceType' | 'resourceId'>) {
  const { data: myReviewData } = useGetMyReviewQuery(graphqlClient, {
    resourceType,
    resourceId,
  })

  return myReviewData
}

import { GraphQLClient } from 'graphql-request'
import { useInfiniteQuery } from 'react-query'

import {
  GetLatestReviewsDocument,
  GetPopularReviewsDocument,
  useGetMyReviewQuery,
  useGetReviewsCountQuery,
  useGetReviewSpecificationQuery,
} from '../../data/generated/graphql'

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
  const { data: latestReviewsData, fetchNextPage: latestReviewsFetch } =
    useInfiniteQuery(
      ['getLatestReviews', recentTrip],
      async ({ pageParam = 1 }) => {
        const { latestReviews } = await new GraphQLClient(
          '/api/graphql',
        ).request(GetLatestReviewsDocument, {
          resourceType,
          resourceId,
          recentTrip,
          from: (pageParam - 1) * perPage,
          size: perPage,
        })

        return {
          latestReviews,
          nextPage: pageParam + 1,
          isLast: latestReviews.length === 0,
        }
      },
      {
        getNextPageParam: ({ isLast, nextPage }) =>
          !isLast ? nextPage : undefined,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    )

  const { data: popularReviewsData, fetchNextPage: popularReviewsFetch } =
    useInfiniteQuery(
      ['getPopularReviews', recentTrip],
      async ({ pageParam = 1 }) => {
        const { popularReviews } = await new GraphQLClient(
          '/api/graphql',
        ).request(GetPopularReviewsDocument, {
          resourceType,
          resourceId,
          recentTrip,
          from: (pageParam - 1) * perPage,
          size: perPage,
        })

        return {
          popularReviews,
          nextPage: pageParam + 1,
          isLast: popularReviews.length === 0,
        }
      },
      {
        getNextPageParam: ({ isLast, nextPage }) =>
          !isLast ? nextPage : undefined,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    )

  const { data: reviewCountData } = useGetReviewsCountQuery(
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
  const { data: descriptionsData } = useGetReviewSpecificationQuery(
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
  const { data: myReviewData } = useGetMyReviewQuery(graphqlClient, {
    resourceType,
    resourceId,
  })

  return {
    reviewCountData,
    myReviewData,
    descriptionsData,
    latestReviewsData,
    popularReviewsData,
    moreFetcher: latestReview ? latestReviewsFetch : popularReviewsFetch,
  }
}

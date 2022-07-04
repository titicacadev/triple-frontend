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
  const {
    data: latestReviewsData,
    fetchNextPage: latestReviewsFetch,
    isRefetching: latestReviewsRefetching,
  } = useInfiniteQuery(
    ['getLatestReviews', recentTrip],
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
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )

  const {
    data: popularReviewsData,
    fetchNextPage: popularReviewsFetch,
    isRefetching: popularReviewsRefetching,
  } = useInfiniteQuery(
    ['getPopularReviews', recentTrip],
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
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )

  const { data: reviewCountData, isFetching: reviewCountFetching } =
    useGetReviewsCountQuery(
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
  const { data: descriptionsData, isFetching: descriptionFetching } =
    useGetReviewSpecificationQuery(
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
    isLoading:
      (latestReviewsRefetching && popularReviewsRefetching) ||
      (reviewCountFetching && descriptionFetching),
    moreFetcher: latestReview ? latestReviewsFetch : popularReviewsFetch,
  }
}

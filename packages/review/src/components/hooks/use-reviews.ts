import { useInfiniteQuery, useQueries } from 'react-query'
import { useMemo } from 'react'

import { graphqlInfiniteQuery, graphqlQuery } from '../../data/graphql/request'
import {
  GetLatestReviewsDocument,
  GetMyReviewDocument,
  GetPopularReviewsDocument,
  GetReviewsCountDocument,
  GetReviewSpecificationDocument,
} from '../../data/generated/graphql'

interface UseReviewsProps {
  resourceType: string
  resourceId: string
  recentTrip: boolean
  sortingOption?: string
  perPage: number
}

export function useReviews({
  resourceType,
  resourceId,
  recentTrip,
  sortingOption,
  perPage,
}: UseReviewsProps) {
  const latestReview = useMemo(
    () => sortingOption === 'latest',
    [sortingOption],
  )

  const { data: latestReviewsData, fetchNextPage: latestReviewsFetch } =
    useInfiniteQuery(
      ['getLatestReviews', recentTrip],
      async ({ pageParam = 1 }) => {
        const { getLatestReviews } = await graphqlInfiniteQuery({
          query: GetLatestReviewsDocument,
          variables: {
            resourceType,
            resourceId,
            recentTrip,
            from: (pageParam - 1) * perPage,
            size: perPage,
          },
        })

        return {
          getLatestReviews,
          nextPage: pageParam + 1,
          isLast: getLatestReviews.length === 0,
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
        const { getPopularReviews } = await graphqlInfiniteQuery({
          query: GetPopularReviewsDocument,
          variables: {
            resourceType,
            resourceId,
            recentTrip,
            from: (pageParam - 1) * perPage,
            size: perPage,
          },
        })

        return {
          getPopularReviews,
          nextPage: pageParam + 1,
          isLast: getPopularReviews.length === 0,
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

  const [
    { data: reviewCountData },
    { data: myReviewData },
    { data: descriptionsData },
  ] = useQueries([
    {
      queryKey: 'reviewCount',
      queryFn: graphqlQuery({
        query: GetReviewsCountDocument,
        variables: { resourceType, resourceId },
      }),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
    {
      queryKey: 'myReview',
      queryFn: graphqlQuery({
        query: GetMyReviewDocument,
        variables: { resourceType, resourceId },
      }),
    },
    {
      queryKey: 'descriptions',
      queryFn: graphqlQuery({
        query: GetReviewSpecificationDocument,
        variables: { resourceType, resourceId },
      }),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  ])

  return {
    data: [
      reviewCountData,
      myReviewData,
      descriptionsData,
      latestReviewsData,
      popularReviewsData,
    ],
    moreFetcher: latestReview ? latestReviewsFetch : popularReviewsFetch,
  }
}

import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'

import {
  client,
  GetMyReviewQueryVariables,
  GetReviewSpecificationQueryVariables,
  GetReviewsCountQueryVariables,
  LikeReviewMutationVariables,
  UnlikeReviewMutationVariables,
  DeleteReviewMutationVariables,
  GetPopularReviewsQueryVariables,
  GetLatestReviewsQueryVariables,
} from '../data/graphql'
import {
  DEFAULT_REVIEWS_COUNT_PER_PAGE,
  SHORTENED_REVIEWS_COUNT_PER_PAGE,
} from '../constants'

import { TripleQueryClientContext } from './triple-react-query'

export function usePopularReviews(
  params: Omit<GetPopularReviewsQueryVariables, 'from' | 'size'>,
) {
  return useQuery(
    [
      'review/getPopularReviews',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    () =>
      client.GetPopularReviews({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
    { refetchOnMount: false, context: TripleQueryClientContext },
  )
}

export function useLatestReviews(
  params: Omit<GetLatestReviewsQueryVariables, 'from' | 'size'>,
) {
  return useQuery(
    [
      'review/getLatestReviews',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    () =>
      client.GetLatestReviews({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
    { refetchOnMount: false, context: TripleQueryClientContext },
  )
}

export function useInfinitePopularReviews(
  params: Omit<GetPopularReviewsQueryVariables, 'from' | 'size'>,
) {
  return useInfiniteQuery(
    [
      'review/getPopularReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    ({ pageParam = 1 }) =>
      client.GetPopularReviews({
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
      refetchOnMount: false,
      context: TripleQueryClientContext,
    },
  )
}

export function useInfiniteLatestReviews(
  params: Omit<GetLatestReviewsQueryVariables, 'from' | 'size'>,
) {
  return useInfiniteQuery(
    [
      'review/getLatestReviews',
      { ...params, size: DEFAULT_REVIEWS_COUNT_PER_PAGE },
    ],
    ({ pageParam = 1 }) =>
      client.GetLatestReviews({
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
      refetchOnMount: false,
      context: TripleQueryClientContext,
    },
  )
}

export function useReviewCount(
  params: GetReviewsCountQueryVariables,
  initiaValue?: number,
) {
  return useQuery(
    ['reviews/getReviewCount'],
    () => client.GetReviewsCount(params),
    {
      initialData: initiaValue
        ? {
            __typename: 'Query',
            reviewsCount: initiaValue,
          }
        : undefined,
      refetchOnMount: false,
      context: TripleQueryClientContext,
    },
  )
}

export function useDescriptions(params: GetReviewSpecificationQueryVariables) {
  return useQuery(
    ['review/getReviewSpecification', params],
    () => client.GetReviewSpecification(params),
    { refetchOnMount: false, context: TripleQueryClientContext },
  )
}

export function useMyReview(params: GetMyReviewQueryVariables) {
  return useQuery(
    ['review/getMyReview', params],
    () => client.GetMyReview(params),
    { refetchOnMount: false, context: TripleQueryClientContext },
  )
}

export function useLikeReviewMutation() {
  const { notifyReviewLiked } = useTripleClientActions()

  return useMutation(
    (variables: LikeReviewMutationVariables & { resourceId: string }) =>
      client.LikeReview({ reviewId: variables.reviewId }),
    {
      onSuccess: (data, variables) => {
        notifyReviewLiked?.(variables.resourceId, variables.reviewId)
      },
      context: TripleQueryClientContext,
    },
  )
}

export function useUnlikeReviewMutation() {
  const { notifyReviewUnliked } = useTripleClientActions()

  return useMutation(
    (variables: UnlikeReviewMutationVariables & { resourceId: string }) =>
      client.UnlikeReview({ reviewId: variables.reviewId }),
    {
      onSuccess: (data, variables) => {
        notifyReviewUnliked?.(variables.resourceId, variables.reviewId)
      },
      context: TripleQueryClientContext,
    },
  )
}

export function useDeleteReviewMutation() {
  const { notifyReviewDeleted } = useTripleClientActions()

  return useMutation(
    (variables: DeleteReviewMutationVariables & { resourceId: string }) =>
      client.DeleteReview(variables),
    {
      onSuccess: (data, variables) => {
        notifyReviewDeleted?.(variables.resourceId, variables.id)
      },
      context: TripleQueryClientContext,
    },
  )
}

import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

import {
  DEFAULT_REVIEWS_COUNT_PER_PAGE,
  SHORTENED_REVIEWS_COUNT_PER_PAGE,
} from '../constants'
import {
  BaseReviewFragment,
  DeleteReviewMutationVariables,
  GetMyReviewQuery,
  GetLatestReviewsQuery,
  GetLatestReviewsQueryVariables,
  GetReviewsByRatingQueryVariables,
  GetMyReviewQueryVariables,
  GetPopularReviewsQuery,
  GetPopularReviewsQueryVariables,
  GetReviewSpecificationQueryVariables,
  GetReviewsCountQueryVariables,
  LikeReviewMutationVariables,
  UnlikeReviewMutationVariables,
  client,
} from '../data/graphql'

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
  )
}

export function useRatingReviews(
  params: Omit<GetReviewsByRatingQueryVariables, 'from' | 'size'>,
) {
  return useQuery(
    [
      'review/getReviewsByRating',
      { ...params, size: SHORTENED_REVIEWS_COUNT_PER_PAGE },
    ],
    () =>
      client.GetReviewsByRating({
        ...params,
        size: SHORTENED_REVIEWS_COUNT_PER_PAGE,
      }),
  )
}

export function useInfinitePopularReviews(
  params: Omit<GetPopularReviewsQueryVariables, 'from' | 'size'>,
) {
  return useInfiniteQuery(
    [
      'review/getInfinitePopularReviews',
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
    },
  )
}

export function useInfiniteLatestReviews(
  params: Omit<GetLatestReviewsQueryVariables, 'from' | 'size'>,
) {
  return useInfiniteQuery(
    [
      'review/getInfiniteLatestReviews',
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
    },
  )
}

export function useReviewCount(
  params: GetReviewsCountQueryVariables,
  initialValue?: number,
) {
  return useQuery(
    ['reviews/getReviewCount', { ...params }],
    () => client.GetReviewsCount(params),
    {
      initialData: initialValue
        ? {
            __typename: 'Query',
            reviewsCount: initialValue,
          }
        : undefined,
    },
  )
}

export function useDescriptions(params: GetReviewSpecificationQueryVariables) {
  return useQuery(['review/getReviewSpecification', params], () =>
    client.GetReviewSpecification(params),
  )
}

export function useMyReview(params: GetMyReviewQueryVariables) {
  return useQuery(['review/getMyReview', params], () =>
    client.GetMyReview(params),
  )
}

export function useLikeReviewMutation() {
  const { notifyReviewLiked } = useTripleClientActions()
  const queryClient = useQueryClient()

  return useMutation(
    (variables: LikeReviewMutationVariables & { resourceId: string }) =>
      client.LikeReview({ reviewId: variables.reviewId }),
    {
      onSuccess: (data, variables) => {
        notifyReviewLiked?.(variables.resourceId, variables.reviewId)

        const updater = (review: BaseReviewFragment) =>
          review.id === variables.reviewId
            ? {
                ...review,
                liked: !review.liked,
                likesCount: review.likesCount + 1,
              }
            : review

        queryClient.setQueriesData<GetPopularReviewsQuery | undefined>(
          ['review/getPopularReviews'],
          (old) =>
            old
              ? {
                  ...old,
                  popularReviews: old.popularReviews.map(updater),
                }
              : old,
        )
        queryClient.setQueriesData<GetLatestReviewsQuery | undefined>(
          ['review/getLatestReviews'],
          (old) =>
            old
              ? {
                  ...old,
                  latestReviews: old.latestReviews.map(updater),
                }
              : old,
        )
        queryClient.setQueriesData<
          InfiniteData<GetPopularReviewsQuery> | undefined
        >(['review/getInfinitePopularReviews'], (old) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  popularReviews: page.popularReviews.map(updater),
                })),
              }
            : old,
        )
        queryClient.setQueriesData<
          InfiniteData<GetLatestReviewsQuery> | undefined
        >(['review/getInfiniteLatestReviews'], (old) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  latestReviews: page.latestReviews.map(updater),
                })),
              }
            : old,
        )
      },
    },
  )
}

export function useUnlikeReviewMutation() {
  const { notifyReviewUnliked } = useTripleClientActions()
  const queryClient = useQueryClient()

  return useMutation(
    (variables: UnlikeReviewMutationVariables & { resourceId: string }) =>
      client.UnlikeReview({ reviewId: variables.reviewId }),
    {
      onSuccess: (data, variables) => {
        notifyReviewUnliked?.(variables.resourceId, variables.reviewId)

        const updater = (review: BaseReviewFragment) =>
          review.id === variables.reviewId
            ? {
                ...review,
                liked: !review.liked,
                likesCount: review.likesCount - 1,
              }
            : review

        queryClient.setQueriesData<GetPopularReviewsQuery | undefined>(
          ['review/getPopularReviews'],
          (old) =>
            old
              ? {
                  ...old,
                  popularReviews: old.popularReviews.map(updater),
                }
              : old,
        )
        queryClient.setQueriesData<GetLatestReviewsQuery | undefined>(
          ['review/getLatestReviews'],
          (old) =>
            old
              ? {
                  ...old,
                  latestReviews: old.latestReviews.map(updater),
                }
              : old,
        )
        queryClient.setQueriesData<
          InfiniteData<GetPopularReviewsQuery> | undefined
        >(['review/getInfinitePopularReviews'], (old) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  popularReviews: page.popularReviews.map(updater),
                })),
              }
            : old,
        )
        queryClient.setQueriesData<
          InfiniteData<GetLatestReviewsQuery> | undefined
        >(['review/getInfiniteLatestReviews'], (old) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  latestReviews: page.latestReviews.map(updater),
                })),
              }
            : old,
        )
      },
    },
  )
}

export function useDeleteReviewMutation() {
  const { notifyReviewDeleted } = useTripleClientActions()
  const queryClient = useQueryClient()

  return useMutation(
    (variables: DeleteReviewMutationVariables & { resourceId: string }) =>
      client.DeleteReview(variables),
    {
      onSuccess: (data, variables) => {
        notifyReviewDeleted?.(variables.resourceId, variables.id)

        const updater = (review: BaseReviewFragment) =>
          review.id !== variables.id

        queryClient.setQueriesData<GetMyReviewQuery | undefined>(
          ['review/getMyReview'],
          (old) =>
            old
              ? {
                  ...old,
                  myReview: null,
                }
              : old,
        )
        queryClient.setQueriesData<GetPopularReviewsQuery | undefined>(
          ['review/getPopularReviews'],
          (old) =>
            old
              ? {
                  ...old,
                  popularReviews: old.popularReviews.filter(updater),
                }
              : old,
        )
        queryClient.setQueriesData<GetLatestReviewsQuery | undefined>(
          ['review/getLatestReviews'],
          (old) =>
            old
              ? {
                  ...old,
                  latestReviews: old.latestReviews.filter(updater),
                }
              : old,
        )
        queryClient.setQueriesData<
          InfiniteData<GetPopularReviewsQuery> | undefined
        >(['review/getInfinitePopularReviews'], (old) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  popularReviews: page.popularReviews.filter(updater),
                })),
              }
            : old,
        )
        queryClient.setQueriesData<
          InfiniteData<GetLatestReviewsQuery> | undefined
        >(['review/getInfiniteLatestReviews'], (old) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  latestReviews: page.latestReviews.filter(updater),
                })),
              }
            : old,
        )
      },
    },
  )
}

import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  BaseReviewFragment,
  DeleteReviewMutationVariables,
  GetMyReviewQuery,
  GetLatestReviewsQuery,
  GetReviewsByRatingQuery,
  GetMyReviewQueryVariables,
  GetPopularReviewsQuery,
  GetReviewSpecificationQueryVariables,
  GetReviewsCountQueryVariables,
  LikeReviewMutationVariables,
  UnlikeReviewMutationVariables,
  client,
} from '../data/graphql'

export function useReviewCount(
  params: GetReviewsCountQueryVariables,
  initialValue?: number,
) {
  return useQuery({
    queryKey: ['reviews/getReviewCount', params],
    queryFn: () => client.GetReviewsCount(params),
    refetchOnWindowFocus: false,
    initialData: initialValue
      ? {
          __typename: 'Query',
          reviewsCount: initialValue,
        }
      : undefined,
  })
}

export function useDescriptions(params: GetReviewSpecificationQueryVariables) {
  return useQuery({
    queryKey: ['review/getReviewSpecification', params],
    queryFn: () => client.GetReviewSpecification(params),
    refetchOnWindowFocus: false,
  })
}

export function useMyReview(params: GetMyReviewQueryVariables) {
  return useQuery({
    queryKey: ['review/getMyReview', params],
    queryFn: () => client.GetMyReview(params),
    refetchOnWindowFocus: false,
    enabled: typeof window !== 'undefined',
  })
}

export function useLikeReviewMutation() {
  const { notifyReviewLiked } = useTripleClientActions()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      variables: LikeReviewMutationVariables & { resourceId: string },
    ) => client.LikeReview({ reviewId: variables.reviewId }),

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

      queryClient.setQueriesData(
        { queryKey: ['review/getMyReview'] },
        (old: GetMyReviewQuery | undefined) =>
          old
            ? {
                ...old,
                ...(old.myReview && { myReview: updater(old.myReview) }),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getPopularReviews'] },
        (old: GetPopularReviewsQuery | undefined) =>
          old
            ? {
                ...old,
                popularReviews: old.popularReviews.map(updater),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getLatestReviews'] },
        (old: GetLatestReviewsQuery | undefined) =>
          old
            ? {
                ...old,
                latestReviews: old.latestReviews.map(updater),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getReviewsByRating'] },
        (old: GetReviewsByRatingQuery | undefined) =>
          old
            ? {
                ...old,
                ratingReviews: old.ratingReviews.map(updater),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getInfinitePopularReviews'] },
        (old: InfiniteData<GetPopularReviewsQuery> | undefined) =>
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

      queryClient.setQueriesData(
        { queryKey: ['review/getInfiniteLatestReviews'] },
        (old: InfiniteData<GetLatestReviewsQuery> | undefined) =>
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

      queryClient.setQueriesData(
        { queryKey: ['review/getInfiniteRatingReviews'] },
        (old: InfiniteData<GetReviewsByRatingQuery> | undefined) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  ratingReviews: page.ratingReviews.map(updater),
                })),
              }
            : old,
      )
    },
  })
}

export function useUnlikeReviewMutation() {
  const { notifyReviewUnliked } = useTripleClientActions()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      variables: UnlikeReviewMutationVariables & { resourceId: string },
    ) => client.UnlikeReview({ reviewId: variables.reviewId }),

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

      queryClient.setQueriesData(
        { queryKey: ['review/getMyReview'] },
        (old: GetMyReviewQuery | undefined) =>
          old
            ? {
                ...old,
                ...(old.myReview && { myReview: updater(old.myReview) }),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getPopularReviews'] },
        (old: GetPopularReviewsQuery | undefined) =>
          old
            ? {
                ...old,
                popularReviews: old.popularReviews.map(updater),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getLatestReviews'] },
        (old: GetLatestReviewsQuery | undefined) =>
          old
            ? {
                ...old,
                latestReviews: old.latestReviews.map(updater),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getReviewsByRating'] },
        (old: GetReviewsByRatingQuery | undefined) =>
          old
            ? {
                ...old,
                ratingReviews: old.ratingReviews.map(updater),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getInfinitePopularReviews'] },
        (old: InfiniteData<GetPopularReviewsQuery> | undefined) =>
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

      queryClient.setQueriesData(
        { queryKey: ['review/getInfiniteLatestReviews'] },
        (old: InfiniteData<GetLatestReviewsQuery> | undefined) =>
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

      queryClient.setQueriesData(
        { queryKey: ['review/getInfiniteRatingReviews'] },
        (old: InfiniteData<GetReviewsByRatingQuery> | undefined) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  ratingReviews: page.ratingReviews.map(updater),
                })),
              }
            : old,
      )
    },
  })
}

export function useDeleteReviewMutation() {
  const { notifyReviewDeleted } = useTripleClientActions()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      variables: DeleteReviewMutationVariables & {
        resourceId: string
        resourceType: string
      },
    ) => client.DeleteReview(variables),

    onSuccess: (data, variables) => {
      notifyReviewDeleted?.(
        variables.resourceId,
        variables.id,
        variables.resourceType,
      )

      const updater = (review: BaseReviewFragment) => review.id !== variables.id

      queryClient.setQueriesData(
        { queryKey: ['review/getMyReview'] },
        (old: GetMyReviewQuery | undefined) =>
          old
            ? {
                ...old,
                myReview: null,
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getPopularReviews'] },
        (old: GetPopularReviewsQuery | undefined) =>
          old
            ? {
                ...old,
                popularReviews: old.popularReviews.filter(updater),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getLatestReviews'] },
        (old: GetLatestReviewsQuery | undefined) =>
          old
            ? {
                ...old,
                latestReviews: old.latestReviews.filter(updater),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getReviewsByRating'] },
        (old: GetReviewsByRatingQuery | undefined) =>
          old
            ? {
                ...old,
                ratingReviews: old.ratingReviews.filter(updater),
              }
            : old,
      )

      queryClient.setQueriesData(
        { queryKey: ['review/getInfinitePopularReviews'] },
        (old: InfiniteData<GetPopularReviewsQuery> | undefined) =>
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

      queryClient.setQueriesData(
        { queryKey: ['review/getInfiniteLatestReviews'] },
        (old: InfiniteData<GetLatestReviewsQuery> | undefined) =>
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

      queryClient.setQueriesData(
        { queryKey: ['review/getInfiniteRatingReviews'] },
        (old: InfiniteData<GetReviewsByRatingQuery> | undefined) =>
          old
            ? {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  ratingReviews: page.ratingReviews.filter(updater),
                })),
              }
            : old,
      )
    },
  })
}

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
  getClient,
} from '../data/graphql'

export function useReviewCount(
  { lang, ...params }: GetReviewsCountQueryVariables & { lang: string },
  initialValue?: number,
) {
  return useQuery({
    queryKey: ['reviews/getReviewCount', lang, params],
    queryFn: () => getClient({ lang }).GetReviewsCount(params),
    initialData: initialValue
      ? {
          __typename: 'Query',
          reviewsCount: initialValue,
        }
      : undefined,
  })
}

export function useDescriptions({
  lang,
  ...params
}: GetReviewSpecificationQueryVariables & { lang: string }) {
  return useQuery({
    queryKey: ['review/getReviewSpecification', lang, params],
    queryFn: () => getClient({ lang }).GetReviewSpecification(params),
  })
}

export function useMyReview({
  lang,
  ...params
}: GetMyReviewQueryVariables & { lang: string }) {
  return useQuery({
    queryKey: ['review/getMyReview', lang, params],
    queryFn: () => getClient({ lang }).GetMyReview(params),
  })
}

export function useLikeReviewMutation({ lang }: { lang: string }) {
  const { notifyReviewLiked } = useTripleClientActions()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      variables: LikeReviewMutationVariables & { resourceId: string },
    ) => getClient({ lang }).LikeReview({ reviewId: variables.reviewId }),
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
      queryClient.setQueriesData<GetReviewsByRatingQuery | undefined>(
        ['review/getReviewsByRating'],
        (old) =>
          old
            ? {
                ...old,
                ratingReviews: old.ratingReviews.map(updater),
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
      queryClient.setQueriesData<
        InfiniteData<GetReviewsByRatingQuery> | undefined
      >(['review/getInfiniteRatingReviews'], (old) =>
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

export function useUnlikeReviewMutation({ lang }: { lang: string }) {
  const { notifyReviewUnliked } = useTripleClientActions()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      variables: UnlikeReviewMutationVariables & { resourceId: string },
    ) => getClient({ lang }).UnlikeReview({ reviewId: variables.reviewId }),
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
      queryClient.setQueriesData<GetReviewsByRatingQuery | undefined>(
        ['review/getReviewsByRating'],
        (old) =>
          old
            ? {
                ...old,
                ratingReviews: old.ratingReviews.map(updater),
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
      queryClient.setQueriesData<
        InfiniteData<GetReviewsByRatingQuery> | undefined
      >(['review/getInfiniteRatingReviews'], (old) =>
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

export function useDeleteReviewMutation({ lang }: { lang: string }) {
  const { notifyReviewDeleted } = useTripleClientActions()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      variables: DeleteReviewMutationVariables & { resourceId: string },
    ) => getClient({ lang }).DeleteReview(variables),
    onSuccess: (data, variables) => {
      notifyReviewDeleted?.(variables.resourceId, variables.id)

      const updater = (review: BaseReviewFragment) => review.id !== variables.id

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
      queryClient.setQueriesData<GetReviewsByRatingQuery | undefined>(
        ['review/getReviewsByRating'],
        (old) =>
          old
            ? {
                ...old,
                ratingReviews: old.ratingReviews.filter(updater),
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
      queryClient.setQueriesData<
        InfiniteData<GetReviewsByRatingQuery> | undefined
      >(['review/getInfiniteRatingReviews'], (old) =>
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

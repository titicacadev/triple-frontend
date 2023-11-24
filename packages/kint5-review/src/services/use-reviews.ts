import { useTripleClientActions } from '@titicaca/react-triple-client-interfaces'
import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

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
import { useReviewLanguage } from '../components/language-context'

export function useReviewCount(
  params: GetReviewsCountQueryVariables,
  initialValue?: number,
) {
  const { lang } = useReviewLanguage()

  return useQuery(
    ['reviews/getReviewCount', { ...params }],
    () => getClient({ lang }).GetReviewsCount(params),
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
  const { lang } = useReviewLanguage()

  return useQuery(['review/getReviewSpecification', params], () =>
    getClient({ lang }).GetReviewSpecification(params),
  )
}

export function useMyReview(params: GetMyReviewQueryVariables) {
  const { lang } = useReviewLanguage()

  return useQuery(['review/getMyReview', params], () =>
    getClient({ lang }).GetMyReview(params),
  )
}

export function useLikeReviewMutation() {
  const { notifyReviewLiked } = useTripleClientActions()
  const queryClient = useQueryClient()
  const { lang } = useReviewLanguage()

  return useMutation(
    (variables: LikeReviewMutationVariables & { resourceId: string }) =>
      getClient({ lang }).LikeReview({ reviewId: variables.reviewId }),
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
    },
  )
}

export function useUnlikeReviewMutation() {
  const { notifyReviewUnliked } = useTripleClientActions()
  const queryClient = useQueryClient()
  const { lang } = useReviewLanguage()

  return useMutation(
    (variables: UnlikeReviewMutationVariables & { resourceId: string }) =>
      getClient({ lang }).UnlikeReview({ reviewId: variables.reviewId }),
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
    },
  )
}

export function useDeleteReviewMutation() {
  const { notifyReviewDeleted } = useTripleClientActions()
  const queryClient = useQueryClient()
  const { lang } = useReviewLanguage()

  return useMutation(
    (variables: DeleteReviewMutationVariables & { resourceId: string }) =>
      getClient({ lang }).DeleteReview(variables),
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
    },
  )
}

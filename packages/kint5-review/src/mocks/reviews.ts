import { graphql } from 'msw'

import {
  DeleteReviewMutation,
  DeleteReviewMutationVariables,
  GetLatestReviewsQuery,
  GetLatestReviewsQueryVariables,
  GetMyReviewQuery,
  GetMyReviewQueryVariables,
  GetPopularReviewsQuery,
  GetPopularReviewsQueryVariables,
  GetReviewSpecificationQuery,
  GetReviewSpecificationQueryVariables,
  GetReviewsByRatingQuery,
  GetReviewsByRatingQueryVariables,
  GetReviewsCountQuery,
  GetReviewsCountQueryVariables,
  LikeReviewMutation,
  UnlikeReviewMutation,
  UnlikeReviewMutationVariables,
} from '../data/graphql'

export const handlers = {
  getPopularReviews: graphql.query<
    GetPopularReviewsQuery,
    GetPopularReviewsQueryVariables
  >('GetPopularReviews', (req, res, ctx) => {
    const { resourceId, resourceType, from, size, recentTrip, hasMedia } =
      req.variables

    return res(
      ctx.data({
        __typename: 'Query',
        popularReviews: Array.from({ length: size ?? 1 }).map((_, index) => {
          const id = ((from ?? 0) + index).toString()

          return {
            id,
            resourceId,
            resourceType,
            comment:
              '은은한 조명들로 인해 운치 있는 분위기 가득했고 입장 후 제일 먼저 보이는건 경복궁 근정전입니다. 낮에 방문했을 때와는 또다른 매력의 야간개장! 강추에용~!! 포토존이 많아서 한복 입고 오시는 분들도 많고 커플끼리 데이트 온 사람들도 많아 보였어요.',
            media: [],
            rating: 3,
            visitDate: '2023-01-01',
            recentTrip: recentTrip ?? false,
            hasMedia: hasMedia ?? false,
            likesCount: 0,
            blinded: false,
            reviewedAt: '2023-04-27T07:18:15.918Z',
            user: {
              unregister: false,
              uid: `random-uid-${id}`,
              photo:
                'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile01_yuj1eh.png',
              mileage: {
                level: 1,
                point: 7,
                badges: [],
              },
              name: id === '2' ? 'Me' : `User ${id}`,
              userBoard: {
                trips: 4,
                reviews: 0,
                thanks: 0,
                reports: 0,
                reviewsV2: 1,
                itineraries: 1,
              },
            },
            replyBoard: {
              id: `REVIEW.${id}`,
              resourceId: id,
              resourceType: 'review',
              rootMessagesCount: 3,
              childMessagesCount: 1,
              pinnedMessagesCount: 0,
              pinnedMessages: [],
            },
            liked: false,
          }
        }),
      }),
    )
  }),
  getLatestReviews: graphql.query<
    GetLatestReviewsQuery,
    GetLatestReviewsQueryVariables
  >('GetLatestReviews', (req, res, ctx) => {
    const { resourceId, resourceType, from, size, recentTrip, hasMedia } =
      req.variables

    return res(
      ctx.data({
        __typename: 'Query',
        latestReviews: Array.from({ length: size ?? 1 }).map((_, index) => {
          const id = ((from ?? 0) + index).toString()

          return {
            id,
            resourceId,
            resourceType,
            comment: '리뷰 내용',
            media: [],
            rating: 3,
            visitDate: null,
            recentTrip: recentTrip ?? false,
            hasMedia: hasMedia ?? false,
            likesCount: 0,
            blinded: false,
            reviewedAt: '2023-04-27T07:18:15.918Z',
            user: {
              unregister: false,
              uid: `random-uid-${id}`,
              photo:
                'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile01_yuj1eh.png',
              mileage: {
                level: 1,
                point: 7,
                badges: [],
              },
              name: id === '2' ? 'Me' : `User ${id}`,
              userBoard: {
                trips: 4,
                reviews: 0,
                thanks: 0,
                reports: 0,
                reviewsV2: 1,
                itineraries: 1,
              },
            },
            replyBoard: {
              id: `REVIEW.${id}`,
              resourceId: id,
              resourceType: 'review',
              rootMessagesCount: 3,
              childMessagesCount: 1,
              pinnedMessagesCount: 0,
              pinnedMessages: [],
            },
            liked: false,
          }
        }),
      }),
    )
  }),
  getReviewsByRating: graphql.query<
    GetReviewsByRatingQuery,
    GetReviewsByRatingQueryVariables
  >('GetReviewsByRating', (req, res, ctx) => {
    const { resourceId, resourceType, from, size, recentTrip, hasMedia } =
      req.variables

    return res(
      ctx.data({
        __typename: 'Query',
        ratingReviews: Array.from({ length: size ?? 1 }).map((_, index) => {
          const id = ((from ?? 0) + index).toString()

          return {
            id,
            resourceId,
            resourceType,
            comment: '리뷰 내용',
            media: [],
            rating: 3,
            visitDate: null,
            recentTrip: recentTrip ?? false,
            hasMedia: hasMedia ?? false,
            likesCount: 0,
            blinded: false,
            reviewedAt: '2023-04-27T07:18:15.918Z',
            user: {
              unregister: false,
              uid: `random-uid-${id}`,
              photo:
                'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile01_yuj1eh.png',
              mileage: {
                level: 1,
                point: 7,
                badges: [],
              },
              name: id === '2' ? 'Me' : `User ${id}`,
              userBoard: {
                trips: 4,
                reviews: 0,
                thanks: 0,
                reports: 0,
                reviewsV2: 1,
                itineraries: 1,
              },
            },
            replyBoard: {
              id: `REVIEW.${id}`,
              resourceId: id,
              resourceType: 'review',
              rootMessagesCount: 3,
              childMessagesCount: 1,
              pinnedMessagesCount: 0,
              pinnedMessages: [],
            },
            liked: false,
          }
        }),
      }),
    )
  }),
  getMyReview: graphql.query<GetMyReviewQuery, GetMyReviewQueryVariables>(
    'GetMyReview',
    (req, res, ctx) => {
      return res(ctx.data({ __typename: 'Query', myReview: null }))
    },
  ),
  getReviewSpecification: graphql.query<
    GetReviewSpecificationQuery,
    GetReviewSpecificationQueryVariables
  >('GetReviewSpecification', (req, res, ctx) => {
    return res(
      ctx.data({
        __typename: 'Query',
        reviewsSpecification: {
          __typename: 'ReviewSpecification',
          rating: {
            required: true,
            description: [
              '별점을 선택해주세요!',
              '별로예요',
              '조금 아쉬워요',
              '주위에 있다면 가볼만해요',
              '꽤 가볼만해요',
              '꼭 가야 하는 곳이에요',
            ],
          },
        },
      }),
    )
  }),
  getReviewsCount: graphql.query<
    GetReviewsCountQuery,
    GetReviewsCountQueryVariables
  >('GetReviewsCount', (req, res, ctx) => {
    return res(
      ctx.data({
        __typename: 'Query',
        reviewsCount: 100,
      }),
    )
  }),
  likeReview: graphql.mutation<
    LikeReviewMutation,
    UnlikeReviewMutationVariables
  >('LikeReview', (req, res, ctx) => {
    const { reviewId } = req.variables

    return res(
      ctx.data({
        __typename: 'Mutation',
        likeReview: { __typename: 'ReviewReaction', id: reviewId },
      }),
    )
  }),
  unlikeReview: graphql.mutation<
    UnlikeReviewMutation,
    UnlikeReviewMutationVariables
  >('UnlikeReview', (req, res, ctx) => {
    return res(ctx.data({ __typename: 'Mutation', unlikeReview: true }))
  }),
  deleteReview: graphql.mutation<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >('DeleteReview', (req, res, ctx) => {
    return res(ctx.data({ __typename: 'Mutation', deleteReview: true }))
  }),
}

export const authHandlers = {
  getMyReview: graphql.query<GetMyReviewQuery, GetMyReviewQueryVariables>(
    'GetMyReview',
    (req, res, ctx) => {
      return res(
        ctx.data({
          __typename: 'Query',
          myReview: {
            id: '2',
            resourceId: 'some-resource-id',
            resourceType: 'some-resource-type',
            comment: 'ㅁㄴㅇㄹ',
            media: [],
            rating: 3,
            visitDate: null,
            recentTrip: false,
            likesCount: 0,
            blinded: false,
            reviewedAt: '2023-04-27T07:18:15.918Z',
            user: {
              unregister: false,
              uid: 'random-uid-2',
              photo:
                'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile01_yuj1eh.png',
              mileage: {
                level: 1,
                point: 7,
                badges: [],
              },
              name: 'Me',
              userBoard: {
                trips: 4,
                reviews: 0,
                thanks: 0,
                reports: 0,
                reviewsV2: 1,
                itineraries: 1,
              },
            },
            replyBoard: {
              id: `REVIEW.${2}`,
              resourceId: '2',
              resourceType: 'review',
              rootMessagesCount: 3,
              childMessagesCount: 1,
              pinnedMessagesCount: 0,
              pinnedMessages: [],
            },
            liked: false,
          },
        }),
      )
    },
  ),
}

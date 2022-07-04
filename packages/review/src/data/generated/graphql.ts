import { GraphQLClient } from 'graphql-request'
import { RequestInit } from 'graphql-request/dist/types.dom'
import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from 'react-query'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers'],
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers)
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
  JSON: unknown
}

export type ScrapType =
  | 'ALL'
  | 'ARTICLE'
  | 'ARTICLES'
  | 'ATTRACTION'
  | 'ATTRACTIONS'
  | 'HOTEL'
  | 'HOTELS'
  | 'POI'
  | 'POIS'
  | 'RESTAURANT'
  | 'RESTAURANTS'

export type LikeReviewMutationVariables = Exact<{
  reviewId: Scalars['String']
}>

export type LikeReviewMutation = {
  __typename: 'Mutation'
  likeReview: { __typename: 'ReviewReaction'; id: string } | null
}

export type UnlikeReviewMutationVariables = Exact<{
  reviewId: Scalars['String']
}>

export type UnlikeReviewMutation = {
  __typename: 'Mutation'
  unlikeReview: { __typename: 'ReviewReaction'; id: string } | null
}

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteReviewMutation = {
  __typename: 'Mutation'
  deleteReview: boolean
}

export type BaseReviewFragment = {
  __typename: 'Review'
  id: string
  resourceId: string
  resourceType: string
  comment: string | null
  media: Array<unknown> | null
  rating: number | null
  visitDate: string | null
  recentTrip: boolean
  likesCount: number
  blinded: boolean | null
  reviewedAt: string
  liked: boolean
  user: {
    __typename: 'User'
    unregister: boolean | null
    uid: string | null
    photo: string | null
    name: string | null
    mileage: {
      __typename: 'UserMileage'
      level: number | null
      point: number | null
    } | null
    userBoard: {
      __typename: 'UserBoard'
      trips: number | null
      reviews: number | null
      thanks: number | null
      reports: number | null
      reviewsV2: number | null
      itineraries: number | null
    } | null
  } | null
  replyBoard: {
    __typename: 'ReplyBoard'
    id: string
    rootMessagesCount: number
    childMessagesCount: number
  } | null
}

export type BaseReviewSpecificationFragment = {
  __typename: 'ReviewSpecification'
  rating: {
    __typename: 'ReviewRatingSpecification'
    required: boolean | null
    description: Array<string> | null
  } | null
}

export type GetPopularReviewsQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
  recentTrip: InputMaybe<Scalars['Boolean']>
  from: InputMaybe<Scalars['Int']>
  size: InputMaybe<Scalars['Int']>
}>

export type GetPopularReviewsQuery = {
  __typename: 'Query'
  popularReviews: Array<{
    __typename: 'Review'
    id: string
    resourceId: string
    resourceType: string
    comment: string | null
    media: Array<unknown> | null
    rating: number | null
    visitDate: string | null
    recentTrip: boolean
    likesCount: number
    blinded: boolean | null
    reviewedAt: string
    liked: boolean
    user: {
      __typename: 'User'
      unregister: boolean | null
      uid: string | null
      photo: string | null
      name: string | null
      mileage: {
        __typename: 'UserMileage'
        level: number | null
        point: number | null
      } | null
      userBoard: {
        __typename: 'UserBoard'
        trips: number | null
        reviews: number | null
        thanks: number | null
        reports: number | null
        reviewsV2: number | null
        itineraries: number | null
      } | null
    } | null
    replyBoard: {
      __typename: 'ReplyBoard'
      id: string
      rootMessagesCount: number
      childMessagesCount: number
    } | null
  }>
}

export type GetLatestReviewsQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
  recentTrip: InputMaybe<Scalars['Boolean']>
  from: InputMaybe<Scalars['Int']>
  size: InputMaybe<Scalars['Int']>
}>

export type GetLatestReviewsQuery = {
  __typename: 'Query'
  latestReviews: Array<{
    __typename: 'Review'
    id: string
    resourceId: string
    resourceType: string
    comment: string | null
    media: Array<unknown> | null
    rating: number | null
    visitDate: string | null
    recentTrip: boolean
    likesCount: number
    blinded: boolean | null
    reviewedAt: string
    liked: boolean
    user: {
      __typename: 'User'
      unregister: boolean | null
      uid: string | null
      photo: string | null
      name: string | null
      mileage: {
        __typename: 'UserMileage'
        level: number | null
        point: number | null
      } | null
      userBoard: {
        __typename: 'UserBoard'
        trips: number | null
        reviews: number | null
        thanks: number | null
        reports: number | null
        reviewsV2: number | null
        itineraries: number | null
      } | null
    } | null
    replyBoard: {
      __typename: 'ReplyBoard'
      id: string
      rootMessagesCount: number
      childMessagesCount: number
    } | null
  }>
}

export type GetMyReviewQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
}>

export type GetMyReviewQuery = {
  __typename: 'Query'
  myReview: {
    __typename: 'Review'
    id: string
    resourceId: string
    resourceType: string
    comment: string | null
    media: Array<unknown> | null
    rating: number | null
    visitDate: string | null
    recentTrip: boolean
    likesCount: number
    blinded: boolean | null
    reviewedAt: string
    liked: boolean
    user: {
      __typename: 'User'
      unregister: boolean | null
      uid: string | null
      photo: string | null
      name: string | null
      mileage: {
        __typename: 'UserMileage'
        level: number | null
        point: number | null
      } | null
      userBoard: {
        __typename: 'UserBoard'
        trips: number | null
        reviews: number | null
        thanks: number | null
        reports: number | null
        reviewsV2: number | null
        itineraries: number | null
      } | null
    } | null
    replyBoard: {
      __typename: 'ReplyBoard'
      id: string
      rootMessagesCount: number
      childMessagesCount: number
    } | null
  } | null
}

export type GetReviewSpecificationQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
}>

export type GetReviewSpecificationQuery = {
  __typename: 'Query'
  reviewsSpecification: {
    __typename: 'ReviewSpecification'
    rating: {
      __typename: 'ReviewRatingSpecification'
      required: boolean | null
      description: Array<string> | null
    } | null
  } | null
}

export type GetReviewsCountQueryVariables = Exact<{
  resourceType: Scalars['String']
  resourceId: Scalars['String']
}>

export type GetReviewsCountQuery = { __typename: 'Query'; reviewsCount: number }

export const BaseReviewFragmentDoc = `
    fragment BaseReview on Review {
  id
  resourceId
  resourceType
  comment
  media
  rating
  visitDate
  recentTrip
  likesCount
  blinded
  reviewedAt
  user {
    unregister
    uid
    photo
    mileage {
      level
      point
    }
    name
    userBoard {
      trips
      reviews
      thanks
      reports
      reviewsV2
      itineraries
    }
  }
  replyBoard {
    id
    rootMessagesCount
    childMessagesCount
  }
  liked
}
    `
export const BaseReviewSpecificationFragmentDoc = `
    fragment BaseReviewSpecification on ReviewSpecification {
  rating {
    required
    description
  }
}
    `
export const LikeReviewDocument = `
    mutation LikeReview($reviewId: String!) {
  likeReview(reviewId: $reviewId) {
    id
  }
}
    `
export const useLikeReviewMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LikeReviewMutation,
    TError,
    LikeReviewMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<
    LikeReviewMutation,
    TError,
    LikeReviewMutationVariables,
    TContext
  >(
    ['LikeReview'],
    (variables?: LikeReviewMutationVariables) =>
      fetcher<LikeReviewMutation, LikeReviewMutationVariables>(
        client,
        LikeReviewDocument,
        variables,
        headers,
      )(),
    options,
  )
export const UnlikeReviewDocument = `
    mutation UnlikeReview($reviewId: String!) {
  unlikeReview(reviewId: $reviewId) {
    id
  }
}
    `
export const useUnlikeReviewMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UnlikeReviewMutation,
    TError,
    UnlikeReviewMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<
    UnlikeReviewMutation,
    TError,
    UnlikeReviewMutationVariables,
    TContext
  >(
    ['UnlikeReview'],
    (variables?: UnlikeReviewMutationVariables) =>
      fetcher<UnlikeReviewMutation, UnlikeReviewMutationVariables>(
        client,
        UnlikeReviewDocument,
        variables,
        headers,
      )(),
    options,
  )
export const DeleteReviewDocument = `
    mutation DeleteReview($id: ID!) {
  deleteReview(id: $id)
}
    `
export const useDeleteReviewMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteReviewMutation,
    TError,
    DeleteReviewMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers'],
) =>
  useMutation<
    DeleteReviewMutation,
    TError,
    DeleteReviewMutationVariables,
    TContext
  >(
    ['DeleteReview'],
    (variables?: DeleteReviewMutationVariables) =>
      fetcher<DeleteReviewMutation, DeleteReviewMutationVariables>(
        client,
        DeleteReviewDocument,
        variables,
        headers,
      )(),
    options,
  )
export const GetPopularReviewsDocument = `
    query GetPopularReviews($resourceType: String!, $resourceId: String!, $recentTrip: Boolean, $from: Int, $size: Int) {
  popularReviews: getPopularReviews(
    resourceType: $resourceType
    resourceId: $resourceId
    recentTrip: $recentTrip
    from: $from
    size: $size
  ) {
    ...BaseReview
  }
}
    ${BaseReviewFragmentDoc}`
export const useGetPopularReviewsQuery = <
  TData = GetPopularReviewsQuery,
  TError = unknown,
>(
  client: GraphQLClient,
  variables: GetPopularReviewsQueryVariables,
  options?: UseQueryOptions<GetPopularReviewsQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<GetPopularReviewsQuery, TError, TData>(
    ['GetPopularReviews', variables],
    fetcher<GetPopularReviewsQuery, GetPopularReviewsQueryVariables>(
      client,
      GetPopularReviewsDocument,
      variables,
      headers,
    ),
    options,
  )
export const GetLatestReviewsDocument = `
    query GetLatestReviews($resourceType: String!, $resourceId: String!, $recentTrip: Boolean, $from: Int, $size: Int) {
  latestReviews: getLatestReviews(
    resourceType: $resourceType
    resourceId: $resourceId
    recentTrip: $recentTrip
    from: $from
    size: $size
  ) {
    ...BaseReview
  }
}
    ${BaseReviewFragmentDoc}`
export const useGetLatestReviewsQuery = <
  TData = GetLatestReviewsQuery,
  TError = unknown,
>(
  client: GraphQLClient,
  variables: GetLatestReviewsQueryVariables,
  options?: UseQueryOptions<GetLatestReviewsQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<GetLatestReviewsQuery, TError, TData>(
    ['GetLatestReviews', variables],
    fetcher<GetLatestReviewsQuery, GetLatestReviewsQueryVariables>(
      client,
      GetLatestReviewsDocument,
      variables,
      headers,
    ),
    options,
  )
export const GetMyReviewDocument = `
    query GetMyReview($resourceType: String!, $resourceId: String!) {
  myReview: getMyReview(resourceType: $resourceType, resourceId: $resourceId) {
    ...BaseReview
  }
}
    ${BaseReviewFragmentDoc}`
export const useGetMyReviewQuery = <TData = GetMyReviewQuery, TError = unknown>(
  client: GraphQLClient,
  variables: GetMyReviewQueryVariables,
  options?: UseQueryOptions<GetMyReviewQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<GetMyReviewQuery, TError, TData>(
    ['GetMyReview', variables],
    fetcher<GetMyReviewQuery, GetMyReviewQueryVariables>(
      client,
      GetMyReviewDocument,
      variables,
      headers,
    ),
    options,
  )
export const GetReviewSpecificationDocument = `
    query GetReviewSpecification($resourceType: String!, $resourceId: String!) {
  reviewsSpecification: getReviewSpecification(
    resourceType: $resourceType
    resourceId: $resourceId
  ) {
    ...BaseReviewSpecification
  }
}
    ${BaseReviewSpecificationFragmentDoc}`
export const useGetReviewSpecificationQuery = <
  TData = GetReviewSpecificationQuery,
  TError = unknown,
>(
  client: GraphQLClient,
  variables: GetReviewSpecificationQueryVariables,
  options?: UseQueryOptions<GetReviewSpecificationQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<GetReviewSpecificationQuery, TError, TData>(
    ['GetReviewSpecification', variables],
    fetcher<GetReviewSpecificationQuery, GetReviewSpecificationQueryVariables>(
      client,
      GetReviewSpecificationDocument,
      variables,
      headers,
    ),
    options,
  )
export const GetReviewsCountDocument = `
    query GetReviewsCount($resourceType: String!, $resourceId: String!) {
  reviewsCount: getReviewsCount(
    resourceType: $resourceType
    resourceId: $resourceId
  )
}
    `
export const useGetReviewsCountQuery = <
  TData = GetReviewsCountQuery,
  TError = unknown,
>(
  client: GraphQLClient,
  variables: GetReviewsCountQueryVariables,
  options?: UseQueryOptions<GetReviewsCountQuery, TError, TData>,
  headers?: RequestInit['headers'],
) =>
  useQuery<GetReviewsCountQuery, TError, TData>(
    ['GetReviewsCount', variables],
    fetcher<GetReviewsCountQuery, GetReviewsCountQueryVariables>(
      client,
      GetReviewsCountDocument,
      variables,
      headers,
    ),
    options,
  )

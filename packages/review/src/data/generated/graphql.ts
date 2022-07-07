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

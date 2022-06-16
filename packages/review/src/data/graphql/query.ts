import { gql } from 'graphql-request'

import { BaseReview, BaseReviewSpecification } from './fragment'

export const GET_LATEST_REVIEWS = gql`
  query GetLatestReviews(
    $resourceType: String!
    $resourceId: String!
    $recentTrip: Boolean
    $from: Int
    $size: Int
  ) {
    getLatestReviews(
      resourceType: $resourceType
      resourceId: $resourceId
      recentTrip: $recentTrip
      from: $from
      size: $size
    ) {
      ${BaseReview}
    }
  }
`

export const GET_MY_REVIEW = gql`
  query GetMyReview($resourceType: String!, $resourceId: String!) {
    getMyReview(resourceType: $resourceType, resourceId: $resourceId) {
      ${BaseReview}
    }
  }
`

export const GET_REVIEW_SPECIFICATION = gql`
  query getReviewSpecification($resourceType: String!, $resourceId: String!) {
    getReviewSpecification(
      resourceType: $resourceType
      resourceId: $resourceId
    ) {
      ${BaseReviewSpecification}
    }
  }
`

export const GET_REVIEWS_COUNT = gql`
  query GetReviewsCount($resourceType: String!, $resourceId: String!) {
    getReviewsCount(resourceType: $resourceType, resourceId: $resourceId)
  }
`

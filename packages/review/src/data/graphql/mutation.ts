import { gql } from 'graphql-request'

import { BaseReviewReaction } from './fragment'

export const LIKE_REVIEW = gql`
  mutation LikeReview($reviewId: String!) {
    likeReview(reviewId: $reviewId) {
      ${BaseReviewReaction}
    }
  }
`

export const UNLIKE_REVIEW = gql`
  mutation UnlikeReview($reviewId: String!) {
    unlikeReview(reviewId: $reviewId) {
      ${BaseReviewReaction}
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`

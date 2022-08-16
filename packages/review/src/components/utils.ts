import { ReviewData, TranslatedReviewResult } from './types'

export function makeSuccessfullyTranslatedReviews(
  translatedReviews: TranslatedReviewResult[],
) {
  return new Map<string, string>(
    translatedReviews.map(({ id, translated }) => [id, translated]),
  )
}

export function convertReviewsToTranslatedReviews(
  reviews: ReviewData[],
  successfullyTranslatedReviews: Map<string, string>,
) {
  return reviews.map((review) =>
    successfullyTranslatedReviews.has(review.id)
      ? {
          ...review,
          comment: successfullyTranslatedReviews.get(review.id) as string,
        }
      : review,
  )
}

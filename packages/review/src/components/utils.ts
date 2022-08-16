import { TranslatedReviewResult } from './types'

export function makeSuccessfullyTranslatedReviews(
  translatedReviews: TranslatedReviewResult[],
) {
  return new Map<string, string>(
    translatedReviews.map(({ id, translated }) => [id, translated]),
  )
}

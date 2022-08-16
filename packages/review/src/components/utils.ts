import { TranslatedReview } from './types'

export function makeSuccessfullyTranslatedReviews(
  translatedReviews: TranslatedReview[],
) {
  return new Map<string, string>(
    translatedReviews.map(({ id, translated }) => [id, translated]),
  )
}

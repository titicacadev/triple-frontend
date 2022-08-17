import { ReviewData, TranslatedReviewResponse } from './types'

export function convertReviewsToTranslatedReviews(
  reviews: ReviewData[],
  translatedReviewsResponse: TranslatedReviewResponse[],
) {
  const translations = new Map<string, string>(
    translatedReviewsResponse.map(({ id, translated }) => [id, translated]),
  )

  return reviews.map((review) =>
    translations.has(review.id)
      ? {
          ...review,
          comment: translations.get(review.id) as string,
        }
      : review,
  )
}

export function convertToApiCompatibleLanguageCode(code: string) {
  if (code.startsWith('zh')) {
    return /-[CN|TW]/i.test(code) ? code : 'zh-CN'
  }

  return code.replace(/-.*/, '')
}

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

export function convertToApiCompatibleLanguageCode(languageCode: string) {
  const isChinese = languageCode.startsWith('zh')
  if (isChinese) {
    return convertToApiCompatibleChinese(languageCode)
  }

  return languageCode.replace(/-.*/, '')
}

function convertToApiCompatibleChinese(chineseLanguageCode: string) {
  const isRegionCodeValid = /-[CN|TW]/i.test(chineseLanguageCode)
  if (isRegionCodeValid) {
    return chineseLanguageCode
  }

  return 'zh-CN'
}

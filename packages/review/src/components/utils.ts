import { ReviewData, TranslatedReviewResponse } from './types'

const SIMPLIFIED_CHINESE_LANGUAGE_CODE = 'zh-CN'
const REGION_CODE_REGEX = /-.*/
const VALID_CHINESE_REGION_CODE_REGEX = /-[CN|TW]/i

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

  return languageCode.replace(REGION_CODE_REGEX, '')
}

function convertToApiCompatibleChinese(chineseLanguageCode: string) {
  const isRegionCodeValid =
    VALID_CHINESE_REGION_CODE_REGEX.test(chineseLanguageCode)
  if (isRegionCodeValid) {
    return chineseLanguageCode
  }

  return SIMPLIFIED_CHINESE_LANGUAGE_CODE
}

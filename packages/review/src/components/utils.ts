import { ReviewData, TranslatedReviewResult } from './types'

const SIMPLIFIED_CHINESE_LANGUAGE_CODE = 'zh-CN'
const REGION_CODE_REGEX = /-.*/
const VALID_CHINESE_REGION_CODE_REGEX = /-[CN|TW]/i

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

export function convertToApiCompatibleLanguageCode(languageCode: string) {
  const isChinese = languageCode.includes('zh')
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

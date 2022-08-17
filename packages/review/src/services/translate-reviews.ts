import { post, RequestOptions } from '@titicaca/fetcher'

import { ReviewData, TranslatedReviewResponse } from '../components/types'

export async function translateReviews({
  reviews,
  targetLang,
  options,
}: {
  reviews: ReviewData[]
  targetLang: string
  options?: RequestOptions
}): Promise<ReviewData[]> {
  const response = await post<TranslatedReviewResponse[]>(
    '/api/translator/translate/review',
    {
      ...options,
      body: {
        ids: reviews.map(({ id }) => id),
        target: convertToApiCompatibleLanguageCode(targetLang),
      },
    },
  )

  if (!response.ok) {
    return reviews
  }

  const { parsedBody } = response
  const translations = new Map<string, string>(
    parsedBody.map(({ id, translated }) => [id, translated]),
  )

  return applyTranslation(reviews, translations)
}

function convertToApiCompatibleLanguageCode(code: string) {
  if (code.startsWith('zh')) {
    return /-[CN|TW]/i.test(code) ? code : 'zh-CN'
  }

  return code.replace(/-.*/, '')
}

function applyTranslation(
  reviews: ReviewData[],
  translations: Map<string, string>,
) {
  return reviews.map((review) =>
    translations.has(review.id)
      ? {
          ...review,
          comment: translations.get(review.id) as string,
        }
      : review,
  )
}

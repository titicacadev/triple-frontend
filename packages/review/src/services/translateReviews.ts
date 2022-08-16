import { post, RequestOptions } from '@titicaca/fetcher'

import { TranslatedReview } from '../components/types'

export async function translateReviews({
  ids,
  targetLang,
  options,
}: {
  ids: string[]
  targetLang: string
  options?: RequestOptions
}) {
  const response = await post<TranslatedReview[]>(
    '/api/translator/translate/review',
    {
      ...options,
      body: {
        ids,
        target: targetLang,
      },
    },
  )

  if (!response.ok) {
    return []
  }

  const { parsedBody } = response

  return parsedBody
}

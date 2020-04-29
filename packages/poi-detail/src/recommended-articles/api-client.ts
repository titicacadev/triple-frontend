import fetch from 'isomorphic-fetch'
import { ImageMeta } from '@titicaca/type-definitions'

import { ArticleListingData } from './types'

export async function fetchRecommendedArticles({
  regionId,
}: {
  regionId: string
}): Promise<ArticleListingData[]> {
  const response = await fetch(
    `/api/content/articles?regionId=${regionId}&sortBy=scrap`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch recommended articles')
  }

  return shuffle(
    (await response.json()).filter(
      ({
        source: { image },
      }: {
        source: {
          image?: ImageMeta
        }
      }) => image,
    ),
  )
}

function shuffle<T>(array: T[]): T[] {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * array.length)
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
  }

  return array
}

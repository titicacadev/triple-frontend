import { get } from '@titicaca/fetcher'
import qs from 'qs'

import { ArticleListingData } from './types'

export async function fetchRecommendedArticles({
  regionId,
  zoneId,
}: {
  regionId?: string
  zoneId?: string
}): Promise<ArticleListingData[]> {
  const response = await get<ArticleListingData[]>(
    `/api/content/articles?${qs.stringify({
      ...((regionId || zoneId) && {
        geotags: [
          ...(regionId ? [{ type: 'triple-region', id: regionId }] : []),
          ...(zoneId ? [{ type: 'triple-zone', id: zoneId }] : []),
        ],
      }),
      sortBy: 'scrap',
    })}`,
  )

  if (response.ok === true) {
    const { parsedBody } = response
    return shuffle(parsedBody.filter(({ source: { image } }) => image))
  } else {
    throw new Error('Failed to fetch recommended articles')
  }
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

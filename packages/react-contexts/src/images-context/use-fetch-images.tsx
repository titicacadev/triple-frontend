import qs from 'querystring'

import { useState } from 'react'
import { ImageMeta } from '@titicaca/type-definitions'
import { captureHttpError, get } from '@titicaca/fetcher'

import { ImageCategoryOrder } from './types'

export default function useFetchImages() {
  const [totalContentImagesCount, setTotalContentImagesCount] = useState(0)
  const [totalPoiReviewImagesCount, setTotalPoiReviewImagesCount] = useState(0)

  async function fetchImages({
    target,
    currentImageLength,
    size,
    categoryOrder: categoryOrderArray,
  }: {
    target: { type: string; id: string }
    currentImageLength: number
    size: number
    categoryOrder: Array<ImageCategoryOrder>
  }) {
    const categoryOrder = categoryOrderArray.join(',')
    if (currentImageLength === 0) {
      const poiResponse = await fetchContentImages(target, {
        from: currentImageLength,
        size,
        categoryOrder,
      })
      const poiReviewsResponse = await fetchPoiReviewImages(target, {
        from: currentImageLength - totalContentImagesCount,
        size: 1,
        categoryOrder,
      })
      setTotalContentImagesCount(poiResponse.total)
      setTotalPoiReviewImagesCount(poiReviewsResponse.total)
      return {
        ...poiResponse,
        total: poiResponse.total + poiReviewsResponse.total,
      }
    }
    if (currentImageLength < totalContentImagesCount) {
      const response = await fetchContentImages(target, {
        from: currentImageLength,
        size,
        categoryOrder,
      })
      setTotalContentImagesCount(response.total)
      const poiReviewsResponse =
        response.data.length < size
          ? await fetchPoiReviewImages(target, {
              from: 0,
              size: size - response.data.length,
              categoryOrder,
            })
          : { data: [], total: totalPoiReviewImagesCount, next: null }
      return {
        ...response,
        data: [...response.data, ...poiReviewsResponse.data],
        total: response.total + poiReviewsResponse.total,
        next:
          poiReviewsResponse.data.length > 0
            ? poiReviewsResponse.next
            : response.next,
      }
    }
    const response = await fetchPoiReviewImages(target, {
      from: currentImageLength - totalContentImagesCount,
      size,
      categoryOrder,
    })
    setTotalPoiReviewImagesCount(response.total)
    return { ...response, total: response.total + totalContentImagesCount }
  }

  return fetchImages
}

async function sendFetchImages(
  target: { type: string; id: string },
  query: { from: number; size: number; categoryOrder: string },
  endpoint: 'content' | 'reviews',
) {
  const querystring = qs.stringify({
    resource_type: target.type,
    resource_id: target.id,
    from: query.from,
    size: query.size,
    category_order: query.categoryOrder,
  })

  const response = await get<
    {
      data: ImageMeta[]
      total: number
      next: string | null
      prev: string | null
      count: number
    },
    { message: string }
  >(`/api/${endpoint}/v2/images?${querystring}`)

  if (response.ok === true) {
    const { parsedBody } = response
    return parsedBody
  } else {
    captureHttpError(response)
    throw new Error(`Fail to fetch ${endpoint} images`)
  }
}

async function fetchContentImages(
  target: { type: string; id: string },
  query: { from: number; size: number; categoryOrder: string },
) {
  return sendFetchImages(target, query, 'content')
}

async function fetchPoiReviewImages(
  target: { type: string; id: string },
  query: { from: number; size: number; categoryOrder: string },
) {
  return sendFetchImages(target, query, 'reviews')
}

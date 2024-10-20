import qs from 'qs'
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

    if (
      currentImageLength === 0 ||
      currentImageLength < totalContentImagesCount
    ) {
      const response = await fetchContentImages(target, {
        from: currentImageLength,
        size,
        categoryOrder,
      })
      setTotalContentImagesCount(response.total)

      const needReviewImages = response.data.length < size //  content 이미지의 개수가 부족해서 리뷰 이미지도 fetch 해야할 때
      const poiReviewsResponse =
        needReviewImages || currentImageLength === 0
          ? await fetchPoiReviewImages(target, {
              from: 0,
              size: needReviewImages ? size - response.data.length : 1, // 1은 첫 fetch에 review image total을 알아오기 위함
            })
          : { data: [], next: null, total: 0 }

      return {
        ...response,
        data: [
          ...response.data,
          ...(needReviewImages ? poiReviewsResponse.data : []),
        ],
        total:
          response.total +
          (poiReviewsResponse.total || totalPoiReviewImagesCount),
        next:
          response.next || needReviewImages ? poiReviewsResponse.next : true,
      }
    }
    const response = await fetchPoiReviewImages(target, {
      from: currentImageLength - totalContentImagesCount,
      size,
    })
    setTotalPoiReviewImagesCount(response.total)
    return {
      ...response,
      total: response.total + totalContentImagesCount,
      hasMore: !!response.next,
    }
  }

  return fetchImages
}

/** API 문서 : https://inpk.atlassian.net/wiki/spaces/dev/pages/480903530/API */
async function sendFetchImages(
  querystring: string,
  endpoint: 'content' | 'reviews',
) {
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
  const querystring = qs.stringify({
    resource_type: target.type,
    resource_id: target.id,
    from: query.from,
    size: query.size,
    category_order: query.categoryOrder,
  })
  return sendFetchImages(querystring, 'content')
}

async function fetchPoiReviewImages(
  target: { id: string },
  query: { from: number; size: number },
) {
  const querystring = qs.stringify({
    resource_id: target.id,
    from: query.from,
    size: query.size,
  })
  return sendFetchImages(querystring, 'reviews')
}

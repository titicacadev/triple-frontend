import {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
  useCallback,
  ComponentType,
  useReducer,
  useEffect,
  useState,
} from 'react'
import qs from 'qs'
import { ImageMeta } from '@titicaca/type-definitions'
import { DeepPartial } from 'utility-types'
import { captureHttpError, get } from '@titicaca/fetcher'

import reducer, {
  loadImagesRequest,
  loadImagesSuccess,
  loadImagesFail,
  reinitializeImages,
} from './reducer'

interface ImagesContext {
  images: ImageMeta[]
  total: number
  loading: boolean
  actions: {
    fetch: (cb?: () => void) => Promise<void>
    reFetch: (cb?: () => void) => Promise<void>
    indexOf: (target: { id: string }) => Promise<number>
  }
}

export type ImageCategoryOrder =
  | 'image' // 대표 이미지
  | 'recommendation'
  | 'menuItem' // 대표 메뉴 이미지
  | 'menuBoard' // 메뉴판 이미지
  | 'featuredContent'
  | 'images' // 어드민에 등록된 이미지들 가운데 대표 이미지를 제외한 나머지 이미지

interface ImagesProviderProps {
  source: {
    id: string
    type: 'attraction' | 'restaurant' | 'hotel'
  }
  categoryOrder?: Array<ImageCategoryOrder>
  images?: ImageMeta[]
  total?: number
}

const Context = createContext<ImagesContext>({
  images: [],
  total: 0,
  loading: false,
  actions: {
    fetch: () => Promise.resolve(),
    reFetch: () => Promise.resolve(),
    indexOf: () => Promise.resolve(-1),
  },
})

const TYPE_MAPPING = {
  attraction: 'poi',
  restaurant: 'poi',
  hotel: 'hotel',
}

export function ImagesProvider({
  images: initialImages,
  total: initialTotal,
  categoryOrder = [
    'recommendation',
    'menuBoard',
    'menuItem',
    'featuredContent',
    'images',
  ],
  source: { id, type },
  children,
}: PropsWithChildren<ImagesProviderProps>) {
  const [{ loading, images, total, hasMore }, dispatch] = useReducer(reducer, {
    loading: !initialImages,
    images: initialImages || [],
    total: initialTotal || 0,
    hasMore: true,
  })

  const fetchImages = useFetchImages()

  const sendFetchRequest = useCallback(
    async (size = 15) => {
      const response = await fetchImages({
        target: { type: TYPE_MAPPING[type] || type, id },
        currentImageLength: images.length,
        size,
        categoryOrder,
      })

      return response
    },
    [id, images.length, type],
  )

  const reFetch = useCallback(async () => {
    if (loading) {
      return
    }

    dispatch(loadImagesRequest())

    try {
      const { data: fetchedImages, total } = await fetchImages({
        target: { type: TYPE_MAPPING[type] || type, id },
        currentImageLength: 0,
        size: 15,
        categoryOrder,
      })

      dispatch(
        reinitializeImages({
          images: fetchedImages,
          total,
        }),
      )
    } catch (error) {
      dispatch(loadImagesFail(error))
    }
  }, [loading, id, type])

  const fetch = useCallback(
    async (onFetchAfter?: () => void, force?: boolean) => {
      if (!force && (loading || !hasMore)) {
        return
      }

      dispatch(loadImagesRequest())

      try {
        const { data: fetchedImages, total } = await sendFetchRequest()

        if (fetchedImages) {
          dispatch(loadImagesSuccess({ images: fetchedImages, total }))
        } else {
          throw new Error('Response has no data property')
        }
      } catch (error) {
        dispatch(loadImagesFail(error))
      }

      onFetchAfter && onFetchAfter()
    },
    [hasMore, loading, sendFetchRequest],
  )

  const indexOf = useCallback(
    async ({ id: targetId }: { id: string }) => {
      const index = images.findIndex(({ id }) => id === targetId)
      if (index >= 0) {
        return index
      }

      // Just fetch 30 more images to check index of clicked image.
      // Ignore the case of unfindable image in these 45(15 + 30) images.
      const { data: fetchedImages } = await sendFetchRequest(30)

      return fetchedImages
        ? [...images, ...fetchedImages].findIndex(({ id }) => id === targetId)
        : -1
    },
    [images, sendFetchRequest],
  )

  useEffect(() => {
    fetch(undefined, true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo(
    () => ({
      images,
      total,
      actions: {
        fetch,
        reFetch,
        indexOf,
      },
      loading,
    }),
    [fetch, images, indexOf, total, loading, reFetch],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

function useFetchImages() {
  const [totalPoiImagesCount, setTotalPoiImagesCount] = useState(0)
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
      const poiResponse = await fetchPoiImages(target, {
        from: currentImageLength,
        size,
        categoryOrder,
      })
      const poiReviewsResponse = await fetchPoiReviewImages(target, {
        from: currentImageLength - totalPoiImagesCount,
        size,
        categoryOrder,
      })
      setTotalPoiImagesCount(poiResponse.total)
      setTotalPoiReviewImagesCount(poiReviewsResponse.total)
      return {
        ...poiResponse,
        total: poiResponse.total + poiReviewsResponse.total,
      }
    }
    if (currentImageLength < totalPoiImagesCount) {
      const response = await fetchPoiImages(target, {
        from: currentImageLength,
        size,
        categoryOrder,
      })
      setTotalPoiImagesCount(response.total)
      const poiReviewsResponse =
        response.data.length < size
          ? await fetchPoiReviewImages(target, {
              from: 0,
              size: size - response.data.length,
              categoryOrder,
            })
          : { data: [], total: totalPoiReviewImagesCount }
      return {
        data: [...response.data, ...poiReviewsResponse.data],
        total: response.total + poiReviewsResponse.total,
      }
    }
    const response = await fetchPoiReviewImages(target, {
      from: currentImageLength - totalPoiImagesCount,
      size,
      categoryOrder,
    })
    setTotalPoiReviewImagesCount(response.total)
    return { ...response, total: response.total + totalPoiImagesCount }
  }

  return fetchImages
}

async function fetchPoiImages(
  target: { type: string; id: string },
  query: { from: number; size: number; categoryOrder: string },
) {
  const querystring = qs.stringify({
    resourceType: target.type,
    resourceId: target.id,
    from: query.from,
    size: query.size,
    category_order: query.categoryOrder,
  })

  const response = await get<
    { data: ImageMeta[]; total: number },
    { message: string }
  >(`/api/content/v2/images?${querystring}`)

  if (response.ok === true) {
    const { parsedBody } = response
    return parsedBody
  } else {
    captureHttpError(response)
    return { data: [], total: 0 }
  }
}

async function fetchPoiReviewImages(
  target: { type: string; id: string },
  query: { from: number; size: number; categoryOrder: string },
) {
  const querystring = qs.stringify({
    resourceType: target.type,
    resourceId: target.id,
    from: query.from,
    size: query.size,
    category_order: query.categoryOrder,
  })
  const response = await get<
    { data: ImageMeta[]; total: number },
    { message: string }
  >(`/api/reviews/v2/images?${querystring}`)

  if (response.ok === true) {
    const { parsedBody } = response
    return parsedBody
  } else {
    captureHttpError(response)
    return { data: [], total: 0 }
  }
}

export function useImagesContext() {
  return useContext(Context)
}

export interface WithImagesBaseProps {
  images: ImagesContext['images']
  totalImagesCount: ImagesContext['total']
  imagesActions: ImagesContext['actions']
}

export function withImages<P extends DeepPartial<WithImagesBaseProps>>(
  Component: ComponentType<P>,
) {
  return function ImagesComponent(
    props: Omit<P, 'images' | 'totalImagesCount' | 'imagesActions'>,
  ) {
    return (
      <Context.Consumer>
        {({ images, total, actions }) => {
          return (
            <Component
              {...({
                ...props,
                images,
                totalImagesCount: total,
                imagesActions: actions,
              } as P)}
            />
          )
        }}
      </Context.Consumer>
    )
  }
}

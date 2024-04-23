import {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
  useCallback,
  ComponentType,
  useReducer,
  useEffect,
} from 'react'
import qs from 'qs'
import { ImageMeta } from '@titicaca/type-definitions'
import { DeepPartial } from 'utility-types'
import { get } from '@titicaca/fetcher'

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

type CategoryOrder =
  | 'image'
  | 'recommendation'
  | 'menuItem'
  | 'menuBoard'
  | 'featuredContent'
  | 'images'

interface ImagesProviderProps {
  source: {
    id: string
    type: 'attraction' | 'restaurant' | 'hotel' | 'guide'
  }
  images?: ImageMeta[]
  total?: number
  categoryOrder?: Array<CategoryOrder>
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

export function ImagesProvider({
  images: initialImages,
  total: initialTotal,
  source: { id, type },
  categoryOrder = [
    'image',
    'recommendation',
    'menuBoard',
    'menuItem',
    'featuredContent',
    'images',
  ],
  children,
}: PropsWithChildren<ImagesProviderProps>) {
  if (categoryOrder.length > 6) {
    throw new Error('categoryOrder의 개수가 너무 많습니다.')
  }

  const [{ loading, images, total, hasMore, nextFetchUrl }, dispatch] =
    useReducer(reducer, {
      loading: !initialImages,
      images: initialImages || [],
      total: initialTotal || 0,
      hasMore: true,
      nextFetchUrl: null,
    })

  const sendFetchRequest = useCallback(
    async (size = 15) => {
      const response = await fetchImages(
        nextFetchUrl ||
          makeFetchUrl({
            api: images.length === 0 ? 'content' : 'reviews',
            target: { type, id },
            query: { from: images.length, size, categoryOrder },
          }),
      )

      return response
    },
    [nextFetchUrl, type, id, images.length, categoryOrder],
  )

  // 첫 이미지부터 다시 fetch
  const reFetch = useCallback(async () => {
    if (loading) {
      return
    }

    dispatch(loadImagesRequest())

    try {
      const {
        data: fetchedImages,
        total,
        next,
      } = await fetchImages(
        makeFetchUrl({
          api: 'content',
          target: { type, id },
          query: { from: 0, size: 15, categoryOrder },
        }),
      )

      dispatch(
        reinitializeImages({
          images: fetchedImages,
          total,
          nextFetchUrl: next,
        }),
      )
    } catch (error) {
      dispatch(loadImagesFail(error))
    }
  }, [loading, type, id, categoryOrder])

  const fetch = useCallback(
    async (onFetchAfter?: () => void, force?: boolean) => {
      if (!force && (loading || !hasMore)) {
        return
      }

      dispatch(loadImagesRequest())

      try {
        const { data: fetchedImages, total, next } = await sendFetchRequest()

        if (fetchedImages) {
          dispatch(
            loadImagesSuccess({
              images: fetchedImages,
              total,
              nextFetchUrl: next,
            }),
          )
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

interface ImagesResponse {
  data: ImageMeta[]
  total: number
  count: number
  prev: string | null
  next: string | null
}

async function fetchImages(url: string) {
  const response = await get<ImagesResponse>(url)

  if (response.ok === true) {
    const { parsedBody } = response
    return parsedBody
  } else {
    throw new Error(`Failed to fetch images`)
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

function makeFetchUrl({
  api,
  target,
  query,
}: {
  api: 'reviews' | 'content'
  target: { type: string; id: string }
  query: { from: number; size: number; categoryOrder: Array<CategoryOrder> }
}) {
  const querystring = qs.stringify({
    ...(api === 'content' && { resource_type: target.type }),
    resource_id: target.id,
    from: query.from,
    size: query.size,
    ...(api === 'content' && { category_order: query.categoryOrder.join(',') }),
  })
  return `/${api}/v2/images?${querystring}`
}

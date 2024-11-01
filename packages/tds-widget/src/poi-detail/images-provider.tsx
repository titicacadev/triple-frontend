import {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
  useCallback,
  useReducer,
  useEffect,
} from 'react'
import { ImageMeta } from '@titicaca/type-definitions'

import reducer, {
  loadImagesRequest,
  loadImagesSuccess,
  loadImagesFail,
  reinitializeImages,
} from './images-reducer'
import { ImageCategoryOrder } from './types'
import useFetchImages from './use-fetch-images'

interface PoiDetailImagesContext {
  images: ImageMeta[]
  total: number
  loading: boolean
  actions: {
    fetch: (cb?: () => void) => Promise<void>
    reFetch: (cb?: () => void) => Promise<void>
    indexOf: (target: { id: string }) => Promise<number>
  }
}

interface PoiDetailImagesProviderProps {
  source: {
    id: string
    type: 'attraction' | 'restaurant' | 'hotel'
  }
  categoryOrder?: Array<ImageCategoryOrder>
  images?: ImageMeta[]
  total?: number
}

const Context = createContext<PoiDetailImagesContext>({
  images: [],
  total: 0,
  loading: false,
  actions: {
    fetch: () => Promise.resolve(),
    reFetch: () => Promise.resolve(),
    indexOf: () => Promise.resolve(-1),
  },
})

export function PoiDetailImagesProvider({
  images: defaultImages,
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
}: PropsWithChildren<PoiDetailImagesProviderProps>) {
  const [{ loading, images, total, hasMore }, dispatch] = useReducer(reducer, {
    loading: !defaultImages,
    images: defaultImages || [],
    total: initialTotal || 0,
    hasMore: true,
  })

  const fetchImages = useFetchImages()

  const sendFetchRequest = useCallback(
    async (size = 15) => {
      const response = await fetchImages({
        target: { type, id },
        currentImageLength: images.length - (defaultImages?.length || 0),
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
      const {
        data: fetchedImages,
        total,
        next,
      } = await fetchImages({
        target: { type, id },
        currentImageLength: 0,
        size: 15,
        categoryOrder,
      })

      dispatch(
        reinitializeImages({
          images: [...(defaultImages || []), ...fetchedImages],
          total: total + (defaultImages?.length || 0),
          hasMore: !!next,
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
        const { data: fetchedImages, total, next } = await sendFetchRequest()
        dispatch(
          loadImagesSuccess({
            images: fetchedImages,
            total: total + (defaultImages?.length || 0),
            hasMore: !!next,
          }),
        )
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

export function usePoiDetailImages() {
  return useContext(Context)
}

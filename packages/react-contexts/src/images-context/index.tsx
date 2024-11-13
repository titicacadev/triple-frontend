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
import { ImageMeta } from '@titicaca/type-definitions'
import { DeepPartial } from 'utility-types'

import reducer, {
  loadImagesRequest,
  loadImagesSuccess,
  loadImagesFail,
  reinitializeImages,
} from './reducer'
import { ImageCategoryOrder } from './types'
import useFetchImages from './use-fetch-images'

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

export function ImagesProvider({
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
}: PropsWithChildren<ImagesProviderProps>) {
  const [{ loading, images, total, hasMore }, dispatch] = useReducer(reducer, {
    loading: !defaultImages,
    images: defaultImages || [],
    total: initialTotal || 0,
    hasMore: true,
  })

  const { addOnTotal, addOnCurrentImageLength } = {
    addOnTotal: type === 'hotel' ? 0 : (defaultImages || []).length,
    addOnCurrentImageLength:
      type === 'hotel' ? (defaultImages || []).length : 0,
  }

  const fetchImages = useFetchImages()

  const sendFetchRequest = useCallback(
    async (size = 15) => {
      const response = await fetchImages({
        target: { type, id },
        currentImageLength: images.length - addOnTotal,
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
        currentImageLength: addOnCurrentImageLength,
        size: 15,
        categoryOrder,
      })

      dispatch(
        reinitializeImages({
          images: [...(defaultImages || []), ...fetchedImages],
          total: total + addOnTotal,
          hasMore: !!next,
        }),
      )
    } catch (error) {
      dispatch(loadImagesFail(error))
    }
  }, [loading, id, type, addOnCurrentImageLength, addOnTotal])

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
            total: total + addOnTotal,
            hasMore: !!next,
          }),
        )
      } catch (error) {
        dispatch(loadImagesFail(error))
      }

      onFetchAfter && onFetchAfter()
    },
    [hasMore, loading, addOnTotal, sendFetchRequest],
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

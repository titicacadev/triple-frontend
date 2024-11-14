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
  const [uniqueDefaultImages, setUniqueDefaultImages] = useState(
    defaultImages || [],
  )
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
        currentImageLength: images.length - uniqueDefaultImages.length,
        size,
        categoryOrder,
      })

      return response
    },
    [
      categoryOrder,
      fetchImages,
      id,
      images.length,
      type,
      uniqueDefaultImages.length,
    ],
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

      const filteredDefaultImages = filterDefaultImages(
        uniqueDefaultImages,
        fetchedImages,
      )

      dispatch(
        reinitializeImages({
          images: [...filteredDefaultImages, ...fetchedImages],
          total: total + filteredDefaultImages.length,
          hasMore: !!next,
        }),
      )
      setUniqueDefaultImages(filteredDefaultImages)
    } catch (error) {
      dispatch(loadImagesFail(error))
    }
  }, [loading, fetchImages, type, id, categoryOrder, uniqueDefaultImages])

  const fetch = useCallback(
    async (onFetchAfter?: () => void, force?: boolean) => {
      if (!force && (loading || !hasMore)) {
        return
      }

      dispatch(loadImagesRequest())

      try {
        const { data: fetchedImages, total, next } = await sendFetchRequest()

        const filteredDefaultImages =
          uniqueDefaultImages.length === images.length
            ? filterDefaultImages(uniqueDefaultImages, fetchedImages)
            : uniqueDefaultImages

        const shouldReInitImages =
          filteredDefaultImages.length !== uniqueDefaultImages.length

        if (shouldReInitImages) {
          dispatch(
            reinitializeImages({
              images: [...filteredDefaultImages, ...fetchedImages],
              total: total + filteredDefaultImages.length,
              hasMore: !!next,
            }),
          )
          setUniqueDefaultImages(filteredDefaultImages)
        } else {
          dispatch(
            loadImagesSuccess({
              images: fetchedImages,
              total: total + filteredDefaultImages.length,
              hasMore: !!next,
            }),
          )
        }
      } catch (error) {
        dispatch(loadImagesFail(error))
      }

      onFetchAfter && onFetchAfter()
    },
    [hasMore, images.length, loading, sendFetchRequest, uniqueDefaultImages],
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

function filterDefaultImages(
  defaultImages: ImageMeta[],
  fetchedImages: ImageMeta[],
) {
  return defaultImages.filter(
    (defaultImage) =>
      !fetchedImages.some(
        (fetchedImage) => fetchedImage.id === defaultImage.id,
      ),
  )
}

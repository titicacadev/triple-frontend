import React, {
  PropsWithChildren,
  useMemo,
  useCallback,
  ComponentType,
  useReducer,
} from 'react'
import { Image } from './model'
import reducer, {
  loadImagesRequest,
  loadImagesSuccess,
  loadImagesFail,
} from './reducer'

interface ImagesContext {
  images: Image[]
  total: number
  actions: {
    fetch: (cb?: () => void) => Promise<void>
    indexOf: (target: { id: string }) => Promise<number>
  }
}

interface ImagesProviderProps {
  fetchImages: (
    target: { type: string; id: string },
    query: { from: number; size: number },
  ) => Promise<Response>
  source: {
    id: string
    type: 'attraction' | 'restaurant' | 'hotel'
  }
  images?: Image[]
}

const Context = React.createContext<ImagesContext>({
  images: [],
  total: 0,
  actions: {
    fetch: () => Promise.resolve(),
    indexOf: () => Promise.resolve(-1),
  },
})

const TYPE_MAPPING = {
  attraction: 'poi',
  restaurant: 'poi',
  hotel: 'poi',
}

export function ImagesProvider({
  images: initialImages,
  fetchImages,
  source: { id, type },
  children,
}: PropsWithChildren<ImagesProviderProps>) {
  const [{ loading, images, total, hasMore }, dispatch] = useReducer(reducer, {
    loading: false,
    images: initialImages || [],
    total: 0,
    hasMore: true,
  })

  const sendFetchRequest = useCallback(
    async (size = 15) => {
      const response = await fetchImages(
        { type: TYPE_MAPPING[type] || type, id },
        { from: images.length, size },
      )

      if (response.ok) {
        const result = await response.json()

        return result
      }

      return {}
    },
    [fetchImages, id, images.length, type],
  )

  const fetch = useCallback(
    async (cb?: () => void) => {
      if (loading || !hasMore) {
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

      cb && cb()
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

  const value = useMemo(
    () => ({
      images,
      total,
      actions: {
        fetch,
        indexOf,
      },
    }),
    [fetch, images, indexOf, total],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useImagesContext() {
  return React.useContext(Context)
}

export function withImages<
  P extends {
    images?: ImagesContext['images']
    totalImagesCount?: ImagesContext['total']
    imagesActions?: ImagesContext['actions']
  }
>(Component: ComponentType<P>) {
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

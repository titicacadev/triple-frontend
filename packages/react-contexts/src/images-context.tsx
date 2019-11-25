import React, {
  PropsWithChildren,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ComponentType,
} from 'react'

interface Image {
  id: string
  sizes: {
    [key: string]: {
      url: string
    }
  }
}

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
    type: string
  }
  images?: Image[]
}

const Context = React.createContext<ImagesContext>(undefined)

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
  const [images, setImages] = useState(initialImages || [])
  const [total, setTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [callback, setCallback] = useState<() => void | null>(null)

  useEffect(() => {
    if (callback) {
      callback()
      setCallback(null)
    }
  }, [callback])

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
    async (cb: () => void) => {
      if (loading || !hasMore) {
        return
      }

      setLoading(true)

      const { data: fetchedImages, total } = await sendFetchRequest()

      if (fetchedImages) {
        setImages((images) => [...images, ...fetchedImages])
        setTotal(total)
        setLoading(false)
        setHasMore(fetchedImages.length > 0)
      } else {
        setLoading(false)
      }
      setCallback(cb)
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
        fetch: fetch,
        indexOf: indexOf,
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

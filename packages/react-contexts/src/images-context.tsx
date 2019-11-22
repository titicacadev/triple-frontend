import React, { PropsWithChildren, useState, useEffect } from 'react'

const Context = React.createContext(undefined)

const TYPE_MAPPING = {
  attraction: 'poi',
  restaurant: 'poi',
  hotel: 'poi',
}

interface Image {
  id: string
  sizes: {
    [key: string]: {
      url: string
    }
  }
}

interface ImagesProviderProps {
  fetchImages: Function
  source: {
    id: string
    type: string
  }
  images?: Image[]
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
  const [callback, setCallback] = useState<() => void>(null)

  useEffect(() => {
    if (callback) {
      callback()
      setCallback(null)
    }
  }, [callback])

  const sendFetchRequest = async (size = 15) => {
    const response = await fetchImages(
      { type: TYPE_MAPPING[type] || type, id },
      { from: images.length, size },
    )

    if (response.ok) {
      const result = await response.json()

      return result
    }

    return {}
  }

  const fetch = async (cb: () => void) => {
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
  }

  const indexOf = async ({ id: targetId }) => {
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
  }

  return (
    <Context.Provider
      value={{
        images,
        total,
        actions: {
          fetch: fetch,
          indexOf: indexOf,
        },
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useImagesContext() {
  return React.useContext(Context)
}

export function withImages(Component) {
  return function ImagesComponent(props) {
    return (
      <Context.Consumer>
        {({ images, total, actions }) => (
          <Component
            images={images}
            totalImagesCount={total}
            imagesActions={actions}
            {...props}
          />
        )}
      </Context.Consumer>
    )
  }
}

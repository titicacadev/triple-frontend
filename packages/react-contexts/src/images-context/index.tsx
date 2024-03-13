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

interface ImagesProviderProps {
  source: {
    id: string
    type: 'attraction' | 'restaurant' | 'hotel'
  }
  images?: ImageMeta[]
  total?: number
  triggerInitialFetch?: boolean
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
  source: { id, type },
  triggerInitialFetch = true,
  children,
}: PropsWithChildren<ImagesProviderProps>) {
  const [{ loading, images, total, hasMore }, dispatch] = useReducer(reducer, {
    loading: true,
    images: initialImages || [],
    total: initialTotal || 0,
    hasMore: true,
  })

  const sendFetchRequest = useCallback(
    async (size = 15) => {
      const response = await fetchImages(
        { type: TYPE_MAPPING[type] || type, id },
        { from: images.length, size },
      )

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
      const { data: fetchedImages, total } = await fetchImages(
        { type: TYPE_MAPPING[type] || type, id },
        { from: 0, size: 15 },
      )

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
    if (triggerInitialFetch) {
      fetch(undefined, true)
    }
  }, [triggerInitialFetch]) // eslint-disable-line react-hooks/exhaustive-deps

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

async function fetchImages(
  target: { type: string; id: string },
  query: { from: number; size: number },
) {
  const querystring = qs.stringify({
    resourceType: target.type,
    resourceId: target.id,
    from: query.from,
    size: query.size,
  })

  const response = await get<{ data: ImageMeta[]; total: number }>(
    `/api/content/images?${querystring}`,
  )

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

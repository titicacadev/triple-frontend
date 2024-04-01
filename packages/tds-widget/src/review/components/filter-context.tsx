import {
  PropsWithChildren,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from 'react'
import { useClientAppActions, useTrackEvent } from '@titicaca/triple-web'

interface FilterValues {
  isRecentTrip: boolean
  isMediaCollection: boolean
  handleRecentTripChange: () => void
  handleMediaChange: () => void
}

const FilterContext = createContext<FilterValues | undefined>(undefined)

const EVENT_TYPE = 'reviews-web/filter-change'

export function FilterProvider({
  receiverId,
  initialRecentTrip = false,
  initialMediaFilter = false,
  children,
}: PropsWithChildren<{
  receiverId?: string
  initialRecentTrip?: boolean
  initialMediaFilter?: boolean
}>) {
  const [isRecentTrip, setIsRecentTrip] = useState(initialRecentTrip)
  const [isMediaCollection, setIsMediaCollection] = useState(initialMediaFilter)

  const trackEvent = useTrackEvent()
  const { broadcastMessage, subscribe, unsubscribe } = useClientAppActions()

  const handleRecentTripChange = useCallback(() => {
    setIsRecentTrip((prevState) => !prevState)

    const action = isRecentTrip ? '리뷰_최근여행_해제' : '리뷰_최근여행_선택'

    trackEvent({
      ga: [action],
      fa: {
        action,
      },
    })
  }, [isRecentTrip, trackEvent])

  const handleMediaChange = useCallback(() => {
    setIsMediaCollection((prevState) => !prevState)

    const action = isMediaCollection
      ? '리뷰_사진영상필터_해제'
      : '리뷰_사진영상필터_선택'

    trackEvent({
      fa: {
        action,
      },
    })
  }, [isMediaCollection, trackEvent])

  useEffect(() => {
    if (receiverId) {
      broadcastMessage &&
        broadcastMessage({
          receiverId,
          type: EVENT_TYPE,
          filter: {
            isRecentTrip,
            hasMedia: isMediaCollection,
          },
        })
    }
  }, [receiverId, isRecentTrip, isMediaCollection, broadcastMessage])

  useEffect(() => {
    const handleReceiveMessage = ({
      payload,
    }: {
      payload?: {
        type: string
        filter: {
          isRecentTrip: boolean
          hasMedia: boolean
        }
      }
    }) => {
      if (!payload || payload.type !== EVENT_TYPE) {
        return
      }

      const { isRecentTrip, hasMedia } = payload.filter

      setIsRecentTrip(isRecentTrip)
      setIsMediaCollection(hasMedia)
    }

    subscribe && subscribe('receiveMessage', handleReceiveMessage)

    return () => {
      unsubscribe && unsubscribe('receiveMessage', handleReceiveMessage)
    }
  }, [subscribe, unsubscribe, setIsRecentTrip, setIsMediaCollection])

  const values = useMemo(
    () => ({
      isRecentTrip,
      isMediaCollection,
      handleRecentTripChange,
      handleMediaChange,
    }),
    [
      isRecentTrip,
      isMediaCollection,
      handleRecentTripChange,
      handleMediaChange,
    ],
  )

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  )
}

export function useReviewFilters() {
  const context = useContext(FilterContext)

  if (context === undefined) {
    throw new Error('FilterProvider is not mount.')
  }

  return context
}

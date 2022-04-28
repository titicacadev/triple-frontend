import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  PropsWithChildren,
} from 'react'
import {
  subscribe,
  unsubscribe,
} from '@titicaca/triple-web-to-native-interfaces'

import { Context } from './my-reviews-context'
import { MyReviews } from './types'
import { checkIfReviewed } from './api-client'

export default function MyReviewsProvider({
  myReviews: initialMyReviews = {},
  children,
}: PropsWithChildren<{
  myReviews?: MyReviews
}>) {
  const [myReviews, setMyReviews] = useState(initialMyReviews)
  const updateReviewedStatus = useCallback(
    async ({ id: resourceId }: { id: string }) => {
      const reviewed = await checkIfReviewed({ resourceId })

      setMyReviews((previousMyReviews) => ({
        ...previousMyReviews,
        [resourceId]: reviewed,
      }))
    },
    [setMyReviews],
  )

  useEffect(() => {
    subscribe('reviewUpdate', updateReviewedStatus)

    return () => {
      unsubscribe('reviewUpdate', updateReviewedStatus)
    }
  }, [updateReviewedStatus])

  const deriveCurrentStateAndCount = useCallback(
    ({
      id,
      reviewed,
      reviewsCount,
      reviewsRating,
    }: {
      id: string
      reviewed?: boolean
      reviewsCount?: number
      reviewsRating?: number
    }) => {
      const currentState = myReviews[id]

      if (typeof reviewed !== 'boolean' || typeof currentState !== 'boolean') {
        return {
          reviewed: !!reviewed,
          reviewsCount: reviewsCount || 0,
          reviewsRating: reviewsRating || 0,
        }
      } else if (reviewed === currentState) {
        return {
          reviewed,
          reviewsCount: reviewsCount || 0,
          reviewsRating: reviewsRating || 0,
        }
      } else if (currentState) {
        return {
          reviewed,
          reviewsCount: (reviewsCount || 0) + 1,
          reviewsRating: reviewsRating || 0,
        }
      } else {
        return {
          reviewed,
          reviewsCount: (reviewsCount || 1) - 1,
          reviewsRating: reviewsRating || 0,
        }
      }
    },
    [myReviews],
  )

  const handleMyReviewDelete = useCallback(
    ({ resourceId }: { id: string; resourceId: string }) => {
      setMyReviews((currentMyReviews) => ({
        ...currentMyReviews,
        [resourceId]: false,
      }))
    },
    [setMyReviews],
  )

  const value = useMemo(
    () => ({
      myReviews,
      deriveCurrentStateAndCount,
      deleteMyReview: handleMyReviewDelete,
    }),
    [myReviews, deriveCurrentStateAndCount, handleMyReviewDelete],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

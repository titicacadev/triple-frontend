import { createContext } from 'react'

import { MyReviews } from './types'

export interface MyReviewsContextProps {
  myReviews: MyReviews
  deriveCurrentStateAndCount: (params: {
    id: string
    reviewed?: boolean
    reviewsCount?: number
    reviewsRating?: number
  }) => { reviewed: boolean; reviewsCount: number; reviewsRating: number }
  deleteMyReview: (params: {
    id: string
    resourceType?: string
    resourceId: string
  }) => void
}

export const Context = createContext<MyReviewsContextProps>({
  myReviews: {},
  deriveCurrentStateAndCount: () => ({
    reviewed: false,
    reviewsCount: 0,
    reviewsRating: 0,
  }),
  deleteMyReview: () => undefined,
})

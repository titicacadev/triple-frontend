import React from 'react'

export type ResourceType = 'article' | string

export interface UserData {
  photo: string
  name: string
  userBoard: {
    reviews: number
  }
  mileage: {
    badges: {
      icon: {
        imageUrl: string
      }
    }[]
    level: number
    point: number
  }
  uid: string
  unregister?: boolean | null
}

export interface ImageEntity {
  id: string
  width: unknown
  height: unknown
  sizes: {
    full: { url: string }
    large: { url: string }
    smallSquare: { url: string }
  }
}

export interface ReviewData {
  id: string
  liked: boolean
  likesCount: number
  user: UserData
  comment: string
  createdAt: string
  blindedAt?: string | null
  rating?: number | null
  media?: ImageEntity[] | null
}

export interface ReviewProps {
  resourceId: string
  resourceType: ResourceType
  regionId: string
  reviewsCount: number
  shortened?: boolean
  reviewed?: boolean
  appUrlScheme: string
  deepLink?: string
  placeholderText?: string
  appNativeActions: AppNativeActionProps
  sortingOption?: string
  onReviewWrite?: (e?: React.SyntheticEvent, rating?: number) => any
  onReviewDelete?: (
    e?: React.SyntheticEvent,
    id?: string,
  ) => Promise<void> | void
  onFullListButtonClick?: (
    e: React.SyntheticEvent,
    sortingOption?: string,
  ) => void
}

export interface AppNativeActionProps {
  subscribeReviewUpdateEvent?: (
    handler: (params?: { id: string }) => void,
  ) => void
  unsubscribeReviewUpdateEvent?: (
    handler: (params?: { id: string }) => void,
  ) => void
  showToast: (message: string) => void
  notifyReviewDeleted: (resourceId: string, reviewId: string) => void
}

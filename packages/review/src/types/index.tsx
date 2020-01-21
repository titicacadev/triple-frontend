import React from 'react'

export interface ReviewProps {
  resourceId: string
  resourceType: string
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
  subscribeReviewUpdateEvent?: Function
  unsubscribeReviewUpdateEvent?: Function
  showToast: Function
  notifyReviewDeleted: Function
}

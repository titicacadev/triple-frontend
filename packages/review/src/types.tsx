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
  appNativeActions: AppNativeActionProps
  sortingOption?: string
  onReviewWrite?: (e: React.SyntheticEvent, rating?: number) => any
  onFullListButtonClick?: (e: React.SyntheticEvent) => void
}

export interface AppNativeActionProps {
  subscribeReviewUpdateEvent?: Function
  unsubscribeReviewUpdateEvent?: Function
  showToast?: Function
  notifyReviewDeleted?: Function
}

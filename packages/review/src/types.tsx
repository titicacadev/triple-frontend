export interface ReviewProps {
  resourceId: string
  resourceType: string
  regionId: string
  reviewsCount: number
  shortened?: boolean
  reviewed?: boolean
  onFullListButtonClick?: any
  appUrlScheme: string
  appNativeActions: AppNativeActionProps
}

export interface AppNativeActionProps {
  subscribeReviewUpdateEvent?: Function
  unsubscribeReviewUpdateEvent?: Function
  showToast?: Function
  notifyReviewDeleted?: Function
}

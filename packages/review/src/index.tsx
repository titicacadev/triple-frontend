import * as React from 'react'
import { ReviewContainer } from './review-container'
import { TransitionModals } from './transition-modals'

export interface ReviewProps {
  resourceId: string
  resourceType: string
  regionId: string
  reviewsCount: number
  shortened?: boolean
  reviewed?: boolean
  isPublic?: boolean
  onFullListButtonClick?: any
  appUrlScheme: string
  appNativeActions: AppNativeActionProps
  uriHash: string
  historyActions: any // @TODO triple-react-context 주입하면서 삭제
}

export interface AppNativeActionProps {
  subscribeLikedChangeEvent?: Function
  subscribeReviewUpdateEvent?: Function
  notifyReviewLiked?: Function
  notifyReviewUnliked?: Function
  showToast?: Function
  notifyReviewDeleted?: Function
}

export * from './review-placeholder-with-rating'

export * from './review-api-clients'

export default function Reviews({
  resourceId,
  resourceType,
  regionId,
  reviewsCount,
  reviewed,
  shortened,
  onFullListButtonClick,
  isPublic,
  appUrlScheme,
  appNativeActions,
  historyActions,
  uriHash,
}: ReviewProps) {
  return (
    <>
      <ReviewContainer
        shortened={shortened}
        regionId={regionId}
        isPublic={isPublic}
        appUrlScheme={appUrlScheme}
        reviewsCount={reviewsCount}
        resourceId={resourceId}
        resourceType={resourceType}
        reviewed={reviewed}
        onFullListButtonClick={onFullListButtonClick}
        appNativeActions={appNativeActions}
        historyActions={historyActions}
        uriHash={uriHash}
      />
      <TransitionModals
        historyActions={historyActions}
        regionId={regionId}
        resourceId={resourceId}
      />
    </>
  )
}

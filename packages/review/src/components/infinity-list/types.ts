export interface InfinityReviewProps {
  resourceId: string
  resourceType: string
  regionId?: string
  placeholderText?: string
  reviewsCount?: number
  recentTrip: boolean
  hasMedia: boolean
}

export type ExtendInfinityReviewProps = InfinityReviewProps & {
  sortingLabel: 'star-rating-asc' | 'star-rating-desc'
}

export type InfinityReviewValue =
  | InfinityReviewProps
  | ExtendInfinityReviewProps

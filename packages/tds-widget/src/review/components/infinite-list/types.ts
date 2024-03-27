export interface InfiniteReviewProps {
  resourceId: string
  resourceType: string
  regionId?: string
  placeholderText?: string
  reviewsCount?: number
  recentTrip: boolean
  hasMedia: boolean
}

export type ExtendInfiniteReviewProps = InfiniteReviewProps & {
  sortingLabel: 'star-rating-asc' | 'star-rating-desc'
}

export type InfinityReviewValue =
  | InfiniteReviewProps
  | ExtendInfiniteReviewProps

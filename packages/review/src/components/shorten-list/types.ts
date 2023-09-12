export interface ShortenReview {
  resourceId: string
  resourceType: string
  regionId?: string
  placeholderText?: string
  reviewsCount?: number
  recentTrip: boolean
  hasMedia: boolean
}

export type ExtendShortenReview = ShortenReview & {
  sortingLabel: 'star-rating-asc' | 'star-rating-desc'
}

export type ShortenReviewValue = ShortenReview | ExtendShortenReview

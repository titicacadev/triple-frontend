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
  sort: 'asc' | 'desc'
}

import type { SortingType, SortingOption } from '../sorting-context'
import { BaseReviewFragment } from '../../data/graphql'

import { TripleKoreaReviewsList } from './triple-korea-reviews-list'
import { TripleReviewsList } from './triple-reviews-list'

interface Props {
  isGlobal: boolean
  resourceId: string
  resourceType: string
  regionId: string | undefined
  hasMedia: boolean
  recentTrip: boolean
  placeholderText: string | undefined
  sortingType?: SortingType
  sortingOption: SortingOption
  reviewsCount: number | undefined
  reviews: BaseReviewFragment[] | undefined
  refetch: () => void
}

export function ReviewsList(props: Props) {
  return props.isGlobal ? (
    <TripleKoreaReviewsList {...props} />
  ) : (
    <TripleReviewsList {...props} />
  )
}

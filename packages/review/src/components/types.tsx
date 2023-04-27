import { ImageMeta } from '@titicaca/type-definitions'

export type ResourceType = 'article' | string

export interface UserData {
  photo: string
  name: string
  userBoard: {
    itineraries: number
    reports: number
    reviews: number
    reviewsV2: number
    scraps: number
    thanks: number
    trips: number
  }
  mileage: {
    badges: {
      icon: {
        image_url: string
      }
    }[]
    level: number
    point: number
  }
  uid: string
  unregister?: boolean | null
}

export interface PinnedMessageData {
  writer: {
    name: string
    profileImage?: string
  }
  content: {
    text: string | null
    markdownText: string | null
  }
  createAt: string
  updatedAt: string
}

export interface ReviewData {
  id: string
  liked: boolean
  likesCount: number
  resourceType: string
  user: UserData
  comment: string
  reviewedAt: string
  blindedAt?: string | null
  rating?: number | null
  media?: ImageMeta[] | null
  recentTrip: boolean
  visitDate?: string
  replyBoard?: {
    childMessagesCount: number
    pinnedMessages: PinnedMessageData[]
    resourceId: string
    resourceType: string
    rootMessagesCount: number
    pinnedMessagesCount: number
  }
}

export type ReviewDeleteHandler = (id?: string) => Promise<void> | void

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

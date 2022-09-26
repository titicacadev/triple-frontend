import { ImageMeta } from '@titicaca/type-definitions'

export interface UserData {
  photo: string
  name: string
  userBoard: {
    reviews: number
  }
  mileage: {
    badges: {
      icon: {
        imageUrl: string
      }
    }[]
    level: number
    point: number
  }
  uid: string
  unregister?: boolean | null
}

export interface ReviewData {
  id: string
  liked: boolean
  likesCount: number
  user: UserData
  comment: string
  createdAt: string
  blindedAt?: string | null
  rating?: number | null
  media?: ImageMeta[] | null
}

export interface MyReviews {
  [key: string]: boolean
}

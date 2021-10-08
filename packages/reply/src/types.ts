import {
  PoiGQL,
  GeoPoint,
  Translations,
} from '@titicaca/content-type-definitions'

export type ItineraryPoi = Pick<
  PoiGQL,
  'id' | 'categories' | 'region' | 'starRating'
> &
  Pick<
    NonNullable<PoiGQL['source']>,
    | 'areas'
    | 'businessHours'
    | 'names'
    | 'image'
    | 'regionId'
    | 'vicinity'
    | 'geolocation'
  > & {
    type: NonNullable<PoiGQL['type']>
    pointGeolocation: GeoPoint
  }

interface Mileage {
  level: number
  point: number
  badges: any[]
}

interface UserBoard {
  trips: number
  thanks: number
  reports: number
  reviews: number
  reviewsV2: number
  itineraries: number
}

export interface Day {
  day: number
  items: {
    day: number
    poi: ItineraryPoi
  }[]
}

export interface Itinerary {
  applicationCount: number
  createdAt: string
  days: Day[]
  description: string
  id: string
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null
  reactions: { thanks?: { count: number } }
  keywords: string[]
  regionId?: string
  regions: { id: string; names: Translations }[]
  zoneId?: string
  zones: { id: string; names: Translations }[]
  replyBoard?: {
    id: string
    childMessagesCount: number
    pinnedMessages: Reply[]
    resourceId: string
    resourceType: string
    rootMessagesCount: number
  }
  user: {
    id?: number
    mileage: Mileage | null
    name: string
    photo: string
    uid: string
    unregister: boolean
    userBoard: UserBoard
  }
}

export interface Reaction {
  reactions: { user: Itinerary['user'] }[]
  totalCount: number
  type: string
}

export interface Reply {
  id: string
  parentId?: string
  blinded: boolean
  deleted: boolean
  isMine: boolean
  childrenCount: number
  createdAt: string
  updatedAt: string
  reactions: {
    like?: {
      count: number
      haveMine: boolean
    }
  }
  content: { text: string }
  children: Reply[]
  writer: {
    href: string
    name: string
    profileImage: string
    badges: {
      type: string
      label: string | null
      icon: string
    }[]
  }
}

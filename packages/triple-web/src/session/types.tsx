export interface SessionUser {
  name: string
  provider: AuthProvider
  country: string
  lang: string
  unregister: boolean | null
  photo: string
  mileage: Mileage
  uid: string
  email: string
  nolConnected?: boolean
  nolConnectedAt?: string
}

export type AuthProvider =
  | 'TRIPLE'
  | 'NAVER'
  | 'KAKAO'
  | 'FACEBOOK'
  | 'APPLE'
  | 'INVALID'

interface Mileage {
  badges: {
    icon: {
      image_url: string
    }
  }[]
  level: number
  point: number
}

export interface SessionValue {
  user: SessionUser | null
}

export interface User {
  name: string
  provider: Provider
  country: string
  lang: string
  unregister: boolean | null
  photo: string
  mileage: Mileage
  uid: string
}

type Provider = 'TRIPLE' | 'NAVER' | 'KAKAO' | 'FACEBOOK' | 'APPLE'

interface Mileage {
  badges: {
    icon: {
      imageUrl: string
    }
  }[]
  level: number
  point: number
}

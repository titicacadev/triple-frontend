export type ResourceType = 'review' | 'itinerary' | 'article'

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

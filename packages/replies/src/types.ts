export type ResourceType = 'review' | 'itinerary' | 'article'

export interface Writer {
  href: string
  name: string
  profileImage: string
  badges: {
    type: string
    label: string | null
    icon: string
  }[]
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
  content: { text?: string; markdownText?: string; mentionedUser?: Writer }
  children: Reply[]
  writer: Writer
  actionSpecifications: {
    delete: boolean
    edit: {
      text?: string
      plainttext?: string
    } | null
    reaction: boolean
    reply: {
      mentioningUserHref: string
      mentioningUserName: string
      mentioningUserUid: string
      toMessageId: string
    }
    report: boolean
  }
}

export interface ReplyBoard {
  id: string
  resourceId: string
  resourceType: ResourceType
  rootMessagesCount: number
  childMessagesCount: number
  pinnedMessages: Reply[]
}

export interface MentioningUserReply {
  toMessageId: null | string
  mentioningUserUid: null | string
  mentioningUserName: null | string
}

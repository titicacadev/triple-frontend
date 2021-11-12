/**
 * Pick2 type utils
 * ref - https://gist.github.com/staltz/368866ea6b8a167fbdac58cddf79c1bf
 *
 * type AAA = {
 *   content: {
 *     source: {
 *       name: string
 *     }
 *   }
 * }
 *
 * type A-1 = Pick2<AAA, 'content', 'source'>
 *
 * A-1 = {
 *   name: string
 * }

*/

type Pick2<T, K1 extends keyof T, K2 extends keyof T[K1]> = T[K1][K2]

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
      mentioningUserHref: string | null
      mentioningUserName: string | null
      mentioningUserUid: string | null
      toMessageId: string | null
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

export type DataForGeneratingReply = Partial<
  Pick2<Reply, 'actionSpecifications', 'reply'>
>

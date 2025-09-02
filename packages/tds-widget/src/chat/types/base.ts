export type ValueOf<T> = T[keyof T]

export const ChatChannelEvents = {
  REFRESH: 'refresh',
  UNREAD: 'unread',
  SEND: 'send',
  JOIN: 'join',
  LEFT: 'left',
} as const

export type ChatChannelEventsType = ValueOf<typeof ChatChannelEvents>

export interface ChatChannelInfo {
  channel: string
  events: Record<ChatChannelEventsType, string>
  needAuth: boolean
}

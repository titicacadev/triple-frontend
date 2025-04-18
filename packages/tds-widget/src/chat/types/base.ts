export type ValueOf<T> = T[keyof T]

export interface ChatChannelInfo {
  channel: string
  events: { refresh: string; unread: string; send: string; join: string }
  needAuth: boolean
}

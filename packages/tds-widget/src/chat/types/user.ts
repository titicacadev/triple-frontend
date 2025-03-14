import { ChatChannelInfo, ValueOf } from './base'

export const UserType = {
  TRIPLE_USER: 'TRIPLE_USER',
  TRIPLE_OPERATOR: 'TRIPLE_OPERATOR',
  TNA_PARTNER: 'TNA_PARTNER',
} as const

export type UserType = ValueOf<typeof UserType>

/**
 * TF/chat 컴포넌트 내에서 사용하는 UserInterface
 */
export interface UserInterface {
  id: string
  profile: ProfileInterface
  unregistered?: boolean
  unfriended?: boolean
}

interface ProfileInterface {
  name: string
  photo: string
}

/**
 * triple-chat/nol-chat 서버 응답으로 받는 UserInterface
 */
export interface ChatUserInterface<T = UserType> {
  id: string
  createdAt: string
  type: T
  identifier: string
  code: string
  profile: ChatUserProfileInterface
  channel: ChatChannelInfo
}

interface ChatUserProfileInterface {
  name: string
  thumbnail: string
  message: string
}

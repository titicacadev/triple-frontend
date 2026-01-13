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
 * @deprecated
 * triple-chat 서버 응답으로 받는 UserInterface
 */
export interface TripleChatUserInterface<T = UserType>
  extends ChatUserInterface<T> {
  /**
   * @deprecated
   */
  identifier: string
  /**
   * @deprecated
   */
  code: string
}

/**
 * @deprecated
 * triple-chat 서버 응답으로 받는 RoomMemberInterface
 */
export interface TripleChatRoomMemberInterface<T = UserType>
  extends TripleChatUserInterface<T> {
  roomMemberId: string
}

export type ChatRoomUser<T = UserType> =
  | ChatUserInterface<T>
  | ChatRoomMemberInterface<T>

/**
 * nol-chat 서버 응답으로 받는 UserInterface
 */
export interface ChatUserInterface<T = UserType> {
  id: string
  createdAt: string
  type: T
  profile: ChatUserProfileInterface
  channel: ChatChannelInfo
}

/**
 * nol-chat 서버 응답으로 받는 RoomMemberInterface
 */
export interface ChatRoomMemberInterface<T = UserType>
  extends Omit<ChatUserInterface<T>, 'id' | 'channel' | 'createdAt'> {
  roomMemberId: string
  leftAt?: string
}

/**
 * @deprecated
 * 기존 트리플 파트너챗에서 /direct로 진입하는 생성되지 않은 채팅방의 RoomMemberInterface
 */
export interface PreDirectRoomMemberInterface<T = UserType>
  extends Pick<ChatUserInterface<T>, 'id' | 'type' | 'profile'> {
  /**
   * 룸이 생성되기 전의 임시 아이디이기 때문에 룸이 생성되면 변경됩니다
   */
  roomMemberId: string
}

enum CustomProfileType {
  AI_NOLI = 'AI_NOLI',
}
interface ChatUserProfileInterface {
  name: string
  thumbnail: string
  message: string
  customProfile?: CustomProfileType
}

export function isChatRoomMember<T = UserType>(
  member: ChatRoomMemberInterface<T> | ChatUserInterface<T>,
): member is ChatRoomMemberInterface<T> {
  return 'roomMemberId' in member
}

import {
  ChatMessageInterface,
  ChatRoomInterface,
  ChatRoomUser,
  isChatRoomMember,
  UserType,
} from '../types'

// TODO: nol-chat으로 마이그레이션 후 제거
export function getUserIdentifier<T = UserType>(
  user: ChatMessageInterface<T>['sender'] | ChatRoomUser<T>,
) {
  /**
   * triple-chat을 사용한다면 id를 우선적으로 사용하고, 그렇지 않다면 roomMemberId를 사용합니다.
   */
  if ('identifier' in user && 'id' in user) {
    return user.id
  }

  return isChatRoomMember(user) ? user.roomMemberId : user.id
}

// TODO: nol-chat으로 마이그레이션 후 제거
export function shouldUseLegacyMemberId(room: ChatRoomInterface) {
  return (
    'members' in room &&
    'identifier' in room.members[0] &&
    'id' in room.members[0]
  )
}

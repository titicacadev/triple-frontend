import { useEffect, useState } from 'react'

import { useRoom } from '../room-context'
import { isCreatedChatRoom, OtherUnreadInterface, UserType } from '../../types'
import { shouldUseLegacyMemberId } from '../../utils'

import { useChatApiService } from './chat-message-context'
import { ChatRoomMessageInterface } from './messages'

export function useUnreadMessages<T = UserType>() {
  const { room } = useRoom()

  const [lastMessageId, setLastMessageId] = useState<number | undefined>(
    isCreatedChatRoom(room) ? Number(room.lastMessageId) : 0,
  )
  const [otherReadInfo, setOtherReadInfo] = useState<OtherUnreadInterface[]>([])

  const api = useChatApiService()

  // TODO pusher unread 이벤트 api 리팩토링 완료시 해당 코드를 삭제합니다.
  const handleUnreadEvent = async () => {
    if (lastMessageId && isCreatedChatRoom(room)) {
      try {
        await api.updateLastSeenMessageId({
          roomId: room.id,
          lastSeenMessageId: lastMessageId,
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return
      }

      try {
        const { others: otherUnreadInfo } = await api.fetchGetUnreadRoom({
          roomId: room.id,
          lastSeenMessageId: lastMessageId,
        })
        setOtherReadInfo(otherUnreadInfo)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setOtherReadInfo([])
      }
    }
  }

  const calculateUnreadCount = ({
    id,
    sender,
  }: ChatRoomMessageInterface<T>) => {
    return otherReadInfo.reduce(
      (prev, info) =>
        Number(info.lastSeenMessageId) < Number(id) &&
        (shouldUseLegacyMemberId(room) ? info.memberId : info.roomMemberId) !==
          sender.id
          ? prev + 1
          : prev,
      0,
    )
  }

  // TODO pusher unread 이벤트 api 리팩토링이 완료시 주석을 해제합니다.
  // const handleUnreadEvent = useCallback(
  //   ({ otherUnreadInfo }: UpdatedChatData) => {
  //     if (otherUnreadInfo) {
  //       setOtherReadInfo(otherUnreadInfo.others)
  //     }
  //   },
  //   [],
  // )

  // TODO pusher unread 이벤트 api 리팩토링 완료시 해당 코드를 삭제합니다.
  useEffect(() => {
    handleUnreadEvent()
  }, [(room as { id?: string }).id, lastMessageId]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    calculateUnreadCount,
    setLastMessageId,
    lastMessageId,
    // handleUnreadEvent
  }
}

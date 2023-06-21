import { Dispatch, useEffect } from 'react'

import {
  HasUnreadOfRoomInterface,
  MessageInterface,
  UpdateChatData,
} from '../types'

import { ChatAction, ChatActions } from './reducer'
import { useScrollContext } from './scroll-context'

interface ChatPusherProps {
  roomId: string
  userMeId: string
  notifyNewMessage?: (lastMessage: MessageInterface) => void
  dispatch: Dispatch<ChatAction>
  updateChatData?: UpdateChatData
}

export const useChatMessage = ({
  roomId,
  userMeId,
  notifyNewMessage,
  dispatch,
  updateChatData,
}: ChatPusherProps) => {
  const { scrollToBottom } = useScrollContext()

  useEffect(() => {
    updateChatData?.message &&
      handleSendMessageEvent({ message: updateChatData.message })
    updateChatData?.otherUnreadInfo &&
      handleUnreadMessageEvent({
        otherUnreadInfo: updateChatData.otherUnreadInfo,
      })
  }, [updateChatData])

  async function handleSendMessageEvent({
    message: updatedMessage,
  }: {
    message: MessageInterface
  }) {
    if (!roomId) {
      return
    }

    dispatch({
      action: ChatActions.NEW,
      messages: [updatedMessage],
    })
    notifyNewMessage?.(updatedMessage)
    scrollToBottom()
  }

  async function handleUnreadMessageEvent({
    otherUnreadInfo,
  }: {
    otherUnreadInfo: HasUnreadOfRoomInterface
  }) {
    const others = otherUnreadInfo.others
      .map(({ memberId, lastSeenMessageId }) => ({
        memberId,
        lastSeenMessageId: Number(lastSeenMessageId),
      }))
      .filter(({ memberId }) => memberId === userMeId)

    others.length > 0 &&
      dispatch({
        action: ChatActions.UPDATE,
        otherUnreadInfo: others,
      })
  }
}

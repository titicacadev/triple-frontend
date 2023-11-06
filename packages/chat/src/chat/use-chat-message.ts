import { Dispatch, useEffect } from 'react'

import {
  HasUnreadOfRoomInterface,
  MessageInterface,
  UpdateChatData,
} from '../types'

import { ChatAction, ChatActions } from './reducer'
import { useScroll } from './scroll-context'

interface ChatMessageProps {
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
}: ChatMessageProps) => {
  const { scrollToBottom } = useScroll()

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
    const myUnreadMessageInfos = otherUnreadInfo.others
      .map(({ memberId, lastSeenMessageId }) => ({
        memberId,
        lastSeenMessageId: Number(lastSeenMessageId),
      }))
      .filter(({ memberId }) => memberId === userMeId)

    myUnreadMessageInfos.length > 0 &&
      dispatch({
        action: ChatActions.UPDATE,
        otherUnreadInfo: myUnreadMessageInfos,
      })
  }
}

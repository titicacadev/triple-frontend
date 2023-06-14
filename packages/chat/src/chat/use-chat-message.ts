import { Dispatch, useEffect } from 'react'
import Pusher from 'pusher-js'

import { HasUnreadOfRoomInterface, MessageInterface } from '../types'

import { ChatAction, ChatActions } from './reducer'
import { useScrollContext } from './scroll-context'

interface ChatPusherProps {
  pusherKey: string
  roomId: string
  notifyNewMessage?: (lastMessage: MessageInterface) => void
  dispatch: Dispatch<ChatAction>
  updateUnread: () => Promise<boolean | undefined>
}

export const useChatMessage = ({
  pusherKey,
  roomId,
  notifyNewMessage,
  dispatch,
  updateUnread,
}: ChatPusherProps) => {
  const { channelName, sendMessage, unreadMessage } =
    getChatChannelAndEventName(roomId)
  const { scrollToBottom } = useScrollContext()

  useEffect(() => {
    const pusher = new Pusher(pusherKey, {
      cluster: 'ap3',
      ignoreNullOrigin: true,
      forceTLS: true,
    })

    const channel = pusher.subscribe(channelName)

    channel.bind(sendMessage, handleSendMessageEvent)
    channel.bind(unreadMessage, handleUnreadMessageEvent)

    return () => {
      pusher.unsubscribe(channelName)
      pusher.unbind_all()
      pusher.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelName, sendMessage, unreadMessage])

  async function handleSendMessageEvent({
    message: updatedMessage,
  }: {
    message: MessageInterface
  }) {
    if (!updatedMessage || !roomId) {
      return
    }

    dispatch({
      action: ChatActions.NEW,
      messages: [updatedMessage],
    })
    notifyNewMessage?.(updatedMessage)
    await updateUnread?.()
    scrollToBottom()
  }

  async function handleUnreadMessageEvent({
    otherUnreadInfo,
  }: {
    otherUnreadInfo: HasUnreadOfRoomInterface
  }) {
    const others = otherUnreadInfo.others.map(
      ({ memberId, lastSeenMessageId }) => ({
        memberId,
        lastSeenMessageId: Number(lastSeenMessageId),
      }),
    )
    dispatch({
      action: ChatActions.UPDATE,
      otherUnreadInfo: others,
    })
  }
}

function getChatChannelAndEventName(roomId: string) {
  return {
    channelName: `TRIPLE_CHAT_CHANNEL_${roomId}`,
    sendMessage: `TRIPLE_CHAT_MESSAGE_${roomId}`, // 채팅 메시지 업데이트
    unreadMessage: `TRIPLE_CHAT_UNREAD_MESSAGE_${roomId}`, // 읽지 않은 메시지 업데이트
  }
}

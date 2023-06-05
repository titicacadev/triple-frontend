import { Dispatch, useEffect } from 'react'
import Pusher from 'pusher-js'

import {
  HasUnreadOfRoomInterface,
  MessageInterface,
  RoomInterface,
} from '../types'

import { ChatAction, ChatActions } from './reducer'
import { useScrollContext } from './scroll-context'

interface ChatPusherProps {
  pusherKey: string
  room: RoomInterface
  notifyNewMessage?: (lastMessage: MessageInterface) => void
  dispatch: Dispatch<ChatAction>
}

export const useChatPusher = ({
  pusherKey,
  room,
  notifyNewMessage,
  dispatch,
}: ChatPusherProps) => {
  const { channelName, sendMessage, unreadMessage } =
    getChatChannelAndEventName(room.id)
  const { scrollToBottom } = useScrollContext()

  useEffect(() => {
    const pusher = new Pusher(pusherKey, {
      cluster: 'ap3',
      ignoreNullOrigin: true,
      forceTLS: true,
    })

    const channel = pusher.subscribe(channelName)

    channel.bind(sendMessage, handleSendEvent)
    channel.bind(unreadMessage, handleUnreadMessageEvent)

    return () => {
      pusher.unsubscribe(channelName)
      pusher.unbind_all()
      pusher.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelName, sendMessage, unreadMessage])

  async function handleSendEvent({
    message: updatedMessage,
  }: {
    message: MessageInterface
  }) {
    if (!updatedMessage || !room.id) {
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
    dispatch({
      action: ChatActions.UPDATE,
      otherUnreadInfo: otherUnreadInfo.others,
    })
  }
}

function getChatChannelAndEventName(roomId: string) {
  return {
    channelName: `TRIPLE_CHAT_CHANNEL_${roomId}`,
    sendRoom: `TRIPLE_CHAT_ROOM_${roomId}`, // 채팅룸 업데이트
    sendMessage: `TRIPLE_CHAT_MESSAGE_${roomId}`, // 채팅 메시지 업데이트
    unreadMessage: `TRIPLE_CHAT_UNREAD_MESSAGE_${roomId}`, // 읽지 않은 메시지 업데이트
  }
}

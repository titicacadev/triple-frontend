import { createContext, useContext, PropsWithChildren, useState } from 'react'
import deepmerge from 'deepmerge'

import type { ChatRoomInterface, ChatRoomUser } from '../types'

export interface RoomProviderProps<T = ChatRoomInterface, U = ChatRoomUser> {
  room: T
  me: U
}

interface RoomContextValue<T = ChatRoomInterface, U = ChatRoomUser> {
  room: T
  me: U
  updateRoom: (room: Partial<T>, options?: { deepMerge?: boolean }) => void
  updateMe: (me: U) => void
}

export const RoomContext = createContext<RoomContextValue | null>(null)

export function RoomProvider<T = ChatRoomInterface, U = ChatRoomUser>({
  room: initialRoom,
  me: initialMe,
  children,
}: PropsWithChildren<RoomProviderProps<T, U>>) {
  const [room, setRoom] = useState<T>(initialRoom)
  const [me, setMe] = useState<U>(initialMe)

  const updateMe = (me: U) => {
    setMe((prev) => ({ ...prev, ...me }))
  }

  const updateRoom = (room: Partial<T>, options?: { deepMerge?: boolean }) => {
    setRoom((prevRoom) =>
      options?.deepMerge ? deepmerge(prevRoom, room) : { ...prevRoom, ...room },
    )
  }

  const value = {
    room,
    me,
    updateRoom,
    updateMe,
  } as unknown as RoomContextValue

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
}

export function useRoom<T = ChatRoomInterface, U = ChatRoomUser>() {
  const context = useContext(RoomContext)

  if (!context) {
    throw new Error('Room context가 존재하지 않습니다.')
  }
  return context as unknown as RoomContextValue<T, U>
}

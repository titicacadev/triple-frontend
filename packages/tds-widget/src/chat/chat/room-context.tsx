import { createContext, useContext, PropsWithChildren, useState } from 'react'
import deepmerge from 'deepmerge'

import type { ChatUserInterface, ChatRoomInterface } from '../types'

export interface RoomProviderProps<
  T = ChatRoomInterface,
  U = ChatUserInterface,
> {
  room: T
  me: U
}

interface RoomContextValue<T = ChatRoomInterface, U = ChatUserInterface> {
  room: T
  me: U
  updateRoom: (room: Partial<T>, options?: { deepMerge?: boolean }) => void
}

export const RoomContext = createContext<RoomContextValue | null>(null)

export function RoomProvider<T = ChatRoomInterface, U = ChatUserInterface>({
  room: initialRoom,
  me,
  children,
}: PropsWithChildren<RoomProviderProps<T, U>>) {
  const [room, setRoom] = useState<T>(initialRoom)

  const updateRoom = (room: Partial<T>, options?: { deepMerge?: boolean }) => {
    setRoom((prevRoom) =>
      options?.deepMerge ? deepmerge(prevRoom, room) : { ...prevRoom, ...room },
    )
  }

  const value = {
    room,
    me,
    updateRoom,
  } as unknown as RoomContextValue

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
}

export function useRoom<T = ChatRoomInterface, U = ChatUserInterface>() {
  const context = useContext(RoomContext)

  if (!context) {
    throw new Error('Room context가 존재하지 않습니다.')
  }
  return context as unknown as RoomContextValue<T, U>
}

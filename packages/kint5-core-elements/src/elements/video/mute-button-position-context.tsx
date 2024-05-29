import { PropsWithChildren, createContext, useContext } from 'react'

export type MuteButtonPosition = 'top-left' | 'top-right'

interface MuteButtonPositionContextValue {
  muteButtonPosition: MuteButtonPosition
}

const MuteButtonPositionContext =
  createContext<MuteButtonPositionContextValue | null>(null)

export function MuteButtonPositionProvider({
  children,
  muteButtonPosition = 'top-right',
}: PropsWithChildren<Partial<MuteButtonPositionContextValue>>) {
  return (
    <MuteButtonPositionContext.Provider value={{ muteButtonPosition }}>
      {children}
    </MuteButtonPositionContext.Provider>
  )
}

export function useMuteButtonPosition() {
  const context = useContext(MuteButtonPositionContext)

  if (context === null) {
    throw new Error(
      'useMuteButtonPosition must be used within MuteButtonPositionProvider.',
    )
  }

  return context
}

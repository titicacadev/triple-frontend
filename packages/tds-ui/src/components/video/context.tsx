import { createContext, PropsWithChildren, useContext, useMemo } from 'react'

import { FrameRatioAndSizes } from '../../commons'

interface VideoStateContextValue {
  frame: FrameRatioAndSizes
  fallbackImageUrl: string
}

const VideoStateContext = createContext<VideoStateContextValue | null>(null)

function VideoStateContextProvider({
  frame,
  fallbackImageUrl,
  children,
}: PropsWithChildren<VideoStateContextValue>) {
  const value = useMemo(
    () => ({
      frame: frame ?? 'large',
      fallbackImageUrl: fallbackImageUrl ?? '',
    }),
    [frame, fallbackImageUrl],
  )

  return (
    <VideoStateContext.Provider value={value}>
      {children}
    </VideoStateContext.Provider>
  )
}

export function VideoWrapper({
  frame,
  fallbackImageUrl,
  children,
}: PropsWithChildren<VideoStateContextValue>) {
  return (
    <VideoStateContextProvider
      frame={frame}
      fallbackImageUrl={fallbackImageUrl}
    >
      {children}
    </VideoStateContextProvider>
  )
}

export function useVideoState() {
  const context = useContext(VideoStateContext)

  if (!context) {
    throw new Error('Cannot use video state outside of provider')
  }
  return context
}
